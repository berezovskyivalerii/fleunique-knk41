import { useNavigate } from "react-router-dom";

import logo from "../../assets/logo.svg";
import profile from "../../assets/profile_for_header.png";
import cart from "../../assets/cart_for_header.png";

import "../app/styles/header.css";

export function Header(){
    const navigate = useNavigate();

    return (
        <header>
            <div id="left_part_in_header">
                <img src={logo} alt="logo" onClick={() => navigate('/')} className="cursor-pointer"/>
            </div>
            <div id="right_part_in_header">
                <button id="btn_profile">
                    <img src={profile}/>
                </button>
                <button id="btn_cart">
                    <img src={cart}/>
                </button>
            </div>

        </header>
    )
}