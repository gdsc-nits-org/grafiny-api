import { Router } from "express";
import { isAuthenticated } from "src/middlewares";
import {
  createTopic,
  getAllTopics,
  getTopic,
  deleteTopic,
} from "src/controllers/Topics";

const router: Router = Router();

router.post("/create", isAuthenticated, createTopic);
router.get("/getAll", getAllTopics);
router.get("/get", getTopic);
router.delete("/", isAuthenticated, deleteTopic);

export default router;
