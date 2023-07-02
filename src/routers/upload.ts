import upload from "src/controllers/upload/uploadFile";
import { fileUpload } from "src/utils/firebase";
import { Router } from "express";
const router: Router = Router();

router.post("/upload", fileUpload.single("filename"), upload);
export default router;
