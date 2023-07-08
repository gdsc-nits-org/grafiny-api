import { RequestHandler } from "express";
import * as Utils from "../../utils";
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
        return res.json(Utils.Response.error("File size too large", 422));
      }
      if (err.code === "LIMIT_FILE_COUNT") {
        return res.json(Utils.Response.error("Only 5 files are allowed", 422));
      }
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.json(
          Utils.Response.error(
            "Only pdf, jpeg, jpg, png files are allowed",
            422
          )
        );
      }
    }
    if (err) {
      return res.json(Utils.Response.error("Error uploading file", 500));
    }
    try {
      const results = await s3Upload(req.files);
      console.log(results);
      return res.json(Utils.Response.success({ results }));
    } catch (err) {
      console.log(err);
      return res.json(Utils.Response.error("Error uploading file", 500));
    }
  });
};
