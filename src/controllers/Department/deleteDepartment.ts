import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const deleteDepartment: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  try {
    const departmentId: string = req.query.id as string;
    if (!departmentId) {
      throw new Error("Please Provide a Department Id");
    }
    const deletedDepartment = await Utils.Department.deleteDepartment(
      departmentId
    );

    return res.json(
      Utils.Response.success({
        msg: deletedDepartment,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default deleteDepartment;
