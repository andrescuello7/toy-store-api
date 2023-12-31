import { Request, Response } from "express";
import { GENERAL_ERROR } from "../constants";
import { IRequest } from "../interface";
import { OpenAI } from "../utils/openAI/index";


export async function postProduct(req: IRequest, res: Response) {
  const userId: string = req.userId!
  try {
    const productRq = {...req.body, userId }
    const product = await prisma.product.create({
      data: productRq
    });
    res.status(200).send({ product: product });
  } catch (error: any) {
    res.status(400).send({ error: "error POST" });
  };
};

export async function getDescriptionProduct(req: Request, res: Response) {
  const { title } = req.body;
  const message = `Brindame una descripción del producto ${title} que tenga como máximo 80 caracteres.`;
  try {
    const getProductDescription = await OpenAI(message);
    res.status(200).send({description: getProductDescription});
  } catch (error) {
    res.status(400).send({error: GENERAL_ERROR});
  };
};

export async function getAllProducts(req: Request,res: Response) {
  const { page = 1, perPage = 20 }: any = req.query
  try {
    const products = await prisma.product.findMany({
      skip: (page - 1 ) * perPage,
      take: perPage
    });
    res.status(200).send({products: products});
  } catch (error) {
    res.status(400).send({error: GENERAL_ERROR});
  };
};