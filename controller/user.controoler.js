import generateToken from "../middleware/generateToken.js";
import Order from "../model/order.model.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
const userRegister = async (req, res) => {
  try {
    const { userName, email, password, organizationId } = req.body;

    if (!userName || !email || !password || !organizationId) {
      return res.status(400).json({ message: "Missing fields are required" });
    }

    const isExistUser = await User.findOne({ email });
    if (isExistUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      userName,
      email,
      password,
      organizationId,
    });
    return res
      .status(201)
      .json({ message: "User register successfully", data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing fileds are required" });
    }
    const isExist = await User.findOne({ email });
    if (!isExist) {
      return res.status(400).json({ message: "Invalid Email or passwpord" });
    }
    if (isExist.untilTime && isExist.untilTime > Date.now()) {
      return res
        .status(400)
        .json({ message: "Account Blocked .try again After 1 minute" });
    }
    const matchPassword = await bcrypt.compare(password, isExist.password);
    if (!matchPassword) {
      isExist.loginCount += 1;
      if (isExist.loginCount >= 5) {
        isExist.untilTime = Date.now() + 1 * 60 * 1000;
      }
      await isExist.save();

      return res.status(400).json({ message: "Invalid Email or passwpord" });
    }
    isExist.loginCount = 0;
    isExist.untilTime = null;
    await isExist.save();
    const token = await generateToken(isExist._id);
    res.cookie("auth", token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "User loggedIn successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getDuplicateEmails = async (_, res) => {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: "$email", // email ke basis pe group
          count: { $sum: 1 }, // kitni baar aaya
        },
      },
      {
        $match: {
          count: { $gt: 1 }, // sirf duplicates
        },
      },
      {
        $project: {
          _id: 0,
          email: "$_id",
          count: 1,
        },
      },
    ]);

    return res.json({ duplicates: result });
  } catch (error) {
    return res.status(500).json({ message: "Error", error });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    // 1. JWT Middleware se req.user poora object milta hai
    const { _id, userName, email } = req.user;

    // 2. Sirf CURRENT USER ke top 5 recent orders fetch karo
    const orders = await Order.find({ user: _id })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("id totalAmount status createdAt");

    return res.status(200).json({
      user: {
        id: _id,
        userName,
        email,
      },
      recentOrders: orders,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
export default {
  userRegister,
  loginUser,
  getDuplicateEmails,
};
