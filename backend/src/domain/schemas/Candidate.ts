import { Schema } from 'mongoose';

export interface CandidateInterface {
  _id?: string;
  name: string;
  skills: string[];
}

export const CandidateSchema: Schema<CandidateInterface> = new Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: false,
    },
  },
  { timestamps: true }
);
