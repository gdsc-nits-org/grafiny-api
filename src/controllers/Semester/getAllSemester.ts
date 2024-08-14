import * as Interfaces from "../../interfaces";
import * as Utils from "../../utils";
import * as Error from "../../globals/errors";

const getAllSemester: Interfaces.Controllers.Async = async (req, res, next) => {
  try {
    const id: string = req.query.id as string;
    if (!id) {
      return res.json(Error.invalidDetails);
    }
    const department = await Utils.prisma.department.findFirst({
      where: {
        id,
      },
    });

    if (!department) {
      return res.json(Error.invalidDetails);
    }

    const semesterOrder = {
      FIRST: 1,
      SECOND: 2,
      THIRD: 3,
      FOURTH: 4,
      FIFTH: 5,
      SIXTH: 6,
      SEVENTH: 7,
      EIGHTH: 8,
    };

    const semesters = await Utils.prisma.semester.findMany({
      where: {
        departmentId: department.id,
      },
    });

    const sortedSemesters = semesters.sort((a, b) => {
      return semesterOrder[a.semNumber] - semesterOrder[b.semNumber];
    });
    return res.json(
      Utils.Response.success({
        semesters: sortedSemesters,
      })
    );
  } catch (err) {
    return next(err);
  }
};

export default getAllSemester;
