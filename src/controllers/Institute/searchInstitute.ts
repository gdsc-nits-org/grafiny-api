import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const searchInstitute: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  try {
    const instituteName = req.query.institutename as string;
    if (!instituteName) {
      throw new Error("Please Provide a Name");
    }
    const institute = await Utils.Institute.getInstitute(instituteName);

    return res.json(
      Utils.Response.success({
        institutes: institute,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default searchInstitute;
