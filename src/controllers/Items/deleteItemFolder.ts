import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";
import * as Error from "../../globals/errors/index";

const deleteItemFolder: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  try {
    const itemId = req.query.id as string;
    if (!itemId) {
      return res.json(Error.invalidDetails);
    }

    const item = await Utils.prisma.items.findFirst({
      where: {
        id: itemId,
      },
      include: {
        file: true,
      },
    });

    if (!item) {
      return res.json(Error.invalidDetails);
    }

    const keys = item.file.map((fileobj) => fileobj.key) as string[];
    await Utils.Delete.deleteFiles(keys);
    await Utils.prisma.items.delete({
      where: {
        id: itemId,
      },
    });

    return res.json(
      Utils.Response.success({
        msg: "Item Folder Deleted Succesfully",
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default deleteItemFolder;
