import profileIcon from "../../assets/ChatRoom/profile.svg";
import foldIcon from "../../assets/FriendList/up_arrow.svg";
import unfoldIcon from "../../assets/FriendList/down_arrow.svg";
import { UserData } from '../../lib/UserData';

const FriendList = () => {

    return (
        <div>
            <div className="w-full h-[32px] bg-White flex items-center justify-between px-[16px] py-[4px]">
                <p className="text-Gray/4 text-[12px] font-['Pretendard'] font-medium">친구</p>
                <img src={foldIcon} alt='fold' className='cursor-pointer'/>
            </div>
            <div>
                {UserData.map((user) => (
                    <div key={user.userId} className="flex justify-start items-center px-[16px] py-[12px] cursor-pointer">
                        <img src={profileIcon} alt='profile' className='w-[44px]'/>
                        <p className="text-Gray/2 text-[16px] font-['Pretendard'] font-medium leading-[150%] ml-[7px]">
                            {user.userName}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FriendList;