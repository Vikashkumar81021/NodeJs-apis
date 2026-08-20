import SlotBook from "../model/slot.booking.js";
import Slot from "../model/slot.model.js";

const createSlot = async (req, res) => {
  try {
    const { startTime, endTime, capacity } = req.body;

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (!start || !end || !capacity) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (start >= end) {
      return res.status(400).json({ message: "Invalid time range" });
    }

    const isOverlap = await Slot.findOne({
      $or: [
        {
          startTime: { $lt: end },
          endTime: { $gt: start },
        },
      ],
    });

    if (isOverlap) {
      return res.status(400).json({
        message: "Slot already exists in this time range",
      });
    }

    const slot = await Slot.create({
      startTime: start,
      endTime: end,
      capacity,
    });

    return res.status(201).json({
      message: "Slot created successfully",
      slot,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getAllSlots = async (_, res) => {
  try {
    const allSots = await Slot.find();
    return res
      .status(200)
      .json({ message: "retrive all slots", avaliableSlot: allSots });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const bookSlot = async (req, res) => {
  try {
    const userId = req.userId;
    const { slotId } = req.body;

    const slot = await Slot.findOneAndUpdate(
      {
        _id: slotId,
        capacity: { $gt: 0 },
      },
      {
        $inc: { capacity: -1 },
      },
      { new: true },
    );

    if (!slot) {
      return res.status(400).json({
        message: "Slot not available or full",
      });
    }
    const alreadyBooked = await SlotBook.findOne({
      userId,
      slotId,
    });

    if (alreadyBooked) {
      await Slot.findByIdAndUpdate(slotId, {
        $inc: { capacity: 1 },
      });

      return res.status(400).json({
        message: "Already booked this slot",
      });
    }
    const booking = await SlotBook.create({
      userId,
      slotId,
      status: "Booked",
    });

    return res.status(201).json({
      message: "Slot booked successfully",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export { createSlot, getAllSlots, bookSlot };
