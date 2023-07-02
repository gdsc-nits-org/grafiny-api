import { firebaseConfig } from "src/utils/firebase";
import { initializeApp } from "firebase/app";
import * as Utils from "../../utils/index";
import * as Interfaces from "../../interfaces/index";
import { invalidDetails } from "src/globals/errors";

initializeApp(firebaseConfig);
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

const storage = getStorage();

const upload: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    if (!req.file) {
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
      return res.json(invalidDetails);
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
    // firebase upload starts here
    const storageRef = ref(storage, `files2/${req.file.originalname}`);

    const metaData = {
      contentType: req.file?.mimetype,
    };

    const snap = await uploadBytes(storageRef, req.file.buffer, metaData);

    const url = await getDownloadURL(snap.ref);
    // firebase upload ends here

    const newItem = await Utils.prisma.items.create({
      data: {
        name,
        itemLink: url,
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
      },
    });
    return res.json(
      Utils.Response.success({
        newItem,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default upload;
