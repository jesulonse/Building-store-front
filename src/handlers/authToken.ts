import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authToken = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  try {
    const authorizationHeader = req.headers.authorization!;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch (err) {
    res.status(401);
    res.json("Access denied, invalid token");
    return;
  }
};
