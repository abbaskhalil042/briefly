import mongoose from "mongoose";

interface User extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  credits: number;
  isPremium: boolean;
  razorpayPaymentId?: string;
  pdfs: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<User>({
  name: {
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
  isPremium: {
    type: Boolean,
    default: false,
  },
  razorpayPaymentId: {
    type: String,
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
}, { timestamps: true });

const User = mongoose.model<User>("User", userSchema);
export default User;
