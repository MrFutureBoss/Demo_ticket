import express from "express";
import {
  createNewClientSaveController,
  getClientSaveByIdController,
  updateClientSaveByIdController,
  patchClientSaveByIdController,
} from "../controllers/client/clientSaveController.js";

const clientSaveRouter = express.Router();

clientSaveRouter.post("/", createNewClientSaveController);
clientSaveRouter.get("/getClientSave/:id", getClientSaveByIdController);
clientSaveRouter.put("/:id", updateClientSaveByIdController);
clientSaveRouter.patch("/patchClientSave/:id", patchClientSaveByIdController);

export default clientSaveRouter;
