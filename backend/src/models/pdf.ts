import mongoose, { Types } from "mongoose";

interface pdf extends mongoose.Document {
  original_file: string;
  summary_text: string;
  title: string;
  file_name: string;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const pdfSchema = new mongoose.Schema<pdf>({
  original_file: {
    type: String,
    required: true,
  },
  summary_text: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  file_name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Pdf = mongoose.model<pdf>("Pdf", pdfSchema);
export default Pdf;
