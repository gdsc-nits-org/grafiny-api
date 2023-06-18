import * as Utils from "../utils/response";
import { AUTH_LEVEL } from "@prisma/client";

const checkSuperAdmin = async (req: any, _res: any, next: any) => {
  if (req?.user?.authorisationLevel === AUTH_LEVEL.SUPERADMIN) {
    return next();
  }

  return next(Utils.error("Not Super Admin", 401));
};

export default checkSuperAdmin;
