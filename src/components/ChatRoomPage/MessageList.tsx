import React, { useRef, useEffect } from 'react';
import profileIcon from "../../assets/ChatRoom/profile.svg";
import { formatTime } from '../../utils/ClockUtils';

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

// 사용자와 시간(분 단위)으로 메시지 그룹화
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

const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId, users }) => {
    const groupedMessages = groupMessages(messages);

    // senderId로 사용자 이름 찾기
    const getUserName = (senderId: number) => {
        const user = users.find(user => user.userId === senderId);
        return user ? user.userName : '(알 수 없음)';
    };

    // 이전 타임스탬프 저장
    let lastTimeDisplayed: string | null = null;

    const scrollRef = useRef<HTMLDivElement>(null);

    // 메시지가 전송될 때마다 하단으로 스크롤
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="flex flex-col w-full h-messageAreaHeight font-['Pretendard'] px-4 py-2 overflow-y-auto scrollbar-hide">
            {groupedMessages.map((group, groupIndex) => {
                const shouldDisplayTime = group.timeKey !== lastTimeDisplayed;
                lastTimeDisplayed = group.timeKey;

                return (
                    <div key={groupIndex} className="mb-4">
                        {/* 타임스탬프 출력 */}
                        {shouldDisplayTime && (
                            <div className="text-center text-White text-[12px] font-['Pretendard'] my-[10px]">
                                {group.timeKey}
                            </div>
                        )}

                        {/* 메시지 그룹 출력 */}
                        {group.messages.map((message, idx) => (
                            <div
                                key={idx}
                                className={`flex ${message.senderId === currentUserId ? 'justify-end' : 'justify-start'} mb-[4px]`}
                            >
                                {/* 상대방 메시지 블록 */}
                                {message.senderId !== currentUserId && (
                                    <div className="flex flex-col items-start">
                                        {/* 첫 번째 메시지일 경우에만 상대방 프로필 아이콘 및 이름 출력 */}
                                        {idx === 0 && (
                                            <div className="flex items-center mb-[6px]">
                                                <img src={profileIcon} alt="Profile" className="mr-2" />
                                                <p className="text-Gray/2 text-[16px] font-['Pretendard']">
                                                    {getUserName(message.senderId)}
                                                </p>
                                            </div>
                                        )}
                                        {/* 상대방 메시지 */}
                                        <p className="px-[14px] py-[10px] max-w-[328px] rounded-[20px] break-all my-1 bg-White text-Gray/2 cursor-pointer">
                                            {message.text}
                                        </p>
                                    </div>
                                )}

                                {/* 현재 사용자 메시지 출력 */}
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
            {/* 스크롤 위치 유지 */}
            <div ref={scrollRef} />
        </div>
    );
};

export default MessageList;
