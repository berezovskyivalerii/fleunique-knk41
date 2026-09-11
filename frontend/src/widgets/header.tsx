import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.svg";
import profile from "../../assets/profile_for_header.png";
import cart from "../../assets/cart_for_header.png";

export function Header(){
    const navigate = useNavigate();

    return (
        <header className="flex justify-between items-center rounded-[32px] mx-16 mt-8 px-8 bg-[rgba(217,217,217,0.01)] backdrop-blur-[15px] [-webkit-backdrop-filter:blur(10px)]">
            <div className="left_part_in_header">
                <img src={logo} alt="logo" onClick={() => navigate('/')} className="cursor-pointer"/>
            </div>
            <div className="mt-[5px] flex items-center">
                <button>
                    <img src={profile}/>
                </button>
                <button className="ml-[25px]">
                    <img src={cart}/>
                </button>
            </div>

        </header>
    )
}