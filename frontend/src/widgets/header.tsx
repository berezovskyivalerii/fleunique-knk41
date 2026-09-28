import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
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
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { isCartOpen, openCart, closeCart } = useCart();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };

    if (profileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuOpen]);

  const handleProfileClick = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      if (window.innerWidth >= 1440) {
        navigate("/profile/purchases");
      } else {
        setProfileMenuOpen((isOpen) => !isOpen);
      }
    } else {
      setAuthOpen(true);
    }
  };

  return (
    <>
      <header className="absolute left-4 right-4 top-8 z-[120] mx-auto flex h-12 w-[calc(100%-32px)] transform-none items-center justify-between rounded-[24px] border border-white/20 bg-rose-50/70 px-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] backdrop-blur-[20px] [-webkit-backdrop-filter:blur(20px)] will-change-auto md:fixed md:left-0 md:right-0 md:z-50 md:h-16 md:w-[93%] md:rounded-4xl md:bg-transparent md:px-8">
        <div className="left_part_in_header flex items-center">
          <img
            src={logo}
            alt="logo"
            onClick={() => navigate("/")}
            className="h-auto w-[112px] cursor-pointer object-contain md:w-auto"
          />
        </div>

        <div className="flex items-center gap-6">
          <div className="relative" ref={menuRef}>
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
              <div className="lg:hidden absolute right-0 top-11 sm:top-14 w-[240px] p-6 bg-rose-50 rounded-3xl shadow-[0px_4px_4px_0px_rgba(61,59,59,0.20)] inline-flex flex-col justify-start items-center gap-8 z-50">
                <div className="self-stretch flex flex-col justify-start items-start gap-4">
                  <NavLink
                    to="/profile/purchases"
                    onClick={() => setProfileMenuOpen(false)}
                    className={({ isActive }) =>
                      `inline-flex justify-start items-center gap-2 w-full transition-opacity hover:opacity-80 ${
                        isActive
                          ? "font-bold text-forest-400"
                          : "text-forest-300"
                      }`
                    }
                  >
                    <img src={clockIcon} alt="" className="size-6 shrink-0" />
                    <span className="text-forest-300 text-xs font-normal font-montserrat">
                      Recent Purchases
                    </span>
                  </NavLink>

                  <NavLink
                    to="/profile/settings"
                    onClick={() => setProfileMenuOpen(false)}
                    className={({ isActive }) =>
                      `inline-flex justify-start items-center gap-2 w-full transition-opacity hover:opacity-80 ${
                        isActive
                          ? "font-bold text-forest-400"
                          : "text-forest-300"
                      }`
                    }
                  >
                    <img
                      src={settingsIcon}
                      alt=""
                      className="size-6 shrink-0"
                    />
                    <span className="text-forest-300 text-xs font-normal font-montserrat">
                      Profile Settings
                    </span>
                  </NavLink>
                </div>

                <div
                  onClick={() => setProfileMenuOpen(false)}
                  className="w-full flex justify-center [&>button]:w-full [&>button]:self-stretch [&>button]:px-8 [&>button]:py-2 [&>button]:rounded-3xl [&>button]:shadow-[0px_1px_1px_0px_rgba(61,59,59,0.20)] [&>button]:outline [&>button]:outline-1 [&>button]:outline-offset-[-0.50px] [&>button]:outline-silver-200 [&>button]:inline-flex [&>button]:justify-center [&>button]:items-center [&>button]:gap-1 [&>button]:overflow-hidden [&>button]:text-silver-200 [&>button]:text-xs [&>button]:font-medium [&>button]:font-montserrat [&>button]:capitalize"
                >
                  <LogoutButton />
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={openCart}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center md:transition-opacity md:hover:opacity-80"
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

      <CartModal isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}