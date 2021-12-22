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
        const { id } = jwt.verify(token, "jwtSecretKey");
        user = await prisma.user.findUnique({
          where: { id },
        });
      } catch (error) {
        return res.status(401).json({ error: error.message });
      }
      return handler(req, res, user);
    }
    res.status(401).json({ error: "Not Authorized" });
  };
};

export const validateToken = (token) => {
  const user = jwt.verify(token, "jwtSecretKey");
  return user;
};
