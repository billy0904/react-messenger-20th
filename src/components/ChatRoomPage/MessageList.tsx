import React, { useState, useEffect, useRef } from 'react';
import profileIcon from "../../assets/ChatRoom/profile.svg";
import { formatTime } from '../../utils/ClockUtils';
import { MessageData } from '../../lib/MessageData';

interface User {
    userId: number;
    userName: string;
}

interface Message {
    senderId: number;
    text: string;
    timestamp: Date;
}

interface MessageListProps {
    messages: Message[];
    currentUserId: number;
    users: User[];
}

const groupMessages = (messages: Message[]) => {
    return messages.reduce((arr, message, index) => {
        const timeKey = formatTime(message.timestamp);
        const prevMessage = messages[index - 1];
        const isSameSender = prevMessage && prevMessage.senderId === message.senderId;
        const isSameMinute = prevMessage && formatTime(prevMessage.timestamp) === timeKey;

        if (!isSameSender || !isSameMinute) {
            arr.push({ timeKey, senderId: message.senderId, messages: [message] });
        } else {
            arr[arr.length - 1].messages.push(message);
        }

        return arr;
    }, [] as { timeKey: string; senderId: number; messages: Message[] }[]);
};

const MessageList: React.FC<MessageListProps> = ({ currentUserId, users }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    // senderId로 사용자 이름 찾기
    const getUserName = (senderId: number) => {
        const user = users.find(user => user.userId === senderId);
        return user ? user.userName : '(알 수 없음)';
    };

    // MessageData와 로컬스토리지 메시지 병합
    useEffect(() => {
        // MessageData 메시지 가져오기
        const initialMessages = MessageData.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
        }));

        // 로컬스토리지에서 메시지 가져오기
        const storedMessages = JSON.parse(localStorage.getItem('messages') || '[]').map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
        }));
        
        const combinedMessages = [...initialMessages, ...storedMessages];
        setMessages(combinedMessages);
    }, []);

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
                                className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'} mb-[4px]`}
                            >
                                {message.senderId !== currentUserId && (
                                    <div className="flex flex-col items-start">
                                        {idx === 0 && (
                                            <div className="flex items-center mb-[6px]">
                                                <img src={profileIcon} alt="Profile" className="mr-2" />
                                                <p className="text-Gray/2 text-[16px] font-['Pretendard']">
                                                    {getUserName(message.senderId)}
                                                </p>
                                            </div>
                                        )}
                                        <p className="px-[14px] py-[10px] max-w-[328px] rounded-[20px] break-all my-1 bg-White text-Gray/2 cursor-pointer">
                                            {message.text}
                                        </p>
                                    </div>
                                )}
                                {message.senderId === currentUserId && (
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
