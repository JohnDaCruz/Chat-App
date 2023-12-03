'use client'
import GoogleButton from 'react-google-button'
import { useSession, signIn, signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function Home() {
    const { data: session } = useSession();

    if (session) {
        return (
            redirect('/account')
        )
    }
    else {
        return (

           <>
               <button onClick={() => signIn('google') }>
                   SignIn
               </button>
           </>
        );

    }
}