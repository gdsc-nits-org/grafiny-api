import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const createInstitute: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  const data: string = req.body.name;
  try {
    const institute = await Utils.Institute.createInstitute(data);
    if (institute === null) {
      throw new Error("Could not create Institute");
    }

    return res.json(
      Utils.Response.success({
        institute: institute,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default createInstitute;
