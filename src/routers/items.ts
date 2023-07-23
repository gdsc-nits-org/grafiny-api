import express from "express";
import * as Controllers from "../controllers";
import { isAuthenticated } from "src/middlewares";

const router = express.Router();

router.get("/search", Controllers.Items.searchItemsByName);
router.get("/allitems", Controllers.Items.getAllItems);
router.post("/upload", isAuthenticated, Controllers.Items.uploadItems);
router.post("/searchinTopic", Controllers.Items.searchItemsByNameInTopic);
router.delete(
  "/deleteFolder",
  isAuthenticated,
  Controllers.Items.deleteItemFolder
);
export default router;
