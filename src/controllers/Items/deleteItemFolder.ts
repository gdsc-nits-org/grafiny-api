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

    const deletedItem = await Utils.prisma.items.delete({
      where: {
        id: itemId,
      },
    });

    return res.json(
      Utils.Response.success({
        msg: deletedItem,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default deleteItemFolder;
