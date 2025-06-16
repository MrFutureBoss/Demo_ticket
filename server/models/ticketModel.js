import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: [
        "Software",
        "Hardware",
        "Network",
        "Intranet",
        "Mail",
        "Other Issues (Switch seats, Setup new Computer,...)",
        "Project",
      ],
      required: true,
    },
    status: {
      // 1 = Open
      // 2 = In Progress
      // 3 = Completed
      // 4 = In Review (Pass cho user, user sẽ review xem ticket đã hoàn thành hay cần xử lý thêm, mình ko tự mark complete)
      // 5 =  Completed (chờ chấm điểm)
      // 6 = On-Hold
      type: Number,
      min: 1,
      max: 6,
      default: 1,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    difficulty: {
      // 1 = Easy
      // 2 = Medium
      // 3 = Hard
      // 4 = Very Hard
      // 5 = Complex
      type: Number,
      min: 1,
      max: 5,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const ticketModel = mongoose.model("Ticket", ticketSchema);
export default ticketModel;
