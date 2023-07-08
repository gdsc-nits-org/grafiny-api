import express from "express";
import { isAuthenticated } from "src/middlewares";
import {
  createCourse,
  getAllCourses,
  getCourse,
  deleteCourse,
} from "src/controllers/Course";

const router = express.Router();

router.post("/create", isAuthenticated, createCourse);
router.get("/getAll", getAllCourses);
router.get("/get", getCourse);
router.delete("/", isAuthenticated, deleteCourse);

export default router;
