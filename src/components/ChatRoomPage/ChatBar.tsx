import React, { useState } from 'react';
import addIcon from "../../assets/ChatRoom/addMedia.svg";
import emoticon from "../../assets/ChatRoom/emoticonbtn.svg";

const ChatBar = ({ onSendMessage }: { onSendMessage: (message: string) => void }) => {
    const [message, setMessage] = useState('');

    // 엔터로 메시지 전송
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && message.trim() !== '') {
            onSendMessage(message);
            setMessage('');
            //window.localStorage.clear();
        }
    };

    return (
        <div 
            className="w-full h-chatBarHeight bg-White flex items-center pl-[16px]"
            style={{ boxShadow: "0px -4px 8px 0px rgba(0, 0, 0, 0.08)" }}
            >
            <img src={addIcon} alt="addMedia" className="pr-[9px]"/>
            <div className="relative w-inputWidth h-inputHeight rounded-full flex items-center">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="메시지 입력하기"
                    className="w-full h-full bg-Gray/5 rounded-full placeholder-Gray/4 font-['Pretendard'] pl-[12px] pr-[40px]"
                />
                
                {/* 이모티콘 버튼 */}
                <img
                    src={emoticon}
                    alt="emoticon"
                    className="absolute right-[12px]"
                />
            </div>
        </div>
    );
}

export default ChatBar;