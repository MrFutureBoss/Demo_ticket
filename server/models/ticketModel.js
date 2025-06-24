import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, default: null },
    content: { type: String, required: true, default: null },
    pc_id: { type: String, default: null },
    employee_id_issue: { type: Number, default: null },
    skype: { type: String, default: null },
    teamview_id: { type: String, default: null },
    teamview_password: { type: String, default: null },
    location: { type: String, default: null },
    status: { type: Number, default: 0 },
    handle: { type: Number, default: 0 },
    coworker: { type: Number, default: null },
    user_id: { type: Number, default: null },
    confirm: { type: String, default: null },
    action: { type: String, default: null },
    create_date: { type: Date, default: Date.now },
    type: { type: String, default: null },
    pc_id_ldap: { type: String },
    rating: { type: Number, default: null },
    difficulty: { type: Number, default: null },
    score_category: { type: String, default: null },
    feedback: { type: String, default: null },
    round: { type: Number, default: 1 },
    receive_date: { type: Date, default: null },
    process_date: { type: Date, default: null },
    receive_time: { type: Number, default: null },
    process_time: { type: Number, default: null },
    month: { type: String, default: null },
    challenge: { type: String, default: null },
    solution: { type: String, default: null },
    issuer: { type: String, default: null },
    employee_id: { type: Number, default: null },
    mission: { type: String, default: null },
    team: { type: String, default: null },
    fullname: { type: String, default: null },
    handler_name: { type: String, default: null },
    email: { type: String, default: null },
    gmail: { type: String, default: null }
  },
  { timestamps: true }
);

const ticketModel = mongoose.model("Ticket", ticketSchema);
export default ticketModel;
