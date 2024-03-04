import { Request, Response, NextFunction } from "express";

export default {
  isGuest(req: Request, res: Response, next: NextFunction) {
    const user = req.context;

    if (!user) {
      return next();
    }

    return res.status(403).json({ error: "Forbidden" });
  },

  isAuth(req: Request, res: Response, next: NextFunction) {
    const user = req.context;

    if (!user) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  },
};
