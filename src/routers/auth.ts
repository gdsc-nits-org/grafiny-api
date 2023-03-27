import { Router } from "express";
import { signUp, login, logout } from "../controllers/auth/index";
import { LOGIN_VALIDATOR, SIGNUP_VALIDATOR } from "src/middlewares/validators";
import { validate } from "src/middlewares";
import passport from "passport";

const router: Router = Router();

router.post("/signup", SIGNUP_VALIDATOR, validate, signUp);
router.post(
  "/login",
  LOGIN_VALIDATOR,
  validate,
  passport.authenticate("local", { failWithError: true }),
  login
);
router.get("/logout", logout);

export default router;
