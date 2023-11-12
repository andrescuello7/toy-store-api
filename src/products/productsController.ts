import { Request, Response } from "express";
import { GENERAL_ERROR } from "../constants";
import { OpenAI } from "../utils/openAI/index";

export async function postProducts(req: Request, res: Response) {
  const { description } = req.body;
  try {
    const descriptionProduct = await OpenAI(description);
    res.status(200).send({ products: descriptionProduct });
  } catch (error: any) {
    res.status(400).send({ error: "error POST" });
  };
};

export async function getDescriptionProduct(req: Request, res: Response) {
  const { title } = req.body;
  const message = `Brindame una descripción del producto ${title} que tenga como máximo 80 caracteres.`;
  try {
    const getProductDescription = await OpenAI(message);
    console.log(getProductDescription);
    res.status(200).send({description: getProductDescription});
  } catch (error) {
    res.status(400).send({error: GENERAL_ERROR});
  };
};