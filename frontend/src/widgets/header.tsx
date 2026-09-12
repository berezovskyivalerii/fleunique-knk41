import { useNavigate } from "react-router-dom";

import logo from "@/shared/assets/logo.svg";
import profile from "@/shared/assets/profile_for_header.png";
import cart from "@/shared/assets/cart_for_header.png";

export function Header() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-4 left-0 right-0 z-50 w-[95%] max-w-[1440px] mx-auto h-16 flex justify-between items-center px-8 rounded-[32px] bg-white/[0.08] backdrop-blur-[20px] [-webkit-backdrop-filter:blur(20px)] border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]">
      <div className="left_part_in_header flex items-center">
        <img
          src={logo}
          alt="logo"
          onClick={() => navigate("/")}
          className="cursor-pointer"
        />
      </div>

      <div className="flex items-center gap-[28px]">
        <button className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
          <img src={profile} alt="profile" />
        </button>
        <button className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
          <img src={cart} alt="cart" />
        </button>
      </div>
    </header>
  );
}
