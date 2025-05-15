import { loginUser } from "../services/auth.service"
import { NextFunction, Request, Response } from "express";
import { createResponse } from "../utils/response.util";


export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userToken = await loginUser(req.body);

        const { password, ...safeUser } = userToken;
        res.status(200).send(createResponse(true, "Login successful", safeUser));
    } catch (error) {
        next(error);
    }
}