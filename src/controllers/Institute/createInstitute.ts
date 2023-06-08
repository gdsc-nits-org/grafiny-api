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
