import { useNavigate } from "react-router-dom";

import logo from "@/shared/assets/logo.svg";
import profile from "@/shared/assets/profile_for_header.png";
import cart from "@/shared/assets/cart_for_header.png";

type HeaderProps = {
  checkout?: boolean;
};

export function Header({ checkout = false }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header
      className={`z-50 mx-auto flex items-center justify-between border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] backdrop-blur-[20px] [-webkit-backdrop-filter:blur(20px)] ${
        checkout
          ? "relative mt-4 h-12 w-[calc(100%-32px)] rounded-[24px] px-4 sm:mt-8 sm:h-16 sm:w-[93%] sm:rounded-4xl sm:px-8"
          : "fixed left-0 right-0 top-8 h-16 w-[93%] rounded-4xl px-8"
      }`}
    >
      <div className="flex items-center">
        <img
          src={logo}
          alt="Fleunique"
          onClick={() => navigate("/")}
          className="h-auto w-[112px] cursor-pointer sm:w-auto"
        />
      </div>

      {!checkout && (
        <div className="flex items-center gap-[28px]">
          <button
            type="button"
            className="cursor-pointer opacity-80 transition-opacity hover:opacity-100"
          >
            <img src={profile} alt="profile" />
          </button>

          <button
            type="button"
            className="cursor-pointer opacity-80 transition-opacity hover:opacity-100"
          >
            <img src={cart} alt="cart" />
          </button>
        </div>
      )}
    </header>
  );
}