import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["todo", "in-progress", "done"],
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
  },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
