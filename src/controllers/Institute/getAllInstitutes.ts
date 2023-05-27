import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const getAllInstitute: Interfaces.Controllers.Async = async (
  _req,
  res,
  next
) => {
  try {
    const institutes = await Utils.Institute.getAllInstitute();
    if (!institutes) {
      throw new Error("No Institutes Yet");
    }
    return res.json(
      Utils.Response.success({
        institutes: institutes,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default getAllInstitute;