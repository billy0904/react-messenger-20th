import React from 'react';
import profileIcon from "../../assets/ChatRoom/profile.svg";

interface Message {
    senderId: number;
    text: string;
    timestamp: Date;
}

interface MessageListProps {
    messages: Message[];
    currentUserId: number;
}

const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? '오후' : '오전';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${ampm} ${formattedHours}:${minutes < 10 ? '0' : ''}${minutes}`;
};

const groupMessagesByMinute = (messages: Message[]) => {
    return messages.reduce((acc, message) => {
        // 분 단위로 그룹화 키 생성
        const timeKey = formatTime(message.timestamp);
        if (!acc[timeKey]) {
            acc[timeKey] = [];
        }
        acc[timeKey].push(message);
        return acc;
    }, {} as { [key: string]: Message[] });
};

const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
    const groupedMessages = groupMessagesByMinute(messages);

    return (
        <div className="flex flex-col w-full h-messageAreaHeight font-['Pretendard'] px-4 py-2 overflow-y-auto scrollbar-hide">
            {Object.keys(groupedMessages).map((time, index) => (
                <div key={index} className="mb-4">
                    {/* 시간 출력 */}
                    <div className="text-center text-White text-[12px] font-['Pretendard'] my-[16px]">{time}</div>
                    
                    {/* 메시지 그룹 출력 */}
                    {groupedMessages[time].map((message, idx) => (
                        <div key={idx} className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'} mb-[4px]`}>
                            {/* 상대방 메시지 블록 */}
                            {message.senderId !== currentUserId && idx === 0 && (
                                <div className="flex flex-col items-start mr-2">
                                    {/* 상대방 프로필 아이콘 및 이름 */}
                                    <div className="flex items-center mb-[6px]">
                                        <img src={profileIcon} alt="Profile"/>
                                        <span className="ml-2 text-sm text-Gray/2 text-[16px] font-['Pretendard']">이가빈</span>
                                    </div>
                                    {/* 상대방 메시지 목록 */}
                                    {groupedMessages[time]
                                        .filter((msg) => msg.senderId !== currentUserId)
                                        .map((msg, i) => (
                                            <p key={i} className="px-[14px] py-[10px] max-w-[328px] rounded-[20px] break-all my-1 bg-White text-Gray/2">
                                                {msg.text}
                                            </p>
                                        ))}
                                </div>
                            )}

                            {/* 현재 사용자 메시지 출력 */}
                            {message.senderId === currentUserId && (
                                <p className="px-[14px] py-[10px] max-w-[328px] rounded-[20px] break-all my-1 bg-Purple/1 text-White">
                                    {message.text}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MessageList;
