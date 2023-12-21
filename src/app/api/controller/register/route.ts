import { createUser } from '../../../../../services/registerService';
import {NextResponse} from "next/server";

import {User} from "../../../../../utils/data.types";
import {User_id_message} from "../../../../../utils/data.types";

export async function POST(req: Request, res: Response) {
    try {
        const user:User_id_message = await req.json();

        console.log('OBJETO RECEBIDO NA ROTA REGISTER -> ', user)

        const createUserCheck = await createUser(user);

        console.log('OBJETO RETORNADO DE SERVICE REGISTER -> ', createUserCheck)

        if(createUserCheck){
            return NextResponse.json(createUserCheck)
        }else {
            return;
        }

    } catch (error) {
        console.error('Erro:', error);
        return NextResponse.json(error)

    }
}