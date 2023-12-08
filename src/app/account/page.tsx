'use client'
import { useSession, signOut } from 'next-auth/react'
import {redirect} from "next/navigation";
import {authOptions} from "../../../utils/authOption";


export default function Account(){
   const {data:session} =  useSession();

    const handlerSignOut = () =>{
        signOut();
    }

    if(session){
        return(
            <div>
                <h3>Welcome, {session.user?.email}</h3>
                <button type={"button"} onClick={()=> handlerSignOut()}> lOGOUT </button>
            </div>
        )
    }else{
        redirect('/')
    }
}