import {db} from '../utils/db.server'
export async function getUsers(){
    try{
        const getUsers = await db.user.findMany({});
        return getUsers;
    }catch (e) {
        console.log("Erro getUsers")
        return e
    }
}