import History from "../model/History.model.js";
const logMiddleware = async (req, res, next) => {
  res.on("finish", async () => {
    if (req.user) {
      await History.create({
        userId: req.user._id,
        actionType: req.actionType || req.method + " " + req.originalUrl,
        statusCode: res.statusCode,
      });
    }
  });

  next();
};
export default logMiddleware;
