import React, { useState, useEffect } from 'react';
import HomeIndicator from '../components/common/HomeIndicatior';
import TopBar from '../components/common/TopBar';
import NavBar from '../components/ChatRoomListPage/NavBar';
import Header from '../components/ChatRoomListPage/Header';
import Line from '../components/common/Line';

const ChatRoomListPage = () => {
    return (
        <div className='w-width h-height bg-Purple/3 relative'>
            <TopBar />
            <Header />
            <Line />
            <div className='absolute bottom-0 w-width'>
                <NavBar />
                <HomeIndicator />
            </div>
        </div>
    );
}

export default ChatRoomListPage;
