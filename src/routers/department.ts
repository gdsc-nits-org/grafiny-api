import { Router } from "express";
import { checkAdmin, isAuthenticated } from "src/middlewares";
import {
  createDepartment,
  getAllDepartments,
  getDepartment,
  deleteDepartment,
} from "src/controllers/Department";

const router: Router = Router();

router.post("/create", isAuthenticated, checkAdmin, createDepartment);
router.get("/getAll", getAllDepartments);
router.get("/get", getDepartment);
router.delete("/delete", isAuthenticated, checkAdmin, deleteDepartment);

export default router;
