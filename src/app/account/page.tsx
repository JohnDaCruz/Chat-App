'use client'
import { useSession, signOut } from 'next-auth/react'
import {redirect} from "next/navigation";
// @ts-ignore
import cookieCutter from 'cookie-cutter';

export default function Account(){
    const { data: session } = useSession();
    const handlerSignOut = () =>{
        //console.log(cookieCutter.set('next-auth.session-token', undefined, { expires: new Date(0) }));
        //console.log(cookieCutter.set('next-auth.csrf-token', undefined, { expires: new Date(0) }));

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