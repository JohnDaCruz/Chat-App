'use client'
import { useSession, signOut } from 'next-auth/react'
import {redirect} from "next/navigation";
import {authOptions} from "../../../utils/authOption";

export default function Account(){
   // const {data:session} = await useSession();

    const handlerSignOut = () =>{
        //console.log(cookieCutter.set('next-auth.session-token', undefined, { expires: new Date(0) }));
        //console.log(cookieCutter.set('next-auth.csrf-token', undefined, { expires: new Date(0) }));

        signOut();
    }

        return(
            <>
                <p>
                    {/*welcome,{session?.user?.email}*/}
                </p>
                <button type={"button"} onClick={()=> handlerSignOut()}> lOGOUT </button>
            </>
        )

}