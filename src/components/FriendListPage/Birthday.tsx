import profileIcon from "../../assets/ChatRoom/profile.svg";
import foldIcon from "../../assets/FriendList/up_arrow.svg";
import unfoldIcon from "../../assets/FriendList/down_arrow.svg";

const Birthday = () => {

    return (
        <div>
            <div className="w-full h-[32px] bg-White flex items-center justify-between px-[16px] py-[4px]">
                <p className="text-Gray/4 text-[12px] font-['Pretendard'] font-medium">생일인 친구</p>
                <img src={foldIcon} alt='fold'className='cursor-pointer'/>
            </div>
        </div>
    );
}

export default Birthday;