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

const generateShowSeats = async (req, res) => {
  try {
    const showId = req.params.showId;
    const seatId = await showModel.findById(showId);
    if (!seatId) {
      return res.status(404).json({ message: "Showid not available" });
    }
    const { seatNumber } = req.body;
    const createSeat = await seatModel.create({
      showId,
      seatNumber,
      status: "available",
    });

    return res
      .status(200)
      .json({ message: "Generate seats successfully", data: createSeat });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllSeats = async (req, res) => {
  try {
    const showid = req.params.showId;
    const fetchAllSeats = await seatModel.find({ showid });
    return res
      .status(200)
      .json({ message: "Seats fetched successfully", data: fetchAllSeats });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// const seatBookApi = async (req, res) => {
//   try {
//     const { _id } = req.params;
//     const seatId = await seatModel.findById(_id);
//     if (!seatId) {
//       return res.status(404).json({ message: "Invalid seat Id" });
//     }
//     if (seatId.status === "booked") {
//       return res.status(400).json({ message: "Seat Already Booked" });
//     }
//     seatId.status = "booked";
//     await seatId.save();
//     return res
//       .status(200)
//       .json({ message: "Seat book succesfully", data: seatId });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

const seatBookApi = async (req, res) => {
  try {
    const { _id } = req.params;
    const seat = await seatModel.findByIdAndUpdate(
      {
        _id,
        status: "available",
      },
      {
        $set: {
          status: "booked",
        },
      },
      {
        new: true,
      },
    );
    if (!seat) {
      return res
        .status(400)
        .json({ message: "Seat not Available or Already Booked" });
    }
    return res.status(200).json({
      message: "Seat booked successfully",
      data: seat,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export { createShowSeat, generateShowSeats, getAllSeats, seatBookApi };
