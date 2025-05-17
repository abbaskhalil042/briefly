import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI as string)
      .then(() => console.log("✅ Connected to MongoDB"))
      .catch((err) => console.error("MongoDB connection error:", err));
  } catch (error: any) {
    console.log(error);
    process.exit(1);
  }
};

export default dbConnect;
