import Header from '../components/ChatRoomPage/Header';
import HomeIndicator from '../components/common/HomeIndicatior';
import TopBar from '../components/common/TopBar';

const ChatRoomPage = () => {

    return (
        <div className='w-width h-height bg-Purple/3'>
            <TopBar />
            <Header />
            <div className='mt-[699px]'>
                <HomeIndicator />
            </div>
        </div>
    );
}

export default ChatRoomPage;