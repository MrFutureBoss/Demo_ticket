import createNewTicket from "../../repositories/ticket/createNewTicket.js";
import getTicketById from "../../repositories/ticket/getTicket.js";
import updateTicketById from "../../repositories/ticket/updateTicket.js";
import patchTicketById from "../../repositories/ticket/patchTicket.js";

const createNewTicketController = async (req, res) => {
  try {
    const ticket = await createNewTicket(req.body);
    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      data: ticket,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getTicketByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await getTicketById(id);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Ticket fetched successfully",
      data: ticket,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTicketByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await updateTicketById(id, req.body);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Ticket updated successfully",
      data: ticket,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const patchTicketByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await patchTicketById(id, req.body);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Ticket patched successfully",
      data: ticket,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createNewTicketController,
  getTicketByIdController,
  updateTicketByIdController,
  patchTicketByIdController,
}; 