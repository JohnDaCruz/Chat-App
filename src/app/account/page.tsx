'use client'
import { useSession, signOut } from 'next-auth/react'
import {redirect} from "next/navigation";
import Cookies from 'js-cookie';

export default function Account(){
    const { data: session } = useSession();
    const handlerSignOut = () =>{

        signOut();
    }

    if(session){
        return(
            <>
                <p>
                    Bem vindo, {session?.user?.email}
                </p>
                <button type={"button"} onClick={()=> handlerSignOut()}> lOGOUT </button>
            </>
        );
    }else{
        return redirect('/')
    }

}