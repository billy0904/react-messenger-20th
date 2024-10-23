import React, { useState } from 'react';
import addIcon from "../../assets/ChatRoom/addMedia.svg";
import emoticon from "../../assets/ChatRoom/emoticonbtn.svg";

const NavBar = () => {
    return (
        <div 
            className="w-full h-navBarHeight bg-White flex items-center p-[16px]"
            style={{ boxShadow: "0px -4px 8px 0px rgba(0, 0, 0, 0.08)" }}
        >
            <img src={addIcon} alt="addMedia" className="pr-[9px]" />
        </div>
    );
}

export default NavBar;
