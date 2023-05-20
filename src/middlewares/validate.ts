import { validationResult } from "express-validator";
import * as Interfaces from "../interfaces/index";
import * as Utils from "../utils/index";

const validate: Interfaces.Middlewares.Async = async (req, _res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(Utils.Response.error(errors.array()[0].msg, 400));
  }
  return next();
};

export default validate;
