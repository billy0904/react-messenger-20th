import ChatRoomPage from './pages/ChatRoomPage';
import ChatRoomListPage from './pages/ChatRoomListPage';
import FriendListPage from './pages/FriendListPage';
import { Route, Routes } from 'react-router-dom';
import MyProfilePage from './pages/MyProfilePage';

function App() {
  return (
    <div className='flex items-center justify-center h-screen bg-Gray/2'>
      <div className='w-width h-height'>
        <Routes>
          <Route path='/chat/:userId' element={<ChatRoomPage />}></Route>
          <Route path='/chatlist' element={<ChatRoomListPage />}></Route>

          <Route path='/friends' element={<FriendListPage />}></Route>
          <Route path='/my' element={<MyProfilePage />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
