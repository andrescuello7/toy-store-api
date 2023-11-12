import { Request, Response } from "express";
import { IRequest } from "src/interface";
import prisma from "../../config/prisma";
import { GENERAL_ERROR } from "../constants";
import { cryptoEncode, isExistingUser } from "../utils";
import { sign } from "jsonwebtoken";

export async function getUser(req: Request, res: Response) {
  try {
    const response = await prisma.user.findFirstOrThrow({
      where: {email: req.body}
    })
    res.status(200).send({ users: response });
    console.log(response)
  } catch (error: any) {
    res.status(400).send({ error: GENERAL_ERROR });
  }
}

export async function postUsers(req: IRequest, res: Response) {
  try {
    if (await isExistingUser(req.body.email)) {
      throw new Error(GENERAL_ERROR);
    }
    req.body.password = await cryptoEncode(req.body.password);
    const user = await prisma.user.create({
      data: req.body,
    });
    // Implement Jwt Authentication
    const result = await sign({
      sub: {
        userId: user?.id
      },
    }, process.env.SECRET!, { expiresIn: '3600' });
    
    res.status(200).send({ token: result });
  } catch (error: any) {
    console.log(error)
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
