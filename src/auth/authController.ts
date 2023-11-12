import prisma from "../../config/prisma";

import { Request, Response } from "express";
import { cryptoDecode } from "../../utils/crypto/hash";

import { sign } from "jsonwebtoken";

export async function postAuth(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("Invalid Request");
    }

    //Find the user
    const user = await prisma.user.findFirst({
      where: { email: email }
    })
    if (!email || !password) {
      throw new Error("Email invalid");
    }

    //Decode the password
    const passDecode = await cryptoDecode(password, user?.password!);
    if (!passDecode) {
      throw new Error("Password incorrect");
    }

    // Implement Jwt Authentication
    const result = await sign({
      sub: {
        userId: user?.id
      },
    }, process.env.SECRET!, { expiresIn: '3600' });
    res.status(200).send({ auth: result });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
}