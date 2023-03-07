import config from "config/config";
import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "./authenticated-request";

export function authenticateTokenMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, config.JWT_SECRET, (err: any, user: { id: string; email: string }) => {
    console.log(err);

    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}
