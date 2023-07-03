import { Router } from "express";
// import { isAuthenticated } from "src/middlewares";
import { handleUpload } from "../controllers/Items/uploadItems";
import { deleteFileByName } from "../controllers/Items/deleteItems";
const router: Router = Router();

router.post("/upload", handleUpload);
router.delete("/:fileName", deleteFileByName);
export default router;
