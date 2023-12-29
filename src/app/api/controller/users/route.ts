import { NextResponse } from 'next/server';

import {listUsers} from "../../../../../services/usersService";

export async function GET() {
    const listUsersCheck = await listUsers();
    try {
        return NextResponse.json(listUsersCheck)
    } catch (error) {
        console.error("Erro -> ", error);
        return NextResponse.json({ error: "Erro ao listar usuários" },{status:500});
    }
}
