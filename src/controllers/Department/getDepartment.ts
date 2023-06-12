import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";
import { invalidDetails } from "src/globals/errors";

const getDepartment: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const id = req.query.id as string;
    if (!id) {
      return res.json(invalidDetails);
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
