import { Schema, model, Document } from 'mongoose';

interface ISteak extends Document {
  _id: string;
  name: string;
  imageUrl: string;
  priorities: string[];
  doneness: string[];
  description: string;
}

const steakSchema = new Schema<ISteak>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    imageUrl: {
      type: String,
    },
    priorities: [
      {
      type: String,
      }
    ],
    doneness: [
      {
      type: String,
      required: true,
      }
    ],
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Steak = model<ISteak>('Steak', steakSchema);

export default Steak;
