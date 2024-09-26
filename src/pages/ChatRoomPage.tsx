import React, { useState } from 'react';
import ChatBar from '../components/ChatRoomPage/ChatBar';
import Header from '../components/ChatRoomPage/Header';
import HomeIndicator from '../components/common/HomeIndicatior';
import TopBar from '../components/common/TopBar';
import MessageList from '../components/ChatRoomPage/MessageList';
import { UserData } from '../lib/UserData';

const ChatRoomPage = () => {
    const [currentUser, setCurrentUser] = useState(UserData[0]);
    const [messages, setMessages] = useState<{ senderId: number, text: string, timestamp: Date }[]>([]);

    // 유저 토글 전환
    const toggleUser = () => {
        setCurrentUser(prevUser =>
            prevUser.userId === 0 ? UserData[1] : UserData[0]
        );
    };

    const handleSendMessage = (message: string) => {
        setMessages(prevMessages => [
            ...prevMessages,
            { senderId: currentUser.userId, text: message, timestamp: new Date() } // timestamp 추가
        ]);
    };

    return (
        <div className='w-width h-height bg-Purple/3 relative'>
            <TopBar />
            <Header currentUser={currentUser} toggleUser={toggleUser}/>
            <MessageList messages={messages} currentUserId={currentUser.userId}/>
            <div className='absolute bottom-0 w-width'>
                <ChatBar onSendMessage={handleSendMessage}/>
                <HomeIndicator />
            </div>
        </div>
    );
}

export default ChatRoomPage;