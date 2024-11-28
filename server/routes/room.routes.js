import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getMessages, createRoom, getRoomsWhereUserIn, addParticipant } from "../controllers/room.controller.js";

const router = express.Router();

router.get("/roomMessages/:id", protectRoute, getMessages);

router.post("/create", protectRoute, createRoom);

router.get("/participate", protectRoute, getRoomsWhereUserIn);

router.patch("/addParticipant/:roomId", protectRoute, addParticipant)

export default router;