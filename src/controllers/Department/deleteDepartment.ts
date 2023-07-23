import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import * as Error from "../../globals/errors";

const deleteDepartment: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  try {
    const id: string = req.query.id as string;
    if (!id) {
      return res.json(Error.invalidDetails);
    }
    const deletedDepartment = await Utils.prisma.department.delete({
      where: {
        id,
      },
    });
    return res.json(
      Utils.Response.success({
        msg: deletedDepartment,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default deleteDepartment;
