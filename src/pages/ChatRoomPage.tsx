import React, { useState } from 'react';
import ChatBar from '../components/ChatRoomPage/ChatBar';
import Header from '../components/ChatRoomPage/Header';
import HomeIndicator from '../components/common/HomeIndicatior';
import TopBar from '../components/common/TopBar';
import { UserData } from '../lib/UserData';
import MessageList from '../components/ChatRoomPage/MessageList';

const ChatRoomPage = () => {
    const [currentUser, setCurrentUser] = useState(UserData[0]);
    const [messages, setMessages] = useState<{ senderId: number, text: string }[]>([]);

    const handleSendMessage = (message: string) => {
        setMessages(prevMessages => [...prevMessages, { senderId: currentUser.userId, text: message }]);
    };

    const otherUser = currentUser.userId === 0 ? UserData[1] : UserData[0];

    return (
        <div className='w-width h-height bg-Purple/3 relative'>
            <TopBar />
            <Header />
            <MessageList />
            <div className='absolute bottom-0 w-width'>
                <ChatBar onSendMessage={handleSendMessage}/>
                <HomeIndicator />
            </div>
        </div>
    );
}

export default ChatRoomPage;