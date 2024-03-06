import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

export const isGuest = asyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    const user = req.context;

    if (!user) {
      next();
    } else {
      res.status(403);
      throw new Error("Forbidden");
    }
  }
);

export const isAuth = asyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    const user = req.context;

    if (user) {
      next();
    } else {
      res.status(403);
      throw new Error("Forbidden");
    }
  }
);
