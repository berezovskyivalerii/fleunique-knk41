import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { AuthModal } from "@/features/auth";
import { LogoutButton } from "@/features/auth";
import { CartModal } from "@/features/cart";
import logo from "@/shared/assets/logo.svg";
import profile from "@/shared/assets/header-user.svg";
import cart from "@/shared/assets/auth-cart.svg";
import clockIcon from "@/shared/assets/recent_purchases.svg";
import settingsIcon from "@/shared/assets/profile_settings.svg";

type HeaderProps = {
  checkout?: boolean;
};

export function Header(_props: HeaderProps) {
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleProfileClick = () => {
    const token = localStorage.getItem("access_token");

    if (token) {
      setProfileMenuOpen((isOpen) => !isOpen);
    } else {
      setAuthOpen(true);
    }
  };

  return (
    <>
      <header className="fixed left-4 right-4 top-8 z-[120] mx-auto flex h-12 w-[calc(100%-32px)] transform-none items-center justify-between rounded-[24px] border border-white/20 bg-transparent px-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] backdrop-blur-[20px] [-webkit-backdrop-filter:blur(20px)] will-change-auto sm:left-0 sm:right-0 sm:z-50 sm:h-16 sm:w-[93%] sm:rounded-4xl sm:bg-transparent sm:px-8">
        <div className="left_part_in_header flex items-center">
          <img
            src={logo}
            alt="logo"
            onClick={() => navigate("/")}
            className="h-auto w-[112px] cursor-pointer object-contain sm:w-auto"
          />
        </div>

        <div className="flex items-center gap-6 sm:gap-[28px]">
          <div className="relative">
            <button
              type="button"
              onClick={handleProfileClick}
              className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center sm:transition-opacity sm:hover:opacity-80"
              aria-label="Profile"
              aria-expanded={profileMenuOpen}
            >
              <img
                src={profile}
                alt="profile"
                className="h-8 w-8 shrink-0 object-contain"
              />
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 top-11 w-[244px] rounded-[28px] border border-white/60 bg-rose-50/90 p-6 shadow-[0_8px_24px_rgba(0,0,0,0.16)] backdrop-blur-[20px] sm:top-14">
                <nav className="flex flex-col gap-4 font-montserrat text-[16px] text-forest-300">
                  <NavLink
                    to="/profile/purchases"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-3"
                  >
                    <img src={clockIcon} alt="" className="h-6 w-6" />
                    Recent Purchases
                  </NavLink>
                  <NavLink
                    to="/profile/settings"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-3"
                  >
                    <img src={settingsIcon} alt="" className="h-6 w-6" />
                    Profile Settings
                  </NavLink>
                </nav>

                <div className="mt-6 flex justify-center">
                  <LogoutButton />
                </div>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center sm:transition-opacity sm:hover:opacity-80"
          >
            <img
              src={cart}
              alt="cart"
              className="h-8 w-8 shrink-0 object-contain"
            />
          </button>
        </div>
      </header>

      <AuthModal
        open={authOpen}
        initialMode="login"
        onClose={() => setAuthOpen(false)}
      />
      
      <CartModal 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)} 
      />
    </>
  );
}
