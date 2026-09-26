import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { AuthModal } from "@/features/auth";
import { CartModal } from "@/features/cart";
import logo from "@/shared/assets/logo.svg";
import profile from "@/shared/assets/header-user.svg";
import cart from "@/shared/assets/auth-cart.svg";

type HeaderProps = {
  checkout?: boolean;
};

export function Header({ checkout = false }: HeaderProps) {
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);
  const { isCartOpen, openCart, closeCart } = useCart();

  const handleProfileClick = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/profile");
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

        <div className="flex items-center gap-6 md:gap-[28px]">
          <button
            type="button"
            onClick={handleProfileClick}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center md:transition-opacity md:hover:opacity-80"
            aria-label="Profile"
          >
            <img
              src={profile}
              alt="profile"
              className="h-8 w-8 shrink-0 object-contain"
            />
          </button>
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
