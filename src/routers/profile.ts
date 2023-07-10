import { Router } from "express";
import { isAuthenticated } from "src/middlewares";
import { createProfile } from "src/controllers/Profile";

const router: Router = Router();

router.post("/create", isAuthenticated, createProfile);

export default router;
