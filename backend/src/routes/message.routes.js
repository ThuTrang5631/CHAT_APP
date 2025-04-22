import { protectRoute } from "../middleware/auth.middleware.js";
import express from express;
import { getMessages, getUsersForSideBar } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSideBar)
router.get("/:id", protectRoute, getMessages)

export default router;