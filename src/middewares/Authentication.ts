import { Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { IRequest } from "src/interface";

export const auth = async (req: IRequest, res: Response, next: NextFunction) => {
    const authorization = req.header("Authorization");
    if (!authorization) {
        return res.status(400).send("Error Token is required")
    }
    try {
        const token = authorization.replace("Bearer ", "");
        const { sub }: any = await verify(token, process.env.SECRET!);
        req.userId = sub.userId;
        next()
    } catch (error) {
        console.log(error);
        res.status(401).send("Error authenticating")
    }
}