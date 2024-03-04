import { Response, NextFunction } from "express";
import { IBodyRequest } from "@/contracts/request";
import { RegisterPayload } from "@/contracts/user";
import UserModel from "@/models/User.model";

const userController = {
  async register(
    req: IBodyRequest<RegisterPayload>,
    res: Response,
    next: NextFunction
  ) {
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

      const token = user.generateAuthToken();

      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
