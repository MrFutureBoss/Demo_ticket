import express from "express";
import {
  createNewTicketController,
  getTicketByIdController,
  updateTicketByIdController,
  patchTicketByIdController,
  getAllTicketController,
} from "../controllers/ticket/ticketController.js";

const ticketRouter = express.Router();

ticketRouter.post("/", createNewTicketController);
ticketRouter.get("/getTicket/:id", getTicketByIdController);
ticketRouter.get("/getAllTickets", getAllTicketController);
ticketRouter.put("/:id", updateTicketByIdController);
ticketRouter.patch("/:id", patchTicketByIdController);

export default ticketRouter;
