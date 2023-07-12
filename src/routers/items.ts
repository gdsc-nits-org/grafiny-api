import express from "express";
import * as Controllers from "../controllers";

const router = express.Router();

router.post("/upload", Controllers.Items.uploadItems);
router.delete("/:fileName", Controllers.Items.deleteFileByName);
router.get("/search", Controllers.Items.searchItemsByName);
export default router;
