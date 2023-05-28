import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const createDepartment: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  try {
    const data: Interfaces.Department = req.body;
    const name: string = data.name;
    const instituteName: string = req.body.instituteName;

    if (!name || !instituteName) {
      throw new Error("Please Provide department and insttitute name");
    }
    const department = await Utils.Department.createDepartment(
      name,
      instituteName
    );
    if (department === null) {
      throw new Error("Could not create Department");
    }

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
