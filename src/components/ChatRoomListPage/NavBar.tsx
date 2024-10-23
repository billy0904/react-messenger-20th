import React, { useState } from 'react';
import friendIcon from "../../assets/ChatRoomList/friend_icon.svg";
import chatIcon from "../../assets/ChatRoomList/chatting_icon.svg";
import openedChatIcon from "../../assets/ChatRoomList/openedChat_icon.svg";
import shoppingIcon from "../../assets/ChatRoomList/shopping_icon.svg";
import moreIcon from "../../assets/ChatRoomList/more_icon.svg";

const NavBar = () => {
    return (
        <div 
            className="w-full h-navBarHeight bg-White flex items-center justify-between p-[16px]"
            style={{ boxShadow: "0px -4px 8px 0px rgba(0, 0, 0, 0.08)" }}
        >
            <div  className="text-Gray/2 text-[9px] font-['Pretendard'] flex flex-col items-center cursor-pointer">
                <img src={friendIcon} alt="friend" /> 친구
            </div>
            <div className="text-Gray/2 text-[9px] font-['Pretendard'] flex flex-col items-center cursor-pointer">
                <img src={chatIcon} alt="chat" /> 채팅
            </div>
            <div className="text-Gray/2 text-[9px] font-['Pretendard'] flex flex-col items-center cursor-pointer">
                <img src={openedChatIcon} alt="openedChat" /> 오픈채팅
            </div>
            <div className="text-Gray/2 text-[9px] font-['Pretendard'] flex flex-col items-center cursor-pointer">
                <img src={shoppingIcon} alt="shopping" /> 쇼핑
            </div>
            <div className="text-Gray/2 text-[9px] font-['Pretendard'] flex flex-col items-center cursor-pointer">
                <img src={moreIcon} alt="more" /> 더보기
            </div>
        </div>
    );
}

export default NavBar;
