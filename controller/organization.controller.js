// import mongoose from "mongoose";
import Organization from "../model/organization.model.js";
import User from "../model/user.model.js";

const createOrganization = async (req, res) => {
  //   const session = await mongoose.startSession();
  //   session.startTransaction();

  try {
    const { organizationName, userName, email, password } = req.body;
    if (!organizationName || !userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    // const existingUser = await User.findOne({ email }).session(session);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      //   await session.abortTransaction();
      //   session.endSession();
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const org = await Organization.create(
      [
        {
          name: organizationName,
        },
      ],
      //   { session },
    );
    const organization = org[0];
    const user = await User.create(
      [
        {
          userName,
          email,
          password,
          role: "admin",
          organizationId: organization._id,
        },
      ],
      //   { session },
    );

    const adminUser = user[0];
    organization.owner = adminUser._id;
    await organization.save();

    // await session.commitTransaction();
    // session.endSession();

    return res.status(201).json({
      success: true,
      message: "Organization & Admin created successfully",
      data: {
        organization,
        admin: adminUser,
      },
    });
  } catch (error) {
    // ❌ Rollback
    // await session.abortTransaction();
    // session.endSession();

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const loggedInUser = req.user;
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Missing fields are required" });
    }
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(400).json({ message: "user already exists" });
    }
    await User.create({
      userName,
      email,
      password,
      organizationId: loggedInUser.organizationId,
    });
    return res.status(200).json({
      message: "User created succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export default {
  createOrganization,
  createUser,
};
