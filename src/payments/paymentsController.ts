import { createOrder } from "../../src/utils/mercadoPago";
import { Request, Response } from "express";

export async function postPayments(req: Request, res: Response) {
  const product = req.body;
  try {
    const payment = await createOrder(product);
    res.status(200).send({ payments: payment!.response.init_point });
  } catch (error: any) {
    console.log({ error });

    res.status(400).send({ error: "error POST" });
  }
}