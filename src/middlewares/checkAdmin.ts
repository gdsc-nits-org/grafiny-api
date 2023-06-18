import * as Utils from "../utils/response";
import { AUTH_LEVEL } from "@prisma/client";

const checkAdmin = async (req: any, _res: any, next: any) => {
  if (
    req?.user?.authorisationLevel === AUTH_LEVEL.ADMIN ||
    req?.user?.authorisationLevel === AUTH_LEVEL.SUPERADMIN
  ) {
    return next();
  }

  return next(Utils.error("Not Admin", 401));
};

export default checkAdmin;
