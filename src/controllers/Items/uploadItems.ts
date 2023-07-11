import { RequestHandler } from "express";
import * as Utils from "../../utils";
import multer from "multer";
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 20, files: 5 },
});

const handleUpload: RequestHandler = async (req: any, res: any) => {
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
    try {
      const results = await Utils.Upload.s3Upload(req.files);
      console.log(results);
      const fileUrls = results.map((result: any) => result.fileUrl);
      return res.json(Utils.Response.success({ results, fileUrls }));
    } catch (err) {
      console.log(err);
      return res.json(Utils.Response.error("Error uploading file", 409));
    }
  });
};
export default handleUpload;
