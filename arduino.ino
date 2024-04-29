#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"

// GPIO 14 D5
#define LED 14

//GPIO 4 D2
#define FAN 4

#define LED2 2

#define LIGHT_SENSOR_PIN A0

#define DHTPIN 5  // DHT data pin is connected to GPIO 5 (D1)
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

// WiFi
const char *ssid = "SSA30";      // Enter WiFi name
const char *password = "123456789";  // Enter WiFi password

// MQTT Broker
const char *mqtt_broker = "broker.emqx.io";
const int mqtt_port = 1883;
const char *mqtt_username = "emqx";
const char *mqtt_password = "public";
const char *topic = "led-control";
const char *topic_fan = "fan-control";
const char *topic_mqtt = "iotData";

bool ledState = false;
bool fanState = false;
unsigned long previousMillis = 0;
const long interval = 4000;  // Interval in milliseconds (4 seconds)

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  delay(1000);  // Delay for stability

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to the WiFi network");

  pinMode(LED, OUTPUT);
  pinMode(LED2, OUTPUT);
  pinMode(FAN, OUTPUT);
  digitalWrite(LED, LOW);  // Turn off the LED initially
  digitalWrite(FAN, LOW);
  digitalWrite(LED2, LOW);

  // Connecting to an MQTT broker
  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(callback);
  while (!client.connected()) {
    String client_id = "esp8266-client-";
    client_id += String(WiFi.macAddress());
    Serial.printf("The client %s connects to the public MQTT broker\n", client_id.c_str());
    if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {
      Serial.println("Public EMQX MQTT broker connected");
    } else {
      Serial.print("Failed with state ");
      Serial.print(client.state());
      delay(2000);
    }
  }

  // Publish and subscribe
  client.subscribe(topic);
  client.subscribe(topic_fan);
}

void callback(char *topic, byte *payload, unsigned int length) {
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
  Serial.print("Message: ");
  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];  // Convert *byte to string
  }
  Serial.print(message);
  if (strcmp(topic, topic) == 0) {
    if (message == "on-led" && !ledState) {
      digitalWrite(LED, HIGH);  // Turn on the LED
      ledState = true;
    }
    if (message == "off-led" && ledState) {
      digitalWrite(LED, LOW);  // Turn off the LED
      ledState = false;
    }
  }  
  if (strcmp(topic, topic_fan) == 0) {
    if (message == "on-fan" && !fanState) {
      digitalWrite(FAN, HIGH);  // Turn on the FAN
      fanState = true;
    }
    if (message == "off-fan" && fanState) {
      digitalWrite(FAN, LOW);  // Turn off the FAN
      fanState = false;
    }
  }
  digitalWrite(LED2, LOW);
  Serial.println();
  Serial.println("-----------------------");
}

void publishData(const char *topic, String value) {
  client.publish(topic, value.c_str());
}

String floatToStringWithTwoDecimals(float value) {
  char buffer[10];               // Buffer to hold the string
  dtostrf(value, 5, 2, buffer);  // Convert float to string with 5 characters (including 2 decimal places)
  return String(buffer);
}

int readLightSensor() {
  return analogRead(LIGHT_SENSOR_PIN);
}


void loop() {
  client.loop();
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    // Save the last time data was published
    previousMillis = currentMillis;

    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();
    float dobui = static_cast<float>(random(1,100));
    String temperatureStr = (isnan(temperature)) ? "0.00" : floatToStringWithTwoDecimals(temperature);
    String humidityStr = (isnan(humidity)) ? "0.00" : floatToStringWithTwoDecimals(humidity);

    // Đo ánh sáng từ cảm biến CDS
    int lightValue = readLightSensor();
    String lightStr = String(lightValue);
    if(lightValue < 900) {
      digitalWrite(FAN, HIGH);
      digitalWrite(LED, HIGH);
      digitalWrite(LED2, HIGH);
    } else {
      digitalWrite(FAN, LOW);
      digitalWrite(LED, LOW);
      digitalWrite(LED2, LOW);
    }

    String value = "{\"temperature\":" + temperatureStr + ",\"humidity\":" + humidityStr + ",\"light\":" + lightStr + ",\"dobui\":" + dobui + "}";

    if (!isnan(temperature)) {
      Serial.println("Connected to MQTT broker");
      publishData(topic_mqtt, value);
      Serial.println("Data sent to MQTT broker: " + value);
    } else {
      publishData(topic_mqtt, value);
      Serial.println("Data sent to MQTT broker: " + value);
    }
  }
}
