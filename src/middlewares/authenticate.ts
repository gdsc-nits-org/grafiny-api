import * as Utils from "../utils/response";

const isAuthenticated = (req: any, _res: any, next: any) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return next(Utils.error("Unauthorized", 401));
};

export default isAuthenticated;
