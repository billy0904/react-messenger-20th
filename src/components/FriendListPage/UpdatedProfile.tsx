import profileIcon from "../../assets/ChatRoom/profile.svg";
import foldIcon from "../../assets/FriendList/up_arrow.svg";
import unfoldIcon from "../../assets/FriendList/down_arrow.svg";
import redDotIcon from "../../assets/FriendList/redDot.svg";

const UpdatedProfile = () => {

    return (
        <div>
            <div className="w-full h-[32px] bg-White flex items-center justify-between px-[16px] py-[4px]">
                <p className="text-Gray/4 text-[12px] font-['Pretendard'] font-medium">업데이트한 프로필 3</p>
                <img src={foldIcon} alt='fold'className='cursor-pointer'/>
            </div>
            <div className="flex justify-between items-center px-[16px] py-[12px]">
                <div>
                    <img src={redDotIcon} alt="newRedDot"/>
                    <div className="flex flex-col justify-center items-center cursor-pointer">    
                        <img src={profileIcon} alt="profileImg"/>
                        <p className="text-Gray/2 text-[12px] font-['Pretendard'] font-medium mt-[2px]">CEOS</p>
                    </div>
                </div>
                <div>
                    <img src={redDotIcon} alt="newRedDot"/>
                    <div className="flex flex-col justify-center items-center cursor-pointer">    
                        <img src={profileIcon} alt="profileImg"/>
                        <p className="text-Gray/2 text-[12px] font-['Pretendard'] font-medium mt-[2px]">CEOS</p>
                    </div>
                </div><div>
                    <img src={redDotIcon} alt="newRedDot"/>
                    <div className="flex flex-col justify-center items-center cursor-pointer">    
                        <img src={profileIcon} alt="profileImg"/>
                        <p className="text-Gray/2 text-[12px] font-['Pretendard'] font-medium mt-[2px]">CEOS</p>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center cursor-pointer">    
                    <img src={profileIcon} alt="profileImg"/>
                    <p className="text-Gray/2 text-[12px] font-['Pretendard'] font-medium mt-[2px]">CEOS</p>
                </div>
                <div className="flex flex-col justify-center items-center cursor-pointer">    
                    <img src={profileIcon} alt="profileImg"/>
                    <p className="text-Gray/2 text-[12px] font-['Pretendard'] font-medium mt-[2px]">CEOS</p>
                </div>
                <div className="flex flex-col justify-center items-center cursor-pointer">    
                    <img src={profileIcon} alt="profileImg"/>
                    <p className="text-Gray/2 text-[12px] font-['Pretendard'] font-medium mt-[2px]">CEOS</p>
                </div>
            </div>
        </div>
    );
}

export default UpdatedProfile;