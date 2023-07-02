import upload from "src/controllers/upload/uploadFile";
import { fileUpload } from "src/utils/firebase";
import { Router } from "express";
import { isAuthenticated } from "src/middlewares";
const router: Router = Router();

router.post("/upload", isAuthenticated, fileUpload.single("filename"), upload);
export default router;
