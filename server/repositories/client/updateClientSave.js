import clientSaveModel from "../../models/clientSaveModel.js";

const updateClientSaveById = async (id, clientSave) => {
  const updatedClientSave = await clientSaveModel.findByIdAndUpdate(
    id,
    clientSave,
    {
      new: true,
    }
  );
  return updatedClientSave;
};

export default updateClientSaveById;
