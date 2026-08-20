import seatModel from "../model/show.model.js";

const createSeat = async (req, res) => {
  try {
    const { movieName, showDate, showTime, totalSeats } = req.body;
    if (!movieName || !showDate || !showTime || !totalSeats) {
      return res.status(404).json({ message: "Missing fields are required" });
    }
    const result = await seatModel.create({
      movieName,
      showDate,
      showTime,
      totalSeats,
    });
    return res
      .status(201)
      .json({ message: "creation seat successfully", data: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { createSeat };
