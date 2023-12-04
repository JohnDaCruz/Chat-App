'use client'
import {useState, useEffect} from "react";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

export default function Register(){
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [senha, setSenha] = useState<string>('');

    const { data: session} = useSession();

    async function handleRegister(email:string, name:string, senha:string){
        const res = await fetch('http://localhost:3000/api/register_Controller',{
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
                email:email,
                name:name,
                senha:senha
            })
        })
        const data = await res.json();
        console.log('Data ->', data)
    }

    if(session){
        return redirect('/account')
    }else{
        return(
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Registrar-se</h1>
                <form className="flex flex-col">
                    <label htmlFor="email" className="mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Digite seu email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 mb-4 border rounded"
                    />

                    <label htmlFor="name" className="mb-2">Nome de usuário</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Digite um apelido..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 mb-4 border rounded"
                    />

                    <label htmlFor="senha" className="mb-2">Senha</label>
                    <input
                        type="senha"
                        id="senha"
                        placeholder="Digite uma senha..."
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="p-2 mb-4 border rounded"
                    />

                    <button
                        type="submit"
                        onClick={()=> handleRegister}
                        className="bg-green-500 text-white p-2 rounded cursor-pointer"
                    >
                        Registrar-se
                    </button>
                </form>
            </div>
        );
    }

}