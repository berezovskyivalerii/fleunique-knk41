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
      className={`z-50 mx-auto flex h-16 w-[93%] items-center justify-between rounded-4xl border border-white/20 px-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] backdrop-blur-[20px] [-webkit-backdrop-filter:blur(20px)] ${
        checkout
          ? "relative mt-8"
          : "fixed left-0 right-0 top-8"
      }`}
    >
      <div className="flex items-center">
        <img
          src={logo}
          alt="Fleunique"
          onClick={() => navigate("/")}
          className="cursor-pointer"
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