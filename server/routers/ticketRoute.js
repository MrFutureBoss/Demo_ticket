import express from "express";
import {
  createNewTicketController,
  getTicketByIdController,
  updateTicketByIdController,
  patchTicketByIdController,
} from "../controllers/ticekt/ticketController.js";

const ticketRouter = express.Router();

ticketRouter.post("/", createNewTicketController);
ticketRouter.get("/getTicket/:id", getTicketByIdController);
ticketRouter.put("/:id", updateTicketByIdController);
ticketRouter.patch("/patchTicket/:id", patchTicketByIdController);

export default ticketRouter; 