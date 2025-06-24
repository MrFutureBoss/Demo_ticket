import ticketModel from "../../models/ticketModel.js";

const getAllTicket = async (filter = {}) => {
  try {
    const tickets = await ticketModel.find(filter)
      .sort({ created_at: -1 });
    return tickets;
  } catch (error) {
    throw new Error(`Failed to fetch tickets: ${error.message}`);
  }
};

const getTicketById = async (id) => {
  const ticket = await ticketModel.findById(id);
  return ticket;
};

export default { getTicketById, getAllTicket };