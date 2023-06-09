import * as Utils from "../utils/response";

const checkAdmin = async (req: any, _res: any, next: any) => {
  if (
    req.user &&
    (req.user.authorisationLevel === "ONE" ||
      req.user.authorisationLevel === "TWO")
  ) {
    return next();
  }

  return next(Utils.error("Not Admin", 401));
};

export default checkAdmin;
