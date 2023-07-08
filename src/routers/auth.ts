import express from "express";
import {
  signUp,
  login,
  logout,
  adminSignUp,
  superAdminSignUp,
} from "../controllers/auth/index";
import { LOGIN_VALIDATOR, SIGNUP_VALIDATOR } from "src/middlewares/validators";
import { validate } from "src/middlewares";
import passport from "passport";

const router = express.Router();

router.post("/signup", SIGNUP_VALIDATOR, validate, signUp);
router.post(
  "/login",
  LOGIN_VALIDATOR,
  validate,
  passport.authenticate("local", { failWithError: true }),
  login
);

router.post("/adminSignup", SIGNUP_VALIDATOR, validate, adminSignUp);
router.post("/superAdminSignup", SIGNUP_VALIDATOR, validate, superAdminSignUp);
router.get("/logout", logout);

export default router;
