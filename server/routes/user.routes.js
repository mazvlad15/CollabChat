import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getAllUsers, getUsersInRoom, profile} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", protectRoute, profile);

router.get("/all", protectRoute, getAllUsers);

router.get("/room/:roomId", protectRoute, getUsersInRoom)

export default router;