import { Request, Response, NextFunction } from "express";
import { getAccessTokenFromHeaders, jwtVerify } from "@/utils";
import UserModel from "@/models/User.model";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.context = null;

    const accessToken = getAccessTokenFromHeaders(req.headers);
    if (!accessToken) {
      return next();
    }

    const { id } = jwtVerify(accessToken);

    if (!id) {
      return next();
    }

    const user = await UserModel.findById(id);

    if (!user) {
      return next();
    }

    req.context = {
      user,
      accessToken,
    };

    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error);
  return res.status(500).send("Something went wrong!");
};
