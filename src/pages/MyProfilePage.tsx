import React, { useState, useEffect } from 'react';
import HomeIndicator from '../components/common/HomeIndicatior';
import TopBar from '../components/common/TopBar';
import NavBar from '../components/common/NavBar';
import Header from '../components/MyProfilePage/Header';
import UserProfile from '../components/MyProfilePage/UserProfile';
import Line from '../components/common/Line';
import ProfileInfo from '../components/MyProfilePage/ProfileInfo';

const MyProfilePage = () => {
    return (
        <div className='w-width h-height bg-White relative'>
            <TopBar />
            <Header />
            <UserProfile/>
            <Line />
            <ProfileInfo title="전화번호" content="+82 10-2052-8337"/>
            <ProfileInfo title="이메일" content="tangerin2601@naver.com"/>
            <ProfileInfo title="SNS" content="@taeyaaaaaaang"/>
            <div className='absolute bottom-0 w-width'>
                <NavBar />
                <HomeIndicator />
            </div>
        </div>
    );
}

export default MyProfilePage;
