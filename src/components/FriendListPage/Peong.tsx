import profileIcon from "../../assets/ChatRoom/profile.svg";
import foldIcon from "../../assets/FriendList/up_arrow.svg";
import unfoldIcon from "../../assets/FriendList/down_arrow.svg";
import makeIcon from "../../assets/FriendList/make_peong.svg";
import peongIcon from "../../assets/FriendList/peong_bg.svg";

const Peong = () => {

    return (
        <div>
            <div className="w-full h-[32px] bg-White flex items-center justify-between px-[16px] py-[4px]">
                <p className="text-Gray/4 text-[12px] font-['Pretendard'] font-medium">펑 1</p>
                <img src={foldIcon} alt='fold'className='cursor-pointer'/>
            </div>
            <div className="flex justify-start items-center px-[16px] py-[8px]">
                <div className="flex flex-col cursor-pointer">
                    <img src={makeIcon} alt="makePeong" />
                    <p className="text-Gray/3 text-[12px] font-['Pretendard'] font-medium self-center mt-[9px]">만들기</p>
                </div>
                <div className="flex flex-col ml-[8px] cursor-pointer">
                    <img src={peongIcon} alt="userPeong" />
                    <p className="text-Gray/2 text-[12px] font-['Pretendard'] font-medium self-center mt-[9px]">CEOS</p>
                </div>
            </div>
        </div>
    );
}

export default Peong;