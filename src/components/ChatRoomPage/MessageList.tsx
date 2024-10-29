import React, { useEffect, useRef } from 'react';
import profileIcon from "../../assets/ChatRoom/profile.svg";
import { formatTime } from '../../utils/ClockUtils';
import { useUser } from '../../contexts/UserContext';

interface Message {
    senderId: number;
    text: string;
    timestamp: Date;
}

interface MessageListProps {
    messages: Message[];
}

// 메시지 그룹화 함수
const groupMessages = (messages: Message[]) => {
    return messages.reduce((arr, message, index) => {
        const timeKey = formatTime(message.timestamp);
        const prevMessage = messages[index - 1];
        const isSameSender = prevMessage && prevMessage?.senderId === message.senderId;
        const isSameMinute = prevMessage && formatTime(prevMessage.timestamp) === timeKey;

        if (!isSameSender || !isSameMinute) {
            arr.push({ timeKey, senderId: message.senderId, messages: [message] });
        } else {
            arr[arr.length - 1].messages.push(message);
        }

        return arr;
    }, [] as { timeKey: string; senderId: number; messages: Message[] }[]);
};

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    const { currentUser, opponentUser } = useUser();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const groupedMessages = groupMessages(messages);

    let lastTimeDisplayed: string | null = null;

    return (
        <div className="flex flex-col w-full h-messageAreaHeight font-['Pretendard'] px-4 py-2 overflow-y-auto scrollbar-hide">
            {groupedMessages.map((group, groupIndex) => {
                const shouldDisplayTime = group.timeKey !== lastTimeDisplayed;
                lastTimeDisplayed = group.timeKey;

                return (
                    <div key={groupIndex} className="mb-4">
                        {shouldDisplayTime && (
                            <div className="text-center text-White text-[12px] font-['Pretendard'] my-[10px]">
                                {group.timeKey}
                            </div>
                        )}

                        {group.messages.map((message, idx) => (
                            <div
                                key={idx}
                                className={`flex ${message.senderId === currentUser?.userId ? 'justify-end' : 'justify-start'} mb-[4px]`}
                            >
                                {message.senderId !== currentUser?.userId && (
                                    <div className="flex flex-col items-start">
                                        {idx === 0 && (
                                            <div className="flex items-center mb-[6px]">
                                                <img src={profileIcon} alt="Profile" className="mr-2" />
                                                <p className="text-Gray/2 text-[16px] font-['Pretendard']">
                                                    {opponentUser?.userName || '(알 수 없음)'}
                                                </p>
                                            </div>
                                        )}
                                        <p className="px-[14px] py-[10px] max-w-[328px] rounded-[20px] break-all my-1 bg-White text-Gray/2 cursor-pointer">
                                            {message.text}
                                        </p>
                                    </div>
                                )}
                                {message.senderId === currentUser?.userId && (
                                    <p className="px-[14px] py-[10px] max-w-[328px] rounded-[20px] break-all my-1 bg-Purple/1 text-White cursor-pointer">
                                        {message.text}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                );
            })}
            <div ref={scrollRef} />
        </div>
    );
};

export default MessageList;