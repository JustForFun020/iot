import * as mqtt from 'mqtt';

export const mqttClient = mqtt.connect('ws://broker.emqx.io:8083/mqtt', {
  username: 'emqx',
  password: 'public',
});
