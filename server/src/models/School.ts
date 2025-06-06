import { Schema, model, Document } from 'mongoose';

interface ISchool extends Document {
  name: string;
  location: string;
  studentCount: number;
  classes: Schema.Types.ObjectId[];
}

const schoolSchema = new Schema<ISchool>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    studentCount: {
      type: Number,
      required: true,
    },
    classes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Class',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const School = model<ISchool>('School', schoolSchema);

export default School;
