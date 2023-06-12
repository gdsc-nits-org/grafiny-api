import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";
import { invalidDetails } from "src/globals/errors";

const createDepartment: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  try {
    const { name, instituteName } = req.body as Interfaces.Department;

    if (!name || !instituteName) {
      return res.json(invalidDetails);
    }
    const institute = await Utils.prisma.institution.findFirst({
      where: {
        name: instituteName,
      },
    });

    if (!institute) {
      return res.json(invalidDetails);
    }

    const department = await Utils.prisma.department.create({
      data: {
        name,
        institution: {
          connect: {
            id: institute.id,
          },
        },
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

export default createDepartment;
