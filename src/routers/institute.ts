import { Router } from "express";
import { INSTITUTE_VALIDATOR } from "src/middlewares/validators";
import { checkSuperAdmin, isAuthenticated, validate } from "src/middlewares";
import {
  createInstitute,
  getAllInstitute,
  searchInstitute,
  deleteInstitute,
} from "src/controllers/Institute";

const router: Router = Router();

router.post(
  "/create",
  isAuthenticated,
  checkSuperAdmin,
  INSTITUTE_VALIDATOR,
  validate,
  createInstitute
);
router.get("/getAll", getAllInstitute);
router.get("/search", isAuthenticated, searchInstitute);
router.delete("/", isAuthenticated, checkSuperAdmin, deleteInstitute);

export default router;
