import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIndicator from '../components/common/HomeIndicatior';
import TopBar from '../components/common/TopBar';
import NavBar from '../components/common/NavBar';
import Header from '../components/ChatRoomListPage/Header';
import Line from '../components/common/Line';
import ChatRoomComponent from '../components/ChatRoomListPage/ChatRoomComponent';
import { UserData } from '../lib/UserData';
import { useUser } from '../contexts/UserContext';

interface Message {
    senderId: number;
    text: string;
    timestamp: Date;
}

const ChatRoomListPage: React.FC = () => {
    const navigate = useNavigate();
    const { currentUser } = useUser();
    const [lastMessages, setLastMessages] = useState<{ [userId: number]: Message | null }>({});

    useEffect(() => {
        const lastMessagesByUser: { [userId: number]: Message | null } = {};

        UserData.forEach(user => {
            // 각 유저별 메시지 불러오기
            if (currentUser && user.userId !== currentUser.userId) {
                // currentUser와 user 간의 공통 대화 키 생성
                const chatKey = `messages_${Math.min(currentUser.userId, user.userId)}_${Math.max(currentUser.userId, user.userId)}`;
                const savedMessages = localStorage.getItem(chatKey);
                if (savedMessages) {
                    const parsedMessages: Message[] = JSON.parse(savedMessages).map((msg: any) => ({
                        ...msg,
                        timestamp: new Date(msg.timestamp),
                    }));

                    lastMessagesByUser[user.userId] = parsedMessages.length > 0 ? parsedMessages[parsedMessages.length - 1] : null;
                } else {
                    lastMessagesByUser[user.userId] = null;
                }
            }
        });

        setLastMessages(lastMessagesByUser);
    }, [currentUser]);
    
    const handleChatRoomClick = (userId: number) => {
        if (!currentUser) return;

        // chatKey 생성
        const chatKey = `${Math.min(currentUser.userId, userId)}_${Math.max(currentUser.userId, userId)}`;
        
        // 클릭한 채팅방으로 이동
        navigate(`/chat/${chatKey}`);
    };

    return (
        <div className='w-width h-height bg-White relative'>
            <TopBar />
            <Header />
            <Line />
            {UserData.filter(user => currentUser && user.userId !== currentUser.userId).map(user => (
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
