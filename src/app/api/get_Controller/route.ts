import {NextResponse} from "next/server";
import {getUsers} from "../../../../services/getUsers.service";

export async function GET(req: Request, res: Response) {
    try {
        const getUsersCheck = await getUsers();

        if(getUsersCheck){
            return NextResponse.json(getUsersCheck)
        }else{
            console.log("Sem registro de usuários getUsers_CONTROLLER");
            return null;
        }
    } catch (error) {
        console.error('Erro_>', error);
        return NextResponse.json(error)

    }
}