'use client'
import GoogleButton from 'react-google-button'
import { useSession, signIn, signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import React, {useState} from "react";

import {User} from "../../services/login.service";

export default function Home() {
    const [email, setEmail] = useState<string>('');
    const [password, setpassword] = useState<string>('');

    const user = {email, password}

    const { data: session } = useSession();

    async function handlerSignOut (e:React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        try{
            const res = await fetch('http://localhost:3000/api/register_Controller',{
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({user})
            })
            const data = await res.json();
            console.log('Data ->', data)

            redirect('/account')

        }catch (e) {
            console.log("Erro ao logar --> ", e)
        }

    }

    if (session) {
        return (
            redirect('/account')
        )
    }
    else {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Welcome</h1>
                <form className="flex flex-col" >
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Digite seu email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                    />

                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">password</label>
                    <input
                        autoComplete="current-password"
                        type="password"
                        name="password"
                        placeholder="Digite uma password.."
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md"
                    />
                    <button
                        onClick={(e)=> handlerSignOut}
                        type="submit"
                        className="bg-blue-500 text-white px-2 py-2 mb-2 rounded-md mx-auto block w-3/4 sm:w-1/2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Sign In
                    </button>

                </form>

                <button
                    onClick={() => signIn('google') }
                    className="bg-blue-500 text-white px-2 py-2 mb-2 rounded-md mx-auto block w-3/4 sm:w-1/2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                >
                    SIGN-IN WITH GOOGLE
                </button>
            </div>
        );

    }
}