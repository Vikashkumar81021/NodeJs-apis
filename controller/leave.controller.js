import Leave from "../model/leavemanagement.model.js";

const TakeLeave = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fromDate, toDate, reason, type } = req.body;
    if (!fromDate || !toDate || !reason || !type) {
      return res.status(400).json({ message: "Missing fileds are required" });
    }
    await Leave.create({
      userId,
      fromDate,
      toDate,
      type,
      reason,
    });
    return res.status(200).json({ message: "apply for leave" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const approvedLeave = async (req, res) => {
  try {
    const id = req.params.id;

    const { status } = req.body;
    const documentId = await Leave.findById(id);
    if (!documentId) {
      return res.status(400).json({ messag: "Leave Mail not available" });
    }
    documentId.status = status;
    await documentId.save();
    return res.status(200).json({ message: "leave revert successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { TakeLeave, approvedLeave };
