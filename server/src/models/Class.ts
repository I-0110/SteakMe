import { Schema, model, Document } from 'mongoose';

interface IClass extends Document {
  name: string;
  building: string;
  creditHours: number;
  professor: Schema.Types.ObjectId;
}

const classSchema = new Schema<IClass>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    building: {
      type: String,
      required: true,
    },
    creditHours: {
      type: Number,
      required: true,
    },
    professor: {
      type: Schema.Types.ObjectId,
      ref: 'Professor',
    },
  },
  {
    timestamps: true,
  }
);

const Class = model<IClass>('Class', classSchema);

export default Class;
