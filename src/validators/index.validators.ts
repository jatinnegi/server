import { Request, Response, NextFunction } from "express";
import { body, validationResult, ValidationChain } from "express-validator";
import { cleanErrors } from "@/utils";

const withValidation =
  (validations: ValidationChain[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    await Promise.all(
      validations.map((validation: ValidationChain) => validation.run(req))
    );

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const cleanedErrors = cleanErrors(errors.array());
      return res.status(400).json(cleanedErrors);
    }

    next();
  };

export const UserRegisterValidation = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Enter a valid email"),
  body("email").notEmpty().withMessage("Email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters long"),
];

export default withValidation;
