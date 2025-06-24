import createNewTicket from "../../repositories/ticket/createNewTicket.js";
import getTicketRepo from "../../repositories/ticket/getTicket.js";
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
    const ticket = await getTicketRepo.getTicketById(id);
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

const getAllTicketController = async (req, res) => {
  try {
    const { status, type } = req.query;
    
    // Build filter object
    let filter = {};
    
    // Add status filter if provided
    if (status !== undefined) {
      filter.status = parseInt(status);
    }

    // Add type filter
    if (type !== undefined) {
      if (type.toUpperCase() === "IT") {
        // For IT tickets with status
        if (status !== undefined) {
          filter = {
            $and: [
              { type: null },
              { status: parseInt(status) }
            ]
          };
        } else {
          filter.type = null;
        }
      } else {
        // For other types (e.g., HR) with status
        if (status !== undefined) {
          filter = {
            $and: [
              { type: type },
              { status: parseInt(status) }
            ]
          };
        } else {
          filter.type = type;
        }
      }
    }

    const tickets = await getTicketRepo.getAllTicket(filter);
    res.status(200).json({
      success: true,
      message: "Tickets fetched successfully",
      tickets: tickets,
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
  getAllTicketController,
  updateTicketByIdController,
  patchTicketByIdController,
}; 