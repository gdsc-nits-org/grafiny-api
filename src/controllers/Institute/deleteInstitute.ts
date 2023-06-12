import { invalidDetails } from "src/globals/errors";
import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const deleteInstitute: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  try {
    const name: string = req.query.institutename as string;
    if (!name) {
      return res.json(invalidDetails);
    }
    const deletedInstitute = await Utils.prisma.institution.delete({
      where: {
        name: name.toUpperCase(),
      },
    });

    return res.json(
      Utils.Response.success({
        msg: deletedInstitute,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default deleteInstitute;
