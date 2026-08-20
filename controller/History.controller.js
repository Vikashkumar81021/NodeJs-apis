import History from "../model/History.model.js";

const HistoryLogs = async (req, res) => {
  try {
    const userId = req.user._id;
    const { actionType } = req.body;

    if (!actionType) {
      return res.status(400).json({ message: "Missing fileds are required" });
    }
    await History.create({
      userId,
      actionType,
    });
    return res
      .status(201)
      .json({ message: `History main user action is ${actionType}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default HistoryLogs;
