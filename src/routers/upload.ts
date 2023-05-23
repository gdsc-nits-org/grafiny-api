import express from "express";
import { handleUpload } from "../controllers/upload/upload";

const router = express.Router();

router.post("/upload", handleUpload);

export default router;
