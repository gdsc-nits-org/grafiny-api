import { RequestHandler } from "express";
import multer, { FileFilterCallback } from "multer";
import { s3Upload } from "../../utils/aws/upload";

const storage = multer.memoryStorage();
const fileFilter = (_: any, file: any, cb: FileFilterCallback) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 20, files: 5 },
});

export const handleUpload: RequestHandler = async (req: any, res: any) => {
  upload.array("file")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(422).json({ error: "Allowed file size is 20MB" });
      }
      if (err.code === "LIMIT_FILE_COUNT") {
        return res
          .status(422)
          .json({ error: "Only 5 files are allowed at a time" });
      }
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res
          .status(422)
          .json({ error: "Only pdf files and images are allowed" });
      }
    }
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
    try {
      const results = await s3Upload(req.files);
      console.log(results);
      return res.json({ message: "File uploaded successfully" });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "Error uploading file", details: err });
    }
  });
};
