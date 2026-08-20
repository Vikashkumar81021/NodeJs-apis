import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  //   userId: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "User",
  //   },
  name: {
    type: String,
  },
  slotTime: {
    startTime: {
      type: Date,
    },
    endTime: {
      type: Date,
    },
  },
  specailization: {
    type: [String],
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
