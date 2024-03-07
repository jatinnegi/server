import { Request, Response, NextFunction } from "express";
import { IBodyRequest } from "@/contracts/request";
import { LoginPayload, RegisterPayload } from "@/contracts/user";
import asyncHandler from "express-async-handler";
import UserModel from "@/models/User.model";
import { generateAuthToken } from "@/utils";

export const getUser = asyncHandler((req: Request, res: Response) => {
  const user = req.context;

  if (!user) {
    throw new Error("No user found");
  }

  res.status(200).json(user);
});

export const login = asyncHandler(
  async (req: IBodyRequest<LoginPayload>, res: Response) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user || !user.comparePassword(password)) {
      res.status(404);
      throw new Error("Invalid credentials");
    }

    generateAuthToken(user._id.toString(), res);

    res.status(200).json(user);
  }
);

export const register = asyncHandler(
  async (req: IBodyRequest<RegisterPayload>, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
    });

    generateAuthToken(user._id.toString(), res);

    res.status(201).json(user);
  }
);

export const logout = asyncHandler((req: Request, res: Response) => {
  res.cookie("jwt", "", { expires: new Date(0) });
  res.status(200).json({ message: "User logged out" });
});
