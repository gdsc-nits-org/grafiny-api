import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const createDepartment: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  try {
    const { name, instituteName } = req.body as Interfaces.Department;

    if (!name || !instituteName) {
      throw new Error("Please Provide department and institute name");
    }
    const institute = await Utils.prisma.institution.findFirst({
      where: {
        name: instituteName,
      },
    });

    if (!institute) {
      throw new Error("No Such Institute");
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
