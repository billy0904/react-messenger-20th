import backIcon from "../../assets/ChatRoom/back.svg";
import searchIcon from "../../assets/ChatRoom/search.svg";
import menuIcon from "../../assets/ChatRoom/menu.svg";

interface HeaderProps {
    currentUser: { userId: number, userName: string };
    toggleUser: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, toggleUser }) => {

    return (
        <div className="w-full h-headerHeight bg-White flex items-center justify-between pl-[9px]">
            <div className="flex items-center space-x-[2px]">
                <img src={backIcon} alt="GoBack"/>
                <p onClick={toggleUser} className="text-Gray/2 text-2xl font-['Pretendard'] font-semibold cursor-pointer">
                    {currentUser.userName}
                </p>
            </div>

            <div className="flex items-center space-x-[16px] pr-[16px] ml-[80px]">
                <img src={searchIcon} alt="Search"/>
                <img src={menuIcon} alt="Menu"/>
            </div>
        </div>
    );
}

export default Header;