import createNewClientSave from "../../repositories/client/createNewClientSave.js";
import getClientSaveById from "../../repositories/client/getClientSave.js";
import updateClientSaveById from "../../repositories/client/updateClientSave.js";
import patchClientSaveById from "../../repositories/client/patchClientSave.js";

const createNewClientSaveController = async (req, res) => {
  const clientSave = await createNewClientSave(req.body);
  res.status(201).json({
    success: true,
    message: "Client save created successfully",
    data: clientSave,
  });
};

const getClientSaveByIdController = async (req, res) => {
  const { id } = req.params;
  const clientSave = await getClientSaveById(id);
  res.status(200).json({
    success: true,
    message: "Client save fetched successfully",
    data: clientSave,
  });
};

const updateClientSaveByIdController = async (req, res) => {
  const { id } = req.params;
  const clientSave = await updateClientSaveById(id, req.body);
  res.status(200).json(clientSave);
};

const patchClientSaveByIdController = async (req, res) => {
  const { id } = req.params;
  const clientSave = await patchClientSaveById(id, req.body);
  res.status(200).json({
    success: true,
    message: "Client save patched successfully",
    data: clientSave,
  });
};

export {
  createNewClientSaveController,
  getClientSaveByIdController,
  updateClientSaveByIdController,
  patchClientSaveByIdController,
};
