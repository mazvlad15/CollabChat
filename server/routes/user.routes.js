import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getAllUsers, profile} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", protectRoute, profile);

router.get("/all", protectRoute, getAllUsers);

export default router;