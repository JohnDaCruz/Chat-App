import { db } from "../utils/db.server";

import {User} from "../utils/dataTypes";
import {User_id_message} from "../utils/dataTypes";

export async function createUser(user: User_id_message) {
    const { name, email, password }:User_id_message = user;
    console.log("SERVICE REGISTER CHECK -> ", user)

    // Verifica se o usuário já existe
    const usuarioExistente = await db.user.findUnique({
        where: {
            email:user.email // Corrigido para definir o campo de e-mail
        },
        select: {
            email: true,
        },
    });

    if (usuarioExistente) {
        console.log("Usuário já existe!!")
        return null;
    }

    // Cria um novo usuário
    const novoUsuario = await db.user.create({
        data: {
            email,
            name,
            password, // Salva a senha diretamente (sem hash)
        },
        select: {
            name: true,
            email: true,
        },
    });

    return novoUsuario;
}
