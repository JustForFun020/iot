import mongoose, { Schema, Document } from 'mongoose';

interface IIot extends Document {
  temperature: number;
  humidity: number;
  light: number;
  dobui: number;
  time: String;
}

interface Sensor extends Document {
  message: any;
  time: string;
  topic: String;
}

interface ControlHistory extends Document {
  message: string;
  topic: string;
  time: string;
  state: string;
  name: string;
}

const MAX_ITEMS = 7;

const iotSchema: Schema = new Schema(
  {
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    light: { type: Number, required: true },
    dobui: { type: Number, required: true },
    time: { type: String, required: true },
  },
  { timestamps: true },
);

const sensorSchema: Schema = new Schema(
  {
    topic: { require: true, type: String },
    message: { require: true, type: String },
    time: { require: true, type: String },
  },
  { timestamps: true },
);

const controlHistorySchema = new Schema(
  {
    message: { require: true, type: String },
    topic: { require: true, type: String },
    time: { require: true, type: String },
    state: { require: true, type: String },
    name: { require: true, type: String },
  },
  { timestamps: true },
);

export const Iot = mongoose.model<IIot>('Iot', iotSchema);
export const Sensor = mongoose.model<Sensor>('Sensor', sensorSchema);
export const ControlHistory = mongoose.model<ControlHistory>('history', controlHistorySchema);
export async function addItem(data: any) {
  // const count = await Iot.countDocuments();

  // if (count >= MAX_ITEMS) {
  //   await Iot.findOneAndRemove({}, { sort: { createdAt: 1 } });
  // }
  const newItem = new Iot(data);
  return newItem.save();
}

const MONGODB_URI: string = 'mongodb://127.0.0.1:27017/Iot';

export const connectToDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
