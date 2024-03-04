import { Request, Response, NextFunction } from "express";
import { IBodyRequest } from "@/contracts/request";
import { LoginPayload, RegisterPayload } from "@/contracts/user";
import UserModel from "@/models/User.model";

const userController = {
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { user } = req.context;
      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
  async login(
    req: IBodyRequest<LoginPayload>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const match = user.comparePassword(password);

      if (!match) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const token = user.generateAuthToken();

      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  },

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
