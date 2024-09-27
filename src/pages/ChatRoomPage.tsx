import React, { useState, useEffect } from 'react';
import ChatBar from '../components/ChatRoomPage/ChatBar';
import Header from '../components/ChatRoomPage/Header';
import HomeIndicator from '../components/common/HomeIndicatior';
import TopBar from '../components/common/TopBar';
import MessageList from '../components/ChatRoomPage/MessageList';
import { UserData } from '../lib/UserData';

const ChatRoomPage = () => {
    const [currentUser, setCurrentUser] = useState(UserData[0]);
    const [messages, setMessages] = useState<{ senderId: number, text: string, timestamp: Date }[]>([]);

    // 상대방 유저 설정
    const opponentUser = currentUser.userId === 0 ? UserData[1] : UserData[0];
    
    // 로컬 스토리지에서 메시지 불러오기
    useEffect(() => {
        const savedMessages = localStorage.getItem('messages');
        if (savedMessages) {
            const parsedMessages = JSON.parse(savedMessages).map((msg: any) => {
                // timestamp 값을 Date 객체로 변환
                return {
                    ...msg,
                    timestamp: new Date(msg.timestamp),
                };
            });
            setMessages(parsedMessages);
        }
    }, []);

    // 유저 토글 전환
    const toggleUser = () => {
        setCurrentUser(prevUser =>
            prevUser.userId === 0 ? UserData[1] : UserData[0]
        );
    };

    // 메시지 전송 핸들러
    const handleSendMessage = (message: string) => {
        const newMessage = { senderId: currentUser.userId, text: message, timestamp: new Date() };
        
        setMessages(prevMessages => {
            const updatedMessages = [...prevMessages, newMessage];
            // 로컬 스토리지에 저장
            localStorage.setItem('messages', JSON.stringify(updatedMessages));
            return updatedMessages;
        });
    };

    return (
        <div className='w-width h-height bg-Purple/3 relative'>
            <TopBar />
            <Header currentUser={currentUser} opponentUser={opponentUser} toggleUser={toggleUser}/>
            <MessageList messages={messages} currentUserId={currentUser.userId} users={UserData}/>
            <div className='absolute bottom-0 w-width'>
                <ChatBar onSendMessage={handleSendMessage}/>
                <HomeIndicator />
            </div>
        </div>
    );
}

export default ChatRoomPage;
