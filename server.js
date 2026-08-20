import express from "express";
import db from "./db.js";
import userRoute from "./routes/user.route.js";
import organizationRoute from "./routes/organization.route.js";
import like from "./routes/like.route.js";
import post from "./routes/post.route.js";
import product from "./routes/product.route.js";
import bookmark from "./routes/bookmark.route.js";
import history from "./routes/history.route.js";
import timeTrack from "./routes/timeTrack.route.js";
import leave from "./routes/leave.route.js";
import doctor from "./routes/doctor.route.js";
import { conectRedis } from "./redis.server.js";
import urlShort from "./routes/urlshortner.route.js";
import slotRouter from "./routes/slot.route.js";
import serviceRoute from "./routes/service.route.js";
import expenseRoute from "./routes/expense.route.js";
import seatBooking from "./routes/show.route.js";
import cookieParser from "cookie-parser";
// import logMiddleware from "./middleware/loggerMiddleware.js";
const app = express();
app.use(cookieParser());
app.use(express.json());
// app.use(logMiddleware);
app.use("/api", expenseRoute);
app.use("/api", seatBooking);
app.use("/api/user", userRoute);
app.use("/api", organizationRoute);
app.use("/api", post);
app.use("/api", like);
app.use("/api", bookmark);
app.use("/api/product", product);

app.use("/api", history);
app.use("/api/time", timeTrack);
app.use("/api", leave);
app.use("/api", doctor);

app.use("/api", urlShort);

app.use("/api", slotRouter);
app.use("/api/services", serviceRoute);

db();
// conectRedis();
app.listen(3000, () => {
  console.log(`server is listen on 3000`);
});
