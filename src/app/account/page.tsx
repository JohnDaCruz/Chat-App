'use client'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import io from "socket.io-client";
import React, { useEffect, useState } from "react";
import Loader from "@/app/components/Loader";
import Chat from "@/app/components/Chat";

import { LuSendHorizonal } from "react-icons/lu";
import { IconContext } from "react-icons";

import {chatFriendPayload} from "../../../utils/data.types";
import {white} from "next/dist/lib/picocolors";

export default function Account(){
    const {data:session} =  useSession();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState();

    const socket = io("https://server-socketio.onrender.com")

    const joinRoom = () => {
        if (room !== "") {
            socket.emit("join_room", room);
        }
    };

    const sendMessage = () => {
        socket.emit("send_message", { message, room });
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log("--RECEIVE--> ", data)
            const {message} = data
            setMessageReceived(message);
            console.log(messageReceived, typeof(messageReceived))
        });
    }, [session,socket, messageReceived]);

    const handlerSignOut = () => {
        setLoading(true);
        signOut().then(() => router.push('/'))
    }
    const friendChatPayload:chatFriendPayload[] = [
        {
            "name": "Jhon",
            "message": "Hello dude im Jhon"
        },
        {
            "name": "Peter",
            "message": "MESSAGE TEST PETER"
        },
        {
            "name": "Adam",
            "message": "MESSAGE TEST Adam"
        }
    ]

    if(session){
        return(
            <IconContext.Provider value={{color:"white", size:'26'}}>
                <Chat
                    friendChatPayload ={friendChatPayload}
                />
                <div className="fixed flex flex-row bottom-0 p-5 bg-[#171717] w-screen">
                    <form>
                        <textarea
                            placeholder="Digite uma mensagem..."
                            className="h-[60px] w-[900px] p-2 resize-none overflow-auto scrollbar-hide rounded-2xl"
                        />
                    </form>
                    <LuSendHorizonal className="place-self-center m-2"/>
                </div>
            </IconContext.Provider>
        )
    }
}