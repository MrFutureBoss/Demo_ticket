import mongoose from "mongoose";

const clientSaveSchema = new mongoose.Schema(
  {
    tabs: {
      type: String,
      default: "board",
      enum: ["board", "table", "summary", "calendar", "form"],
      required: true,
    },
    sideBar: {
      proposes: {
        type: Boolean,
        default: true,
      },
      office: {
        type: Boolean,
        default: true,
      },
      reports: {
        type: Boolean,
        default: true,
      },
      guide: {
        type: Boolean,
        default: true,
      },
      telecom: {
        type: Boolean,
        default: true,
      },
      feedback: {
        type: Boolean,
        default: true,
      },
    },
    table: {
      devmode: { type: Boolean, default: false },
      theme: {
        header: {
          type: String,
          default: "#f8f8f8",
          enum: ["#f8f8f8", "#192335", "#d9d9d9"],
        },
        body: {
          type: String,
          default: "#f5f5f5",
          enum: ["#f5f5f5", "#192335", "#d9d9d9"],
        },
      },
      columnsDisplay: {
        feedback: { type: Boolean, default: false },
        gmail: { type: Boolean, default: false },
        email: { type: Boolean, default: false },
        location: { type: Boolean, default: false },
      },
      fields: {
        template: {
          type: String,
          default: "default",
          enum: ["default", "emoji", "icon"],
        },
        ruleSet: {
          text: {
            type: String,
            default: "default",
            enum: ["default", "custom"],
          },
          status: { type: Number, default: 0, min: 0, max: 6 },
          assignee: { type: String, required: true },
          priority: { type: Boolean, default: false },
        },
      },
    },
    summary: { type: Boolean, default: false },
    guide: {
      firstLogin: { type: Boolean, default: true },
      newbie: {
        learnHowToUseTable: { type: Boolean, default: true },
        learnHowToUseBoard: { type: Boolean, default: true },
        learnHowToUseSummary: { type: Boolean, default: true },
        learnHowToUseCalendar: { type: Boolean, default: true },
      },
    },
  },
  { timestamps: true }
);
const clientSaveModel = mongoose.model("ClientSave", clientSaveSchema);
export default clientSaveModel;
