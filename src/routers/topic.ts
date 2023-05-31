import { Router } from "express";
import { isAuthenticated } from "src/middlewares";
import {
  createTopic,
  getAllTopics,
  getTopic,
  deleteTopic,
} from "src/controllers/Topic";

const router: Router = Router();

router.post("/create", isAuthenticated, createTopic);
router.get("/getAll", getAllTopics);
router.get("/get", getTopic);
router.delete("/delete", isAuthenticated, deleteTopic);

export default router;
