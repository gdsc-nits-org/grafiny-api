import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const deleteInstitute: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  try {
    const name: string = req.query.institutename as string;
    const deletedInstitute = await Utils.Institute.deleteInstitute(name);

    if (deletedInstitute === null) {
      throw new Error("No Such Institute Exists");
    }

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
