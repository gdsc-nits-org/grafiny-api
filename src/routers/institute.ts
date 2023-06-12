import { Router } from "express";
import { checkSuperAdmin, isAuthenticated } from "src/middlewares";
import {
  createInstitute,
  getAllInstitute,
  searchInstitute,
  deleteInstitute,
} from "src/controllers/Institute";

const router: Router = Router();

router.post("/create", isAuthenticated, checkSuperAdmin, createInstitute);
router.get("/getAll", getAllInstitute);
router.get("/search", isAuthenticated, searchInstitute);
router.delete("/", isAuthenticated, checkSuperAdmin, deleteInstitute);

export default router;
