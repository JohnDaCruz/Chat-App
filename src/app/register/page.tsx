'use client'
import React, {useState, SyntheticEvent} from "react";
import {signIn, useSession} from "next-auth/react";
import {redirect} from "next/navigation";

import {User, User_id_message} from "../../../utils/data.types";
import Loader from "@/app/components/Loader";
import {router} from "next/client";

export default function Register(){
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorRegister, setErrorRegister] = useState(false);
    const [successRegister, setSuccessRegister] = useState(false);
    const [loading, setLoading] = useState(false);
    const URL_SITE = process.env.URL_SITE

    let userRegister = {
        email: email,
        name:name,
        password:password
    }

    const { data: session} = useSession();

    async function handleRegister(e:SyntheticEvent){
        setLoading(true);

        if(userRegister.name == '' || userRegister.email == '' || userRegister.password == ''){
            setErrorRegister(true);
            setLoading(false)
            //e.preventDefault()
        }

        fetch(`${URL_SITE}/api/controller/register`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(userRegister)
        })
            .then((resp) => resp.json())
            .then((data) => {
                setLoading(false);
                if(data == null){
                    setErrorRegister(true);
                }

                setErrorRegister(false);
                setSuccessRegister(true);
                return router.push('/')
            })
            .catch((error) => {
                setErrorRegister(true);
                console.log("Error _> ", error)
            });
    }

    if(session){
        return redirect('/account')
    }else{
        return (
            <div className="flex items-center justify-center h-screen bg-[#404040]">
                <div className="flex flex-col p-5 bg-[#242521] w-[500px] rounded-2xl">
                    <form onSubmit={handleRegister}>
                        {loading && <Loader/>}
                        <label htmlFor="email" className="block text-lg font-medium text-white">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Digite seu email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete={"email"}
                            className="mt-1 mb-5 p-2 w-full border rounded-md"
                            disabled={loading}
                        />

                        <label htmlFor="name" className="block text-lg font-medium text-white">Nome</label>
                        <input
                            type="name"
                            name="name"
                            placeholder="Digite um nome de usuário..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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

                        {errorRegister && <p className={"text-red-600 mb-2"}>Erro ao registrar usuário</p>}
                        {successRegister && <p className={"text-green-500 mb-2"}>Usuário criado com sucesso</p>}

                        <button
                            disabled={loading}
                            type="submit"
                            className="bg-[#5D6DFF] text-white p-2 mt-2 rounded-md mx-auto block w-3/4 sm:w-1/2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                        >
                            Registrar
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}