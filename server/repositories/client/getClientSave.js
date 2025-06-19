import clientSaveModel from "../../models/clientSaveModel.js";

const getClientSaveById = async (id) => {
  const clientSave = await clientSaveModel.findById(id);
  return clientSave;
};

export default getClientSaveById;
