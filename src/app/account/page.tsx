'use client'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import io from "socket.io-client";
import React, {useEffect, useMemo, useState} from "react";
import Loader from "@/app/components/Loader";
import Chat from "@/app/components/Chat";

import { LuSendHorizonal } from "react-icons/lu";
import { MdMeetingRoom } from "react-icons/md";
import { IconContext } from "react-icons";

import {chatFriendPayload, ChatProps} from "../../../utils/data.types";

export default function Account(){
    const {data:session} =  useSession();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messageForChat, setMessageForChat] = useState<chatFriendPayload[]>([])

    const socket = useMemo(() => io("https://server-socketio.onrender.com"), []);
    const sessionUserName = session?.user?.email

    const messagesArray:Array<chatFriendPayload> = []


    useEffect(() => {
        const messagesArray: Array<chatFriendPayload> = [];

        const handleReceiveMessage = (data: chatFriendPayload) => {
            messagesArray.push(data);
            setMessageForChat([...messagesArray]);
        };

        socket.on("receive_message", handleReceiveMessage);

        return () => {
            socket.off("receive_message", handleReceiveMessage);
        };
    }, [socket]);
    const joinRoom = () => {
        if (room !== "") {
            socket.emit("join_room", room);
        }
    };

    const sendMessage = () => {
        socket.emit("send_message", {
            room:room,
            message: message,
            sender:sessionUserName});
    };

    const handlerSignOut = () => {
        setLoading(true);
        signOut().then(() => router.push('/'))
    }

    if(session){
        return(
            <IconContext.Provider value={{color:"white", size:'30'}}>
                <div className="flex flex-col h-screen">

                    <div className="flex flex-row bg-[#171717] justify-between p-2">
                        <div className="flex">
                            <input
                                value={room}
                                placeholder="Digite uma sala..."
                                className="h-[30px] w-[150px] ml-5 p-2 resize-none overflow-auto
                                scrollbar-hide rounded-2xl focus:outline-none
                                focus:ring-2 focus:ring-[#3B6CB8]"
                                onChange={(event) => {
                                    setRoom(event.target.value);
                                }}
                            />
                            <button onClick={joinRoom}>
                                <MdMeetingRoom className="ml-2"/>
                            </button>
                        </div>

                        {loading && <Loader/>}

                        <button className="text-white font-extrabold" onClick={handlerSignOut}>
                            Log out
                        </button>
                    </div>

                    <Chat friendChatPayload={messageForChat}/>

                    <form className="h-28 w-auto bg-[#171717] flex flex-row">
                        <textarea
                            value={message}
                            placeholder="Digite uma mensagem..."
                            className="h-[60px] w-[900px] ml-2 p-2 resize-none overflow-auto
                            scrollbar-hide rounded-2xl focus:outline-none
                            focus:ring-2 focus:ring-[#3B6CB8] self-center"
                            onChange={(event) => {
                                setMessage(event.target.value);
                            }}
                        />
                        <button type="button" onClick={sendMessage} className="self-center">
                            <LuSendHorizonal className="ml-2"/>
                        </button>
                    </form>

                </div>
            </IconContext.Provider>
        )
    }
}