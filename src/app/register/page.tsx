'use client'
import React, {useState, SyntheticEvent} from "react";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

import {User, User_id_message} from "../../../utils/data.types";

export default function Register(){
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const URL_SITE = "http://localhost:3000" || process.env.URL_SITE

   let userRegister = {
       email: email,
       name:name,
       password:password
   }

    const { data: session} = useSession();

    async function handleRegister(e:SyntheticEvent){
        e.preventDefault()
        fetch(`${URL_SITE}/api/controller/register`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(userRegister)
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log('RETORNO NA REGISTER PAGE --> ',data);
                return redirect('/')
            })
            .catch((error) => console.log( error ));
    }

    if(session){
        return redirect('/account')
    }else{
        return(
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Registrar-se</h1>
                <form className="flex flex-col" onSubmit={handleRegister}>
                    <label htmlFor="email" className="mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Digite seu email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 mb-4 border rounded"
                    />

                    <label htmlFor="name" className="mb-2">Nome de usuário</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Digite um apelido..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 mb-4 border rounded"
                    />

                    <label htmlFor="password" className="mb-2">password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Digite uma password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 mb-4 border rounded"
                    />

                    <button
                        type="submit"
                        className="bg-green-500 text-white p-2 rounded cursor-pointer"
                    >
                        Registrar-se
                    </button>
                </form>
            </div>
        );
    }
}