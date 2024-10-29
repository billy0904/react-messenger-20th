import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatBar from '../components/ChatRoomPage/ChatBar';
import Header from '../components/ChatRoomPage/Header';
import HomeIndicator from '../components/common/HomeIndicatior';
import TopBar from '../components/common/TopBar';
import MessageList from '../components/ChatRoomPage/MessageList';
import { UserData } from '../lib/UserData';
import { MessageData } from '../lib/MessageData';

interface User {
    userId: number;
    userName: string;
}

interface Message {
    senderId: number;
    text: string;
    timestamp: Date;
}

const ChatRoomPage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const opponentUser = UserData.find(user => user.userId === parseInt(userId || ''));
    const [currentUser] = useState<User | undefined>(UserData.find(user => user.userId === 0));
    const [messages, setMessages] = useState<Message[]>([]);
    
    // 초기 메시지 및 로컬스토리지 메시지 불러오기
    useEffect(() => {
        if (!opponentUser) return;

        const savedMessages = localStorage.getItem(`messages_${opponentUser.userId}`);
        if (savedMessages) {
            const parsedMessages: Message[] = JSON.parse(savedMessages).map((msg: any) => ({
                ...msg,
                timestamp: new Date(msg.timestamp),
            }));
            setMessages(parsedMessages);
        } else {
            // 기본 메시지 설정
            const initialMessages: Message[] = MessageData.filter(
                msg => msg.senderId === opponentUser.userId || msg.senderId === currentUser?.userId
            ).map(msg => ({
                ...msg,
                timestamp: new Date(msg.timestamp),
            }));
            setMessages(initialMessages);
            
            // 초기 메시지 로컬스토리지에 저장
            localStorage.setItem(`messages_${opponentUser.userId}`, JSON.stringify(initialMessages));
        }
    }, [opponentUser, currentUser]);

    // // 유저 토글 전환
    // const toggleUser = () => {
    //     setCurrentUser(prevUser =>
    //         prevUser.userId === 0 ? UserData[1] : UserData[0]
    //     );
    // };

    // 메시지 전송 핸들러
    const handleSendMessage = (message: string) => {
        const newMessage: Message = { senderId: currentUser?.userId || 0, text: message, timestamp: new Date() };
        
        setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, newMessage];
            // 로컬 스토리지에 저장
            if (opponentUser) {
                localStorage.setItem(`messages_${opponentUser.userId}`, JSON.stringify(updatedMessages));
            }
            return updatedMessages;
        });
    };

    if (!opponentUser) return <div>상대방 정보를 찾을 수 없습니다.</div>;

    return (
        <div className='w-width h-height bg-Purple/3 relative'>
            <TopBar />
            <Header opponentUser={opponentUser} />
            <MessageList messages={messages} currentUserId={currentUser?.userId || 0} users={UserData} />
            <div className='absolute bottom-0 w-width'>
                <ChatBar onSendMessage={handleSendMessage} />
                <HomeIndicator />
            </div>
        </div>
    );
}

export default ChatRoomPage;
