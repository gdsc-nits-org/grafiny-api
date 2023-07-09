import express from "express";
import * as Middlewares from "../middlewares";
import * as Controllers from "../controllers";

const router = express.Router();

router.post(
  "/create",
  Middlewares.checkAdmin,
  Controllers.Department.createDepartment
);
router.get("/getAll", Controllers.Department.getAllDepartments);
router.get("/get", Controllers.Department.getDepartment);
router.delete(
  "/",
  Middlewares.isAuthenticated,
  Middlewares.checkAdmin,
  Controllers.Department.deleteDepartment
);

export default router;
