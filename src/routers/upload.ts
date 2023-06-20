import { Router } from "express";
// import { isAuthenticated } from "src/middlewares";
import { handleUpload } from "../controllers/Items/upload";

const router: Router = Router();

router.post("/upload", handleUpload);

export default router;
