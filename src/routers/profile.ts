import { Router } from "express";
import { isAuthenticated } from "src/middlewares";
import * as Controllers from "../controllers";

const router: Router = Router();

router.post("/create", isAuthenticated, Controllers.Profile.createProfile);

export default router;
