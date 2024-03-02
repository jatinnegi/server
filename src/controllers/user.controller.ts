import { Request, Response, NextFunction } from "express";
import UserModel from "@/models/User.model";

const userController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const userExists = await UserModel.findOne({ email });

      if (userExists) {
        return res.status(400).json({ email: "This email is already taken." });
      }

      const user = await UserModel.create({
        firstName,
        lastName,
        email,
        password,
      });

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
