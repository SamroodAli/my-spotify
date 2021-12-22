import { NextApiResponse, NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import prisma from "./prisma";
import { User } from "@prisma/client";

export const validateRoute = (
  handler: (req: NextApiRequest, res: NextApiResponse, user?: User) => void
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.TRAX_ACCESS_TOKEN;
    if (token) {
      let user: User | null;
      try {
        const { id } = jwt.verify(token, "hello");
        user = await prisma.user.findUnique({
          where: { id },
        });
      } catch (error) {
        return res.status(401).json({ error: "Not Authorized" });
      }
      return handler(req, res, user);
    }
    res.status(401).json({ error: "Not Authorized" });
  };
};