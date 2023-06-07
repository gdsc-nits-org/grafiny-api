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
      throw new Error("Please Provide Institute Name...");
    }
    const deletedInstitute = await Utils.Institute.deleteInstitute(name);

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
