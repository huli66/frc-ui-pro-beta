import Chat from "./Chat";
import React from "react";
import useChatroomApi from "./useChatroomApi";
import { IChatroomProps } from "./types";

const ChatRoom = ({permission, chatroomCode, axios, openNewWindow}: IChatroomProps) => {
    const chatroomApi = useChatroomApi(chatroomCode, axios);
    const {getLatestMessage} = chatroomApi;
    return (
        typeof getLatestMessage === 'function' ? <Chat openNewWindow={openNewWindow} chatroomCode={chatroomCode} permission={permission} chatroomApi={chatroomApi} /> : null
    )
}

export default ChatRoom;
