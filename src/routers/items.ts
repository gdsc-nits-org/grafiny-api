import express from "express";
import * as Controllers from "../controllers";

const router = express.Router();

router.get("/search", Controllers.Items.searchItemsByName);
router.post("/upload", Controllers.Items.uploadItems);
router.post("/searchinTopic", Controllers.Items.searchItemsByNameInTopic);
router.delete("/:fileName", Controllers.Items.deleteFileByName);
router.delete("/deleteFolder", Controllers.Items.deleteItemFolder);
export default router;
