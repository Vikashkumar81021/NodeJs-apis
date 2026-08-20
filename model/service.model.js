import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const Service = await mongoose.model("Service", serviceSchema);

export default Service;
