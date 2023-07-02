import multer from "multer";
const fileUpload = multer({ storage: multer.memoryStorage() });

export default fileUpload;
