import express from "express";
import * as Controllers from "../controllers";

const router = express.Router();

router.get("/search", Controllers.Items.searchItemsByName);
router.get("/allitems", Controllers.Items.getAllItems);
router.post("/upload", Controllers.Items.uploadItems);
router.post("/searchinTopic", Controllers.Items.searchItemsByNameInTopic);
router.delete("/deleteFolder", Controllers.Items.deleteItemFolder);
export default router;
