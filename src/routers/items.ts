import express from "express";
// import { isAuthenticated } from "src/middlewares"; //will be checked afterwards
import { handleUpload } from "../controllers/Items/uploadItems";
import { deleteFileByName } from "../controllers/Items/deleteItems";

const router = express.Router();

router.post("/upload", handleUpload);
router.delete("/:fileName", deleteFileByName);
export default router;
