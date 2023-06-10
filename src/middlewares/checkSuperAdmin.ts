import * as Utils from "../utils/response";

const checkSuperAdmin = async (req: any, _res: any, next: any) => {
  if (req.user && req.user.authorisationLevel === "SUPERADMIN") {
    return next();
  }

  return next(Utils.error("Not Super Admin", 401));
};

export default checkSuperAdmin;
