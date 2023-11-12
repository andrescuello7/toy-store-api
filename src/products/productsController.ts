// import prisma from "../../config/prisma";

import { OpenAI } from "../../utils/openAI/index";
import { Request, Response } from "express";

export async function postProducts(req: Request, res: Response) {
  const { description } = req.body;
  try {
    const descriptionProduct = await OpenAI(description);
    res.status(200).send({ products: descriptionProduct });
  } catch (error: any) {
    res.status(400).send({ error: "error POST" });
  }
}