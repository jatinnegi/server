import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationChain } from "express-validator";
import { cleanErrors } from "@/utils";
import UserModel from "@/models/User.model";

const withValidation =
  (validations: ValidationChain[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(
      validations.map((validation: ValidationChain) => validation.run(req))
    );

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const cleanedErrors = cleanErrors(errors.array());
      return res.status(400).json({
        type: "VaidationErrors",
        errors: cleanedErrors,
      });
    }

    next();
  };

export const UserLoginValidation = [
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const UserRegisterValidation = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email").custom((value) => {
    return new Promise(async (resolve, reject) => {
      const user = await UserModel.findOne({ email: value });

      if (user) {
        reject(new Error("Email is already taken"));
      } else {
        resolve(true);
      }
    });
  }),
  body("email").isEmail().withMessage("Enter a valid email"),
  body("email").notEmpty().withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters long"),
];

export default withValidation;
