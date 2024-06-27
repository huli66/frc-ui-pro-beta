import Chat from "./Chat";
import React, { FC } from "react";
import useChatroomApi from "./useChatroomApi";
import { IChatroomProps } from "./types";

const ChatRoom: FC<IChatroomProps> = (props) => {
    const {permission, chatroomCode, chatroomName, axios, openNewWindow} = props;
    const chatroomApi = useChatroomApi(chatroomCode, axios);
    const {getLatestMessage} = chatroomApi;
    return (
        typeof getLatestMessage === 'function' ? <Chat chatroomName={chatroomName} openNewWindow={openNewWindow} chatroomCode={chatroomCode} permission={permission} chatroomApi={chatroomApi} /> : null
    )
}

export default ChatRoom;