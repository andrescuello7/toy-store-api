import { Product } from "@prisma/client";
import mercadopago from "mercadopago";

export const createOrder = async (product: Product) => {
    try {
        mercadopago.configure({
            access_token: process.env.MP_ACCESS_TOKEN!,
        });
        const result = await mercadopago.preferences.create({
            items: [
                {
                    id: product.id,
                    currency_id: "ARS",
                    title: product.title,
                    unit_price: product.price,
                    picture_url: product.image,
                    description: product.description,
                    quantity: 1,
                },
            ],
            notification_url: "https://toy-store-chi.vercel.app/home",
            back_urls: {
                success: "https://toy-store-chi.vercel.app/home"
            },
        });
        return result
    } catch (error) {
        console.log({ error });
    }
};