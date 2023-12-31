import { Request, Response } from "express";
import { GENERAL_ERROR } from "../../src/constants";
import { createOrder } from "../../src/utils/mercadoPago";

export async function postPayments(req: Request, res: Response) {
  const product = req.body;
  try {
    
    const payment = await createOrder(product);
    res.status(200).send({ payments: payment!.response.init_point });
  } catch (error: any) {
    res.status(400).send({ error: GENERAL_ERROR });
  }
}