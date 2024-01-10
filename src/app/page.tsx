'use client'
import {useSession, signIn} from 'next-auth/react'
import React, {SyntheticEvent, useState, useEffect} from "react";
import {useRouter} from 'next/navigation'
import Loader from "@/app/components/Loader";

export default function Home() {
    const [errorSignin, setErrorSignin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');


    const {data: session} = useSession();
    const router = useRouter();

    async function handleSubmit(e: SyntheticEvent) {
        e.preventDefault()
        setLoading(true);
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false
        })
        console.log("--HANDLE SUBMIT-- ", result)
        setErrorSignin(true);
        if(result?.error == 'CredentialsSignin'){
            setLoading(false)
            setEmail('');
            setPassword('');
            return router.refresh();
        }
    }

    useEffect(() => {
        if (session) {
            router.push('/account');
        }
    }, [session, router]);
    if(!session){
        return (
            <div className="flex items-center justify-center h-screen bg-[#404040]">
                <div className="flex flex-col p-5 bg-[#242521] w-[500px] rounded-2xl">
                    <form onSubmit={handleSubmit}>
                        {loading && <Loader/>}
                        <label htmlFor="email" className="block text-lg font-medium text-white">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Digite seu email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete={"username"}
                            className="mt-1 mb-5 p-2 w-full border rounded-md"
                            disabled={loading}
                        />

                        <label htmlFor="password" className="block text-lg font-medium text-white">Senha</label>
                        <input
                            autoComplete="current-password"
                            type="password"
                            name="password"
                            placeholder="Digite uma password.."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md"
                            disabled={loading}
                        />
                        {errorSignin && <p className={"text-red-600 mb-2"}>Email e(ou) senha incorretos</p>}

                        <button
                            disabled={loading}
                            type="submit"
                            className="bg-[#5D6DFF] text-white p-2 mt-2 rounded-md mx-auto block w-3/4 sm:w-1/2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            Login
                        </button>
                    </form>

                    <button
                        disabled={loading}
                        onClick={() => signIn('google')}
                        className="bg-[#5D6DFF] text-white p-2 mt-2 rounded-md mx-auto block w-3/4 sm:w-1/2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Signin with Google
                    </button>

                </div>
            </div>

        );
    }
}