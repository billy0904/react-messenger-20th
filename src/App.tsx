import ChatRoomPage from './pages/ChatRoomPage';
import ChatRoomListPage from './pages/ChatRoomListPage';
import FriendListPage from './pages/FriendListPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='flex items-center justify-center h-screen bg-Gray/2'>
      <div className='w-width h-height'>
        <Routes>
          <Route path='/chat' element={<ChatRoomPage />}></Route>
          <Route path='/chatlist' element={<ChatRoomListPage />}></Route>

          <Route path='/friends' element={<FriendListPage />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
