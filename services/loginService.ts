import {db} from "../utils/db.server";
import bcrypt from 'bcrypt'

import {User, User_id_message_name} from "../utils/data.types";

export async function loginUser(user:User_id_message_name){
    const {email}:User_id_message_name = user
    try{
        const userLogin = await db.user.findUnique({
            where:{
                email,
            },select:{
                email:true,
                password:true
            }
        })
        if(userLogin){
            return userLogin;
        }else{
            return null
        }
    }catch (e) {
        console.log("Error -> ", e)
        return null
    }
}