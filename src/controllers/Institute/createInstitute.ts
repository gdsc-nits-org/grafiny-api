import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import * as Error from "../../globals/errors";

const createInstitute: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  try {
    const name: string = req.body.name;
    if (!name) {
      return res.json(Error.invalidDetails);
    }

    const existingInstitute = await Utils.prisma.institution.findFirst({
      where: {
        name: name.toUpperCase(),
      },
    });

    if (existingInstitute) {
      return res.json(
        Utils.Response.error("Institute With This Name Already Exists", 409)
      );
    }

    const institute = await Utils.prisma.institution.create({
      data: {
        name: name.toUpperCase(),
      },
    });

    return res.json(
      Utils.Response.success({
        institute,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default createInstitute;
