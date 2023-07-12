import { RequestHandler } from "express";
import * as Utils from "../../utils";
import * as Interfaces from "../../interfaces/index";
import * as Error from "../../globals/errors/index";
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
      if (!req.files) {
        return res.json(Utils.Response.error("No File Send", 409));
      }

      const user = await Utils.prisma.user.findFirst({
        where: {
          id: req.user?.id,
        },
        include: {
          profile: true,
        },
      });
      if (!user) {
        return res.json(Error.invalidDetails);
      }

      if (!user.profile) {
        return res.json(
          Utils.Response.error(
            "Please Create A Profile First Before Uploading Any Files",
            409
          )
        );
      }

      const { name, topicId } = req.body as Interfaces.Item;
      console.log(name, typeof name, topicId, typeof topicId);
      const existingItem = await Utils.prisma.items.findFirst({
        where: {
          AND: [{ name }, { topicId }],
        },
      });

      if (existingItem) {
        return res.json(
          Utils.Response.error(
            "Item With This Name Already Exists In The Topic",
            409
          )
        );
      }
      //AWS Upload Function Starts Here
      const results = await Utils.Upload.s3Upload(req.files);
      console.log(results);
      // AWS Upload Function Ends Here
      const newItem = await Utils.prisma.items.create({
        data: {
          name,
          topic: {
            connect: {
              id: topicId,
            },
          },
          profile: {
            connect: {
              id: user.profile.id,
            },
          },
          file: {
            create: results,
          },
        },
        include: {
          file: true,
        },
      });

      return res.json(Utils.Response.success({ newItem }));
    } catch (err) {
      console.log(err);
      return res.json(Utils.Response.error("Error uploading file", 409));
    }
  });
};
export default handleUpload;
