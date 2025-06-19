import ticketModel from "../../models/ticketModel.js";

const createNewTicket = async (data) => {
  const newTicket = await ticketModel.create(data);
  return newTicket;
};

export default createNewTicket; 