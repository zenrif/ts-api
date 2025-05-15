import { UserTokenType } from "../types/user.type";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IEmailPassword, IUsernamePassword } from "../types/user.type";
import AppError from "../errors/AppError";

export const loginUser : {
    (payload: IEmailPassword) : Promise<UserTokenType>;
    (payload: IUsernamePassword) : Promise<UserTokenType>;
} = async (
    payload: IEmailPassword | IUsernamePassword
) : Promise<UserTokenType> => {
    let user;

    if("email" in payload) {
        user = await prisma.users.findUnique({where : { email: payload.email }});
    } else if ("username" in payload) {
        user = await prisma.users.findUnique({where : { username: payload.username }});
    }

    // const user = await prisma.users.findUnique({where : { email }});
    if (!user) {
        throw new Error("User not found");
    }

    const isPasswordValid = await bcrypt.compare(payload.password, user.password);
    if (!isPasswordValid) {
        throw new AppError("Invalid password", 401);
    }

    const token = jwt.sign({id: user.id, email: user.email}, "secret", {
        expiresIn: "1h",
    });

    return {
        ...user,
        token,
    };
}