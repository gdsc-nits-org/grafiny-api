import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import * as Error from "../../globals/errors";

const createDepartment: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  try {
    const { name, instituteName } = req.body as Interfaces.Department;

    if (!name || !instituteName) {
      return res.json(Error.invalidDetails);
    }
    const institute = await Utils.prisma.institution.findFirst({
      where: {
        name: instituteName,
      },
    });

    if (!institute) {
      return res.json(Error.invalidDetails);
    }

    const existingDepartment = await Utils.prisma.department.findFirst({
      where: {
        AND: [{ name }, { instituteID: institute.id }],
      },
    });

    if (existingDepartment) {
      return res.json(
        Utils.Response.error(
          "Department With This Name Already Exists. Please Try a With Different Name",
          409
        )
      );
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
