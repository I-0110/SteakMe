import { Schema, model, Document } from 'mongoose';

interface ISteak extends Document {
  _id: string;
  name: string;
  imageUrl: string;
  priorities: {
    cost: number;
    texture: number;
    flavor: number;
  };
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
    doneness: [
      {
      type: String,
      required: true,
      }
    ],
    description: {
      type: String,
    },
    priorities: {
      cost: { type: Number, required: true },
      texture: { type: Number, required: true },
      flavor: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const Steak = model<ISteak>('Steak', steakSchema);

export default Steak;
