import { Router } from "express";
import withValidation, {
  UserLoginValidation,
  UserRegisterValidation,
} from "@/validators/index.validators";
import * as authGuards from "@/guards";
import * as userController from "@/controllers/user.controller";

const router = Router();

router.get("/", authGuards.isAuth, userController.getUser);
router.post(
  "/login",
  authGuards.isGuest,
  withValidation(UserLoginValidation),
  userController.login
);
router.post(
  "/register",
  authGuards.isGuest,
  withValidation(UserRegisterValidation),
  userController.register
);
router.post("/logout", authGuards.isAuth, userController.logout);

export default router;
