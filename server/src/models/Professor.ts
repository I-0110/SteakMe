import { Schema, model, Document } from 'mongoose';

export interface IProfessor extends Document {
  name: string;
  studentScore?: number;
  officeHours: string;
  officeLocation: string;
  classes: Schema.Types.ObjectId[];
}

const professorSchema = new Schema<IProfessor>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    studentScore: {
      type: Number,
    },
    officeHours: {
      type: String,
      required: true,
    },
    officeLocation: {
      type: String,
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

const Professor = model<IProfessor>('Professor', professorSchema);

export default Professor;
