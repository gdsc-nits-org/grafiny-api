import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";

const getAllInstitute: Interfaces.Controllers.Async = async (
  _req,
  res,
  next
) => {
  try {
    const institutes = await Utils.prisma.institution.findMany({
      include: {
        departments: true,
      },
    });

    return res.json(
      Utils.Response.success({
        institutes,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default getAllInstitute;
