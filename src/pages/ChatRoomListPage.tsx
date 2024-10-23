import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIndicator from '../components/common/HomeIndicatior';
import TopBar from '../components/common/TopBar';
import NavBar from '../components/common/NavBar';
import Header from '../components/ChatRoomListPage/Header';
import Line from '../components/common/Line';
import ChatRoomComponent from '../components/ChatRoomListPage/ChatRoomComponent';
import { UserData } from '../lib/UserData';

interface Message {
    senderId: number;
    text: string;
    timestamp: Date;
}

const ChatRoomListPage: React.FC = () => {
    const navigate = useNavigate();
    const [lastMessages, setLastMessages] = useState<{ [userId: number]: Message | null }>({});

    useEffect(() => {
        const savedMessages = localStorage.getItem('messages');
        if (savedMessages) {
            const parsedMessages: Message[] = JSON.parse(savedMessages).map((msg: any) => ({
                ...msg,
                timestamp: new Date(msg.timestamp),
            }));

            const lastMessagesByUser: { [userId: number]: Message | null } = {};
            UserData.forEach(user => {
                // 각 유저의 마지막 메시지 찾기
                const userMessages = parsedMessages.filter(msg => msg.senderId === user.userId);
                lastMessagesByUser[user.userId] = userMessages.length > 0 ? userMessages[userMessages.length - 1] : null;
            });

            setLastMessages(lastMessagesByUser);
        }
    }, []);
    
    const handleChatRoomClick = (userId: number) => {
        // 클릭한 채팅방으로 이동
        navigate(`/chat/${userId}`);
    };

    return (
        <div className='w-width h-height bg-Purple/3 relative'>
            <TopBar />
            <Header />
            <Line />
            {UserData.map(user => (
                lastMessages[user.userId] && (
                    <ChatRoomComponent 
                        key={user.userId}
                        userId={user.userId}
                        lastMessage={lastMessages[user.userId] || undefined}
                        onClick={() => handleChatRoomClick(user.userId)}
                    />
                )
            ))}
            <div className='absolute bottom-0 w-width'>
                <NavBar />
                <HomeIndicator />
            </div>
        </div>
    );
}

export default ChatRoomListPage;
