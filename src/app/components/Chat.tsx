import React from "react";
import {ChatProps} from "../../../utils/data.types";
export default function Chat({friendChatPayload}:ChatProps) {
    return (
        <div className="bg bg-[#657176] overflow-y-auto h-screen text-white">
        {friendChatPayload.map((friend:any, index:any) => (
                <div className="flex h-[100px] items-center p-2" key={index}>
                    <p className="font-extrabold mr-0">{friend.name}: </p>
                    {friend.message}
                </div>
            ))}
        </div>
    );
}
