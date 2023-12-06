import {db} from "../utils/db.server";
import bcrypt from 'bcrypt'

import {User} from "../utils/dataTypes";

export async function loginUser(user:User){
    const {email,password} = user
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