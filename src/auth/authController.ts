import prisma from "../../config/prisma";

import { sign } from "jsonwebtoken";
import { GENERAL_ERROR } from "../../src/constants";

import { Request, Response } from "express";
import { IRequest } from "../../src/interface";
import { cryptoDecode } from "../utils";


export async function getAuth(req: IRequest, res: Response) {
  try {
    const userId = req.userId;
    
    const response = await prisma.user.findFirstOrThrow({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
      }
    })
    console.log(response)
    res.status(200).send({ users: response });
  } catch (error: any) {
    res.status(400).send({ error: GENERAL_ERROR });
  }
}

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
    if (!user!.email || !user!.password) {
      throw new Error("Email o usuario inválido.");
    }

    //Decode the password
    const passDecode = await cryptoDecode(password, user?.password!);
    if (!passDecode) {
      throw new Error("Email o usuario inválido.");
    }

    // Implement Jwt Authentication
    const result = await sign({
      sub: {
        userId: user?.id
      },
    }, process.env.SECRET!, { expiresIn: '2h' });
    res.status(200).send({ token: result });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
}