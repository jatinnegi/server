import { Router } from "express";
import withValidation, {
  UserLoginValidation,
  UserRegisterValidation,
} from "@/validators/index.validators";
import userController from "@/controllers/user.controller";

const router = Router();

router.post(
  "/login",
  withValidation(UserLoginValidation),
  userController.login
);
router.post(
  "/register",
  withValidation(UserRegisterValidation),
  userController.register
);

export default router;
