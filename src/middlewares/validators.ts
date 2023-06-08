import { body } from "express-validator";
import * as Utils from "../utils/index";

const SIGNUP_VALIDATOR = [
  body("name").isString().not().isEmpty().trim(),
  body("email").isEmail().not().isEmpty().trim(),
  body("password").isString().not().isEmpty().isLength({ min: 6 }),
  body("email").normalizeEmail().custom(Utils.Auth.db.checkEmail),
];

const LOGIN_VALIDATOR = [
  body("email").isEmail().not().isEmpty().trim(),
  body("password").isString().not().isEmpty().isLength({ min: 6 }),
];

const INSTITUTE_VALIDATOR = [
  body("name").custom(Utils.Institute.checkInstitute),
];

export { SIGNUP_VALIDATOR, LOGIN_VALIDATOR, INSTITUTE_VALIDATOR };
