import showModel from "../model/show.model.js";
import seatModel from "../model/seat.model.js";

const createShowSeat = async (req, res) => {
  try {
    const showId = req.params.id;
    const { seatNumber } = req.body;

    const findShow = await showModel.findById(showId);

    if (!findShow) {
      return res.status(404).json({
        message: "Invalid Show ID",
      });
    }

    const seat = await seatModel.create({
      showId,
      seatNumber,
    });

    return res.status(201).json({
      message: "Seat created successfully",
      data: seat,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export { createShowSeat };
