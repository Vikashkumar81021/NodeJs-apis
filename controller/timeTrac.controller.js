import TimeTrack from "../model/timeTracking.model.js";

const clockIN = async (req, res) => {
  try {
    const userId = req.user._id;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const exist = await TimeTrack.findOne({ userId, date: today });
    if (exist) {
      return res.status(400).json({ message: "Already clocked in today" });
    }
    await TimeTrack.create({
      userId,
      clockIn: now,
      date: today,
    });
    return res.status(201).json({ message: "Time track" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const clockOUT = async (req, res) => {
  try {
    const userId = req.user._id;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const user = await TimeTrack.findOne({ userId, date: today });
    if (!user) {
      return res.status(400).json({ message: "No clock in found today" });
    }
    user.clockOut = now;
    const diff = user.clockOut - user.clockIn;

    let result;

    if (diff < 1000 * 60) {
      result = Math.floor(diff / 1000) + " sec";
    } else if (diff < 1000 * 60 * 60) {
      result = Math.floor(diff / (1000 * 60)) + " min";
    } else {
      result = (diff / (1000 * 60 * 60)).toFixed(2) + " hr";
    }
    const totalWork = (user.clockOut - user.clockIn) / (1000 * 60 * 60);
    user.totalHourWork = totalWork;
    await user.save();
    return res.status(200).json({
      message: "Clock Out successful",
      totalHours: totalWork,
      readableTime: result,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { clockIN, clockOUT };
