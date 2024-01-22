import { createUser } from '../../../../../services/registerService';
import {NextResponse} from "next/server";

import {User} from "../../../../../utils/data.types";
import {User_id_message} from "../../../../../utils/data.types";

export async function POST(req: Request, res: Response) {
    try {
        const user:User_id_message = await req.json();

        const createUserCheck = await createUser(user);
        if(createUserCheck != null){
            return NextResponse.json(createUserCheck,{status:201})
        }else {
            return NextResponse.json(null,{status:400});
        }
    } catch (error) {
        console.error('Erro:', error);
        return NextResponse.json(null,{status:500})

    }
}