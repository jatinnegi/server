import { Request, Response } from "express";
import { IBodyRequest } from "@/contracts/request";
import { LoginPayload, RegisterPayload, UpdatePayload } from "@/contracts/user";
import { generateAuthToken, wait } from "@/utils";
import asyncHandler from "express-async-handler";
import UserModel from "@/models/User.model";

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const id = req.context;

  if (!id) {
    throw new Error("No user ID found");
  }

  const user = await UserModel.findById(id);

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

    await wait(3500);

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

export const update = asyncHandler(
  async (req: IBodyRequest<UpdatePayload>, res: Response) => {
    const id = req.context;
    const { countryCode, phoneNumber, city, state, address, zipCode } =
      req.body;

    const user = await UserModel.findById(id);

    if (!user) {
      throw new Error("No user found");
    }

    user.countryCode = countryCode || user.countryCode;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.city = city || user.city;
    user.state = state || user.state;
    user.address = address || user.address;
    user.zipCode = zipCode || user.zipCode;

    await user.save();

    await wait(3500);

    res.status(200).json(user);
  }
);

export const logout = asyncHandler((req: Request, res: Response) => {
  res.cookie("jwt", "", { expires: new Date(0) });
  res.status(200).json({ message: "User logged out" });
});
