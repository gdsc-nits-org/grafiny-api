import * as Error from "./error";
import { invalidCredentials } from "src/globals/errors/auth";
import isAuthenticated from "./authenticate";
import validate from "./validate";
import checkAdmin from "./checkAdmin";
import checkSuperAdmin from "./checkSuperAdmin";
export {
  Error,
  invalidCredentials,
  isAuthenticated,
  validate,
  checkAdmin,
  checkSuperAdmin,
};
