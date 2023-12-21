import {NextResponse} from "next/server";

import {User_id_message_name} from "../../../../../utils/data.types";
import {loginUser} from "../../../../../services/loginService";

export async function POST(req: Request, res: Response) {

    const user:User_id_message_name = await req.json();
    console.log("LOGIN CONTROLLER -> ", user)
    try {
        const loginUserCheck = await loginUser(user);

        if(loginUserCheck){
            console.log("Usuário logado com sucesso: ", loginUserCheck)
            return NextResponse.json(loginUserCheck)
        }else{
            console.log("Usuário ñ encontrado LOGIN_CONTROLLER");
            return null;
        }

    } catch (error) {
        console.error('Erro_>', error);
        return NextResponse.json(error)

    }
}