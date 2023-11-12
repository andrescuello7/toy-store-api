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
        const result: { userId: string } = verify(token, process.env.SECRET!) as { userId: string };
        req.userId = result.userId;
        next()
    } catch (error) {
        res.status(401).send("Error authenticating")
    }
}