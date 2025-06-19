import clientSaveModel from "../../models/clientSaveModel.js";

const createNewClientSave = async (data) => {
  const newClientSave = await clientSaveModel.create(data);
  return newClientSave;
};

export default createNewClientSave;