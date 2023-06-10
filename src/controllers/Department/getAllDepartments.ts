import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const getAllDepartments: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  try {
    const id: string = req.query.id as string;
    if (!id) {
      throw new Error("Please Provide Institute Id");
    }

    const institute = await Utils.prisma.institution.findFirst({
      where: {
        id,
      },
    });

    if (!institute) {
      throw new Error("No Such Institute Found");
    }

    const departments = await Utils.prisma.department.findMany({
      where: {
        instituteID: institute.id,
      },
      include: {
        courses: true,
      },
    });

    return res.json(
      Utils.Response.success({
        departments,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default getAllDepartments;
