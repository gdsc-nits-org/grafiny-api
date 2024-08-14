import express from "express";
import * as Middlewares from "../middlewares";
import * as Controllers from "../controllers";

const router = express.Router();

router.post(
  "/create",
  Middlewares.isAuthenticated,
  Middlewares.checkAdmin,
  Controllers.Department.createDepartment
);
router.get(
  "/getAll",
  Middlewares.isAuthenticated,
  Controllers.Department.getAllDepartments
);
router.get(
  "/get",
  Middlewares.isAuthenticated,
  Controllers.Department.getDepartment
);
router.delete(
  "/",
  Middlewares.isAuthenticated,
  Middlewares.checkAdmin,
  Controllers.Department.deleteDepartment
);

export default router;
