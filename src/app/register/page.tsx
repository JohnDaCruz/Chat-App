'use client'
import {useState, useEffect} from "react";
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

export default function Register(){
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { data: session} = useSession();

    const handleRegister = () => {
        const res = fetch('http://localhost:3000/api/register_api')
    };

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

                    <label htmlFor="username" className="mb-2">Nome de usuário</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Digite um apelido..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="p-2 mb-4 border rounded"
                    />

                    <label htmlFor="password" className="mb-2">Senha</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Digite uma senha..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 mb-4 border rounded"
                    />

                    <button
                        type="submit"
                        onClick={handleRegister}
                        className="bg-green-500 text-white p-2 rounded cursor-pointer"
                    >
                        Registrar-se
                    </button>
                </form>
            </div>
        );
    }

}