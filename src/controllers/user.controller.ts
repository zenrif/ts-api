import { Request, Response, NextFunction } from "express";
import { createUser, getAllUsers, findUser } from "../services/user.service";
// import * as userService from "../services/user.service";
import prisma from "../prisma/client";

export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await prisma.users.findMany();
        res.status(200).send(users);
    } catch (error) {
        next(error);
    }
};

export const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const newUser = await createUser(req.body);
        // res.status(201).json(newUser);

        const { password, id, ...safeData } = newUser
        res.status(201).send(safeData);

    } catch (error) {
        next(error);
    }
};

export const getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await findUser({ email: req.params.email });
        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
}