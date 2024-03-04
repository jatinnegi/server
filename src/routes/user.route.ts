import { Router } from "express";
import withValidation, {
  UserLoginValidation,
  UserRegisterValidation,
} from "@/validators/index.validators";
import authGuards from "@/guards";
import userController from "@/controllers/user.controller";

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

export default router;
