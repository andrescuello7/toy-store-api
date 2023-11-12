import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { IRequest } from "src/interface";
import prisma from "../../config/prisma";
import { GENERAL_ERROR } from "../constants";
import { cryptoEncode, isExistingUser } from "../utils";

export async function getUser(req: Request, res: Response) {
  try {
    const response = await prisma.user.findFirstOrThrow({
      where: { email: req.body.email }
    })
    res.status(200).send({ users: response });
  } catch (error: any) {
    res.status(400).send({ error: GENERAL_ERROR });
  }
}

export async function postUsers(req: IRequest, res: Response) {

  const { password: pwd } = req.body
  try {
    if (await isExistingUser(req.body.email)) {
      throw new Error(GENERAL_ERROR);
    }

    const hashPwd = await cryptoEncode(pwd);

    const bodyWithHashPwd = {...req.body, password: hashPwd}

    const user = await prisma.user.create({
      data: bodyWithHashPwd,
    });

    const resultJwt = await sign({
      sub: {
        userId: user?.id
      },
    }, process.env?.SECRET!, {expiresIn: "3600"});

    const filteredUser = await prisma.user.findFirstOrThrow({
      select: {
        email: true,
        fullName: true,
        createdAt: true,
      }
    })

    const createdUser = {...filteredUser, token: resultJwt}

    res.status(200).send({ user: createdUser });
  } catch (error: any) {
    res.status(400).send({ error: error.message ? error.message : GENERAL_ERROR });
  }
}
export async function putUsers(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const response = await prisma.user.update({
      where: { id },
      data: req.body,
    });
    res.status(200).send({ users: response });
  } catch (error: any) {
    res.status(400).send({ error: GENERAL_ERROR });
  }
}

export async function deleteUsers(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const response = await prisma.user.delete({
      where: { id },
    });
    res.status(200).send({ users: response });
  } catch (error: any) {
    res.status(400).send({ error: GENERAL_ERROR });
  }
}
