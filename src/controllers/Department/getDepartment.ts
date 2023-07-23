import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import * as Error from "../../globals/errors";

const getDepartment: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const id = req.query.id as string;
    if (!id) {
      return res.json(Error.invalidDetails);
    }
    const department = await Utils.prisma.department.findFirst({
      where: {
        id,
      },
      include: {
        courses: true,
      },
    });

    return res.json(
      Utils.Response.success({
        department,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default getDepartment;
