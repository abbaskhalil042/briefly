import mongoose from "mongoose";

interface User extends mongoose.Document {
  fullName: string;
  email: string;
  password: string;
  credits: number;
  pdfs: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<User>({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    default: 10,
  },
  pdfs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pdf" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model<User>("User", userSchema);
export default User;
