import Expense from "../model/expense.model.js";

const createExpense = async (req, res) => {
  try {
    const { title, amount, category, description, expenseDate } = req.body;

    if (!title || !amount || !category || !description || !expenseDate) {
      return res.status(404).json({ message: "Missing fields are required" });
    }
    let loggedInUserIdCount = 3;

    const createExpense = await Expense.create({
      userId: loggedInUserIdCount,
      title,
      amount,
      category,
      description,
      expenseDate,
    });
    loggedInUserIdCount += 1;
    return res.status(201).json({
      message: "Expense creation successfully",
      data: createExpense,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const fetchExpense = async (req, res) => {
  try {
    const fetchExpense = await Expense.find({
      userId: 2,
      isDelets: false,
    });

    return res.status(200).json({
      message: "Fetch All expense",
      data: fetchExpense,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const singleExpensiveData = async (req, res) => {
  try {
    const expenseId = req.body.id;
    const fetchExData = await Expense.find({ id: expenseId });
    return res.status(200).json({
      message: "Fetch All expense",
      data: fetchExData,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const softDelete = async (req, res) => {
  try {
    const expenseId = req.body.id;
    if (!expenseId) {
      return res
        .status(404)
        .json({ message: "Expense not found with this Id" });
    }
    await Expense.findByIdAndUpdate({
      id: expenseId,
      isDelets: true,
    });
    return res.status(200).json({ message: "User delete successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const summaryExpense = async (req, res) => {
  try {
    // const currentUser = req.user.id; //now at the moment we use harcode userId
    const data = await Expense.find({
      userId: 1,
      // isDelets: false,
    });
    //this appraoch is best way
    // const totalAmount = data.reduce((total, expense) => {
    //   return total + expense.amount;
    // }, 0);
    //this is brute force approach
    let totalAmount = 0;
    for (let i = 0; i < data.length; i++) {
      totalAmount += data[i].amount;
    }
    // const { startDate } = req.query;

    // const fetchData = await Expense.find({
    //   expenseDate: {
    //     $gte: new Date(startDate),
    //     $lte: new Date(),
    //   },
    // });

    return res.status(200).json({
      message: "Summary Data Fetch",
      data: totalAmount,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export {
  createExpense,
  fetchExpense,
  singleExpensiveData,
  softDelete,
  summaryExpense,
};
