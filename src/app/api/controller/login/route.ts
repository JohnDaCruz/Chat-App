import { NextResponse } from 'next/server';

import { User_id_message_name } from '../../../../../utils/data.types';
import { loginUser } from '../../../../../services/loginService';

export async function POST(req: Request, res: Response) {
    try {
        const user: User_id_message_name = await req.json();
        console.log('LOGIN CONTROLLER -> ', user);

        const loginUserCheck = await loginUser(user);

        if (loginUserCheck) {
            console.log('Usuário logado com sucesso: ', loginUserCheck);
            return NextResponse.json(loginUserCheck);
        } else {
            console.log('Usuário não encontrado LOGIN_CONTROLLER');
            // Retorne uma resposta de status 401 (Unauthorized)
            return NextResponse.json({ message: 'Usuário não encontrado' }, {status:401});
        }
    } catch (error) {
        console.error('Erro_>', error);
        // Retorne uma resposta de status 500 (Internal Server Error)
        return NextResponse.json({ error: 'Erro ao realizar login' },{status:500});
    }
}
