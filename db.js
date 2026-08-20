import mongoose from "mongoose";

const db = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/MultiTent");
    console.log(`db connection successfully`);
  } catch (error) {
    console.log("db connection failed");
  }
};

export default db;
