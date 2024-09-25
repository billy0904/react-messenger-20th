import ChatBar from '../components/ChatRoomPage/ChatBar';
import Header from '../components/ChatRoomPage/Header';
import HomeIndicator from '../components/common/HomeIndicatior';
import TopBar from '../components/common/TopBar';

const ChatRoomPage = () => {

    return (
        <div className='w-width h-height bg-Purple/3'>
            <TopBar />
            <Header />
            <div className='mt-[631px]'>
                <ChatBar />
                <HomeIndicator />
            </div>
        </div>
    );
}

export default ChatRoomPage;