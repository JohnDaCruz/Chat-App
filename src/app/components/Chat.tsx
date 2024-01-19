import React from "react";
import {ChatProps} from "../../../utils/data.types";
import {chatFriendPayload} from "../../../utils/data.types";
export default function Chat({friendChatPayload}:ChatProps) {
    return (
        <div className="text-white overflow-y-auto h-screen w-auto p-2 bg-[#404040] overflow-auto scrollbar-hide">
            {friendChatPayload.map((friend:chatFriendPayload, index:number) => (
                <div className="p-2 bg-[#26426B] w-fit m-2 rounded-2xl" key={index}>
                    <h1 className="font-extrabold">{friend.sender}</h1>
                    <div className="">{friend.message}</div>
                </div>
            ))}
        </div>
    );
}
