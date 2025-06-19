import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    pc_id: { type: String, required: true },
    employee_id_issue: { type: Number, default: null },
    skype: { type: String },
    teamview_id: { type: Number },
    teamview_password: { type: String },
    location: { type: String },
    status: { type: Number, default: 0 },
    handle: { type: Number, default: 0 },
    coworker: { type: Number, default: null },
    user_id: { type: Number, required: true },
    confirm: { type: String },
    action: { type: String },
    create_date: { type: Date, default: Date.now },
    type: { type: String, default: null },
    pc_id_ldap: { type: String },
    rating: { type: Number, default: null },
    difficulty: { type: Number, default: null },
    score_category: { type: String, default: null },
    feedback: { type: String, default: null },
    round: { type: Number, default: 1 },
    receive_date: { type: Date },
    process_date: { type: Date, default: null },
    receive_time: { type: Number },
    process_time: { type: Number, default: null },
    month: { type: String },
    challenge: { type: String, default: null },
    solution: { type: String, default: null },
    issuer: { type: String, default: null },
    employee_id: { type: Number, required: true },
    mission: { type: String },
    team: { type: String },
    fullname: { type: String, required: true },
    handler_name: { type: String },
    email: { type: String },
    gmail: { type: String }
  },
  { timestamps: true }
);

const ticketModel = mongoose.model("Ticket", ticketSchema);
export default ticketModel;
