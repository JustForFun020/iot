import express from 'express';
import cors from 'cors';
import { connectToDB, Iot, addItem, Sensor, ControlHistory } from './db';
import * as mqtt from 'mqtt';
import moment from 'moment';

const app = express();
const PORT = process.env.PORT || 5050;

const mqttClient =
  mqtt.connect('mqtt://broker.emqx.io:1883', {
    username: 'emqx',
    password: 'public',
  }) ?? '';

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  connectToDB();
});
app.use(cors());

mqttClient.on('connect', () => {
  console.log('Connected to MQTT broker');
  mqttClient.subscribe('iotData');
  mqttClient.subscribe('led-control');
  mqttClient.subscribe('fan-control');
});

// Chart DB
mqttClient.on('message', (topic, message) => {
  if (topic === 'iotData') {
    const data = JSON.parse(message.toString());
    const newIotData = new Iot({
      temperature: data.temperature,
      humidity: data.humidity,
      light: data.light,
      dobui: data.dobui,
      time: moment().format('DD/MM/YYYY HH:mm:ss'),
    });

    addItem(newIotData)
      .then((savedData) => {
        console.log('Data saved to MongoDB:');
      })
      .catch((error) => {
        console.error('Error saving data to MongoDB:');
      });
  }
});

//SenSor DB
mqttClient.on('message', (topic, message) => {
  if (topic === 'iotData') {
    const newSensorData = new Sensor({
      time: moment().format('DD/MM/YYYY HH:mm:ss'),
      topic,
      message: message.toString(),
    });
    const sensor = new Sensor(newSensorData);
    sensor
      .save()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

//History DB
mqttClient.on('message', (topic, message) => {
  if (topic !== 'iotData') {
    const newHistoryData = new ControlHistory({
      time: moment().format('DD/MM/YYYY HH:mm:ss'),
      name: topic.includes('led') ? 'LED' : 'FAN',
      state: message.toString(),
      topic,
    });

    const history = new ControlHistory(newHistoryData);
    history
      .save()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

app.get('/db/dht11', async (req, res) => {
  try {
    const data = await Iot.find();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.get('/sensor', async (req, res) => {
  try {
    const data = await Sensor.find();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.get('/history', async (req, res) => {
  try {
    const data = await ControlHistory.find();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

// count document in collection History
app.get('/history/count', async (req, res) => {
  try {
    const data = await ControlHistory.countDocuments();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});
