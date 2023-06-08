import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const createDepartment: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  try {
    const data: Interfaces.Department = req.body;
    const name = data.name;
    const instituteName = data.instituteName;

    if (!name || !instituteName) {
      throw new Error("Please Provide department and institute name");
    }
    const department = await Utils.Department.createDepartment(
      name,
      instituteName
    );

    return res.json(
      Utils.Response.success({
        department: department,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default createDepartment;
