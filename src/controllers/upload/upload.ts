import { RequestHandler } from "express";
import multer, { FileFilterCallback } from "multer";
import prisma from "../../utils/prisma";
import {
  generateUniqueFilename,
  validateFileType,
} from "../../utils/upload/fileUtils";

const storage = multer.diskStorage({
  destination: "uploads/",
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  filename: (req, file, cb) => {
    const uniqueFilename = generateUniqueFilename(file.originalname);
    cb(null, uniqueFilename);
  },
});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const fileFilter = (req: any, file: any, cb: FileFilterCallback) => {
  const isValidType = validateFileType(file);
  if (isValidType) {
    cb(null, true);
  }
};

const upload = multer({ storage, fileFilter });
export const handleUpload: RequestHandler = (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { originalname, filename } = req.file;

    try {
      const uploadedItem = await prisma.item.create({
        data: {
          name: originalname,
          itemLink: filename,
        },
      });

      return res
        .status(200)
        .json({ message: "File uploaded successfully", item: uploadedItem });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
};
