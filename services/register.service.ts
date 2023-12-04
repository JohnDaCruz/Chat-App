import {db} from "../utils/db.server";
import bcrypt from 'bcrypt'

export type User = {
    id:number,
    email:string,
    name:string,
    senha:string
    message: Array<string>
}
export async function createUser(user:User){
    const {name,email,senha} = user
    const check_user_exist = await db.user.findUnique({
        where:{email},
        select:{name:true}
    })

    if(!check_user_exist){
        return db.user.create({
            data:{
                email,
                name,
                senha
            },
            select:{
                name:true,
                email:true
            }
        })
    }else{
        return 'Usuário já existe';
    }
}