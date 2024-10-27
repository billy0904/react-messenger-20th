import profileIcon from "../../assets/MyProfile/my_profile.svg";
import multiProfileIcon from "../../assets/MyProfile/multiProfile.svg";

const UserProfile = () => {

    return (
        <div className="w-full h-profileTitleHeight bg-White flex items-center justify-between px-[16px] py-[12px]">
            <div className="flex justify-center items-center">
                <img src={profileIcon} alt="profileImg"/>
                <p className="text-Gray/2 text-[18px] font-['Pretendard'] font-semibold ml-[9px]">
                    김태양
                </p>
            </div>
            <img src={multiProfileIcon} alt="setMultiProfile"/>
        </div>
    );
}

export default UserProfile;