import { Router } from "express";
import withValidation, {
  UserRegisterValidation,
} from "@/validators/index.validators";
import userController from "@/controllers/user.controller";

const router = Router();

router.post(
  "/register",
  withValidation(UserRegisterValidation),
  userController.register
);

export default router;
