import {db} from "../utils/db.server";

export async function listUsers(){
    try{
        const userLogin = await db.user.findMany()
        if(userLogin){
            return userLogin;
        }else{
            return null
        }
    }catch (e) {
        console.log("--ERROR SERVICE-- ", e)
        return null
    }
}