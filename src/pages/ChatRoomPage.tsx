import React, { useState, useEffect } from 'react';
import ChatBar from '../components/ChatRoomPage/ChatBar';
import Header from '../components/ChatRoomPage/Header';
import HomeIndicator from '../components/common/HomeIndicatior';
import TopBar from '../components/common/TopBar';
import MessageList from '../components/ChatRoomPage/MessageList';
import { UserData } from '../lib/UserData';
import { MessageData } from '../lib/MessageData';

const ChatRoomPage = () => {
    const [currentUser, setCurrentUser] = useState(UserData[0]);
    const [messages, setMessages] = useState<{ senderId: number, text: string, timestamp: Date }[]>([]);

    // 상대방 유저 설정
    const opponentUser = currentUser.userId === 0 ? UserData[1] : UserData[0];
    
    // 초기 메시지 및 로컬스토리지 메시지 불러오기
    useEffect(() => {
        // 로컬스토리지 메시지 불러오기
        const savedMessages = localStorage.getItem('messages');
        if (savedMessages) {
            // 로컬스토리지에 저장된 메시지가 있으면 해당 데이터만 사용
            const parsedMessages = JSON.parse(savedMessages).map((msg: any) => ({
                ...msg,
                timestamp: new Date(msg.timestamp),
            }));
            setMessages(parsedMessages);
        } else {
            // 로컬스토리지에 데이터가 없을 경우만 MessageData 사용
            const initialMessages = MessageData.map(msg => ({
                ...msg,
                timestamp: new Date(msg.timestamp),
            }));
            setMessages(initialMessages);
            
            // 초기 메시지 로컬스토리지에 저장
            localStorage.setItem('messages', JSON.stringify(initialMessages));
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
