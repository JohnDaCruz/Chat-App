import { NextResponse } from 'next/server';

import { User_id_message_name } from '../../../../../utils/data.types';
import { loginUser } from '../../../../../services/loginService';

export async function POST(req: Request) {
    const user: User_id_message_name = await req.json();
    const loginUserCheck = await loginUser(user);
    try {
        if (loginUserCheck) {
            console.log("--LOGIN USER CHECKED--")
            return NextResponse.json(loginUserCheck);
        } else {
            console.log("--LOGIN USER NO CHECKED-- ", null)
            return NextResponse.json(null,{status:401});
        }
    } catch (error) {
        console.error("Erro -> ", error);
        return NextResponse.json({ error: "Erro ao realizar login" },{status:500});
    }
}
