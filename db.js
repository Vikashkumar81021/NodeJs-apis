import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/MultiTent");
    console.log(`db connection successfully`);
  } catch (error) {
    console.log("db connection failed");
  }
};

export default db;
