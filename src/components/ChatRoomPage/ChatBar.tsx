import React, { useState } from 'react';
import addIcon from "../../assets/ChatRoom/addMedia.svg";
import emoticon from "../../assets/ChatRoom/emoticonbtn.svg";
import sendIcon from "../../assets/ChatRoom/sendbtn.svg";

const ChatBar = ({ onSendMessage }: { onSendMessage: (message: string) => void }) => {
    const [message, setMessage] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);

    // 메시지 전송 핸들러
    const handleSendMessage = () => {
        if (message.trim() !== '') {
            onSendMessage(message);
            setMessage('');
            setIsInputFocused(false);
        }
    };

    // 엔터로 메시지 전송
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div 
            className="w-full h-chatBarHeight bg-White flex items-center pl-[16px]"
            style={{ boxShadow: "0px -4px 8px 0px rgba(0, 0, 0, 0.08)" }}
        >
            <img src={addIcon} alt="addMedia" className="pr-[9px]" />
            <div className="relative flex items-center flex-grow">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => {
                        if (!message.trim()) setIsInputFocused(false);
                    }}
                    placeholder="메시지 입력하기"
                    className={`transition-all duration-300 w-inputWidth h-inputHeight rounded-full placeholder-Gray/4 font-['Pretendard'] pl-[12px] pr-[40px] bg-Gray/5 ${
                        isInputFocused ? 'w-[275px]' : 'w-inputWidth'
                    }`}
                />

                {/* 이모티콘 버튼 */}
                <div className={`absolute right-[30px] transition-all duration-300 ${isInputFocused ? 'right-[25px]' : 'right-5'}`}>
                    <img
                        src={emoticon}
                        alt="emoticon"
                        className="cursor-pointer"
                    />
                </div>
            </div>

            {/* 전송 아이콘 */}
            <button 
                onClick={handleSendMessage} 
                className={`transition-all duration-300 cursor-pointer mr-[10px]`}
                style={{ width: isInputFocused ? '30px' : '0px', height: '30px', overflow: 'hidden' }}
            >
                <img src={sendIcon} alt="sendMessage" />
            </button>
        </div>
    );
}

export default ChatBar;
