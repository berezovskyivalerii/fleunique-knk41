import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthModal } from "@/features/auth";
import logo from "@/shared/assets/logo.svg";
import profile from "@/shared/assets/header-user.svg";
import cart from "@/shared/assets/auth-cart.svg";

export function Header() {
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <header className="absolute left-4 right-4 top-8 z-[120] mx-auto flex h-12 w-[calc(100%-32px)] transform-none items-center justify-between rounded-[24px] border border-white/20 bg-rose-50/70 px-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] backdrop-blur-[20px] [-webkit-backdrop-filter:blur(20px)] will-change-auto sm:fixed sm:left-0 sm:right-0 sm:z-50 sm:h-16 sm:w-[93%] sm:rounded-4xl sm:bg-transparent sm:px-8">
        <div className="left_part_in_header flex items-center">
          <img
            src={logo}
            alt="logo"
            onClick={() => navigate("/")}
            className="h-auto w-[112px] cursor-pointer object-contain sm:w-auto"
          />
        </div>

        <div className="flex items-center gap-6 sm:gap-[28px]">
          <button
            type="button"
            onClick={() => setAuthOpen(true)}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center sm:transition-opacity sm:hover:opacity-80"
            aria-label="Open authentication"
          >
            <img src={profile} alt="profile" className="h-8 w-8 shrink-0 object-contain" />
          </button>
          <button type="button" className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center sm:transition-opacity sm:hover:opacity-80">
            <img src={cart} alt="cart" className="h-8 w-8 shrink-0 object-contain" />
          </button>
        </div>
      </header>

      <AuthModal open={authOpen} initialMode="login" onClose={() => setAuthOpen(false)} />
    </>
  );
}
