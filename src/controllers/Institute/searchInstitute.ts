import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import * as Error from "../../globals/errors";

const searchInstitute: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  try {
    const instituteName = req.query.institutename as string;
    if (!instituteName) {
      return res.json(Error.invalidDetails);
    }
    const institutes = await Utils.prisma.institution.findMany({
      where: {
        name: {
          contains: instituteName.toUpperCase(),
        },
      },
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

export default searchInstitute;
