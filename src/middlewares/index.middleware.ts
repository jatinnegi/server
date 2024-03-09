import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "@/utils";
import UserModel from "@/models/User.model";
import asyncHandler from "express-async-handler";
import { isDevelopment } from "@/config";

export const authMiddleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    try {
      if (token) {
        const { id } = jwtVerify(token);
        if (!id) {
          next();
        } else {
          const user = await UserModel.findById(id);
          req.context = user;
          next();
        }
      } else {
        next();
      }
    } catch (err) {
      console.error(err);
      res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
      next();
    }
  }
);

export const notFoundMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const error = err.message;

  res.status(statusCode).json({
    error,
    stack: isDevelopment ? err.stack : null,
  });
};
