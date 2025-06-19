import ticketModel from "../../models/ticketModel.js";

const getTicketById = async (id) => {
  const ticket = await ticketModel.findById(id);
  return ticket;
};

export default getTicketById; 