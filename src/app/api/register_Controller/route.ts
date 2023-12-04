import { createUser } from '../../../../services/register.service';
import {NextResponse} from "next/server";
import {User} from '../../../../services/register.service'

export async function POST(req: Request, res: Response) {
    try {
        const user:User = await req.json();
        console.log('POST->',user);
        await createUser(user);

        return NextResponse.json({
            "Usuário cadastrado com sucesso":{
                email:user.email,
                name: user.name
            }
        })
    } catch (error) {
        console.error('Erro:', error);
        return NextResponse.json(error)

    }
}
