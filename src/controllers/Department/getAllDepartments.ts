import * as Interfaces from "../../interfaces/index";
import * as Utils from "../../utils/index";

const getAllDepartments: Interfaces.Controllers.Async = async (
  req,
  res,
  next
) => {
  try {
    const instituteId: string = req.query.id as string;
    if (!instituteId) {
      throw new Error("Please Provide Institute Id");
    }
    const departments = await Utils.Department.getAllDepartments(instituteId);
    if (!departments) {
      throw new Error("No Departments Yet");
    }
    return res.json(
      Utils.Response.success({
        departments: departments,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default getAllDepartments;
