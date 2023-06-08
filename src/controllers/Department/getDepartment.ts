import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const getDepartment: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const departmentId = req.query.id as string;
    if (!departmentId) {
      throw new Error("Please Provide a Id");
    }
    const department = await Utils.Department.getDepartment(departmentId);

    return res.json(
      Utils.Response.success({
        department: department,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default getDepartment;
