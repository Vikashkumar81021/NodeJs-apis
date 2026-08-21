import Doctor from "../model/doctor.model.js";

const createDoctor = async (req, res) => {
  try {
    const { name, slotTime, specailization } = req.body;
    if (!name || !slotTime || !specailization) {
      return res.status(400).json({ message: "Missing fileds are required" });
    }
    const doctor = await Doctor.create({
      name,
      slotTime,
      specailization,
    });
    return res.status(200).json({ message: "creation", status: true, doctor });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getDoctor = async (req, res) => {
  try {
    const now = new Date();
    const istTime = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    );
    console.log("current", istTime);
    // const slotTime = await Doctor.find({
    //   slotTime: {
    //     $elemMatch: {
    //       startTime: { $lte: istTime },
    //       endTime: { $gte: istTime },
    //     },
    //   },
    // });
    const doctors = await Doctor.find({
      "slotTime.startTime": { $lte: istTime },
      //   "slotTime.endTime": { $gte: istTime },
    });
    return res.status(200).json({
      message: "Doctor is availabe at this Time",
      data: doctors,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Internal server error" });
  }
};

export { createDoctor, getDoctor };
