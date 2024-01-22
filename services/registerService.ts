import { db } from "../utils/db.server";

import {User} from "../utils/data.types";
import {User_id_message} from "../utils/data.types";

export async function createUser(user: User_id_message) {
    const { name, email, password }:User_id_message = user;
    console.log("SERVICE REGISTER CHECK -> ", user)
    const findUser = await db.user.findUnique({
        where: {
            email:user.email
        },
        select: {
            email: true,
        },
    });

    if (findUser) {
        console.log("Usuário já existe!!")
        return null;
    }

    const newUser = await db.user.create({
        data: {
            email,
            name,
            password,
        },
        select: {
            name: true,
            email: true,
        },
    });
    return newUser;
}
