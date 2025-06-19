import ticketModel from "../../models/ticketModel.js";

const updateTicketById = async (id, data) => {
  const ticket = await ticketModel.findByIdAndUpdate(id, data, { new: true });
  return ticket;
};

export default updateTicketById; 