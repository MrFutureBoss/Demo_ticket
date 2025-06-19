import ticketModel from "../../models/ticketModel.js";

const patchTicketById = async (id, data) => {
  const ticket = await ticketModel.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true }
  );
  return ticket;
};

export default patchTicketById; 