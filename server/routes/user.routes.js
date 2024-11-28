import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { profile} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", protectRoute, profile);

export default router;