import express, { Router } from "express";
import { validateJWT } from "../middlewares/auth.middleware.js";
import { getMessages, getUsers, sendMessage } from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.get("/users", validateJWT, getUsers);

messageRouter.get("/:id", validateJWT, getMessages);
messageRouter.post("/send/:id", validateJWT, sendMessage);

export default messageRouter;