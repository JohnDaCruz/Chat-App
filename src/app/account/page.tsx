'use client'
import { useSession, signOut } from 'next-auth/react'
import {redirect} from "next/navigation";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("https://server-socketio.onrender.com")

export default function Account(){
    const {data:session} =  useSession();

    //Room State
    const [room, setRoom] = useState("");

    // Messages States
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");

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
        });
    }, []);

    const handlerSignOut = () => {
        signOut();
    }

    if(session){
        return(
            <div>
                <h3>Welcome, {session.user?.email}</h3>
                <button type={"button"} onClick={() => handlerSignOut()}> lOGOUT</button>
                <div className="flex items-center space-x-4">
                    <input
                        className="border p-2 rounded placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        type="text"
                        placeholder="Room Number..."
                        onChange={(event) => {
                            setRoom(event.target.value);
                        }}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-600"
                        onClick={joinRoom}
                    >
                        Join Room
                    </button>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                    <input
                        className="border p-2 rounded placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        type="text"
                        placeholder="Message..."
                        onChange={(event) => {
                            setMessage(event.target.value);
                        }}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded focus:outline-none hover:bg-blue-600"
                        onClick={sendMessage}
                    >
                        Send Message
                    </button>
                </div>
                <h1 className="text-2xl font-bold mt-4">Message:</h1>
                <p className="mt-2">{messageReceived}</p>
            </div>
        )
    } else {
        redirect('/')
    }
}