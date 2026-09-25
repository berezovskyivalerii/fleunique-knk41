import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/shared/ui/button";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 300);
  };

  const handleCheckout = async () => {
    handleClose();
    navigate("/checkout");
  };

  if (!isOpen && !isAnimating) return null;

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="fixed inset-0 z-[150] flex justify-end">
      <div
        className={`absolute inset-0 bg-silver-200/50 transition-opacity duration-300 ease-in ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      <div
        className={`relative flex flex-col bg-rose-50 shadow-2xl transition-transform duration-300 ease-in overflow-y-auto
          w-72 pl-2 pr-4 pt-6 pb-16 gap-6
          md:w-[416px] md:px-8 md:pt-12 md:pb-8
          ${isAnimating ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col justify-start items-center gap-[16px] w-full pl-2 md:pl-0">
          <div className="w-full h-8 inline-flex justify-end items-center">
            <button
              onClick={handleClose}
              className="size-8 relative flex items-center justify-center text-forest-300 hover:opacity-70 transition-opacity"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 13L13 1M1 1L13 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div className="text-forest-300 text-4xl font-bold font-pt-sans uppercase">
            YOUR CART
          </div>
        </div>

        <div className="flex flex-col justify-start items-start gap-6 md:gap-4 flex-1 w-full">
          {cartItems.length === 0 ? (
            <div className="w-full text-center text-forest-300/60 font-montserrat mt-10">
              Your cart is empty
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="w-full bg-rose-50 rounded-lg inline-flex justify-start items-center gap-4 p-2 md:p-0 md:py-[16px]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="size-24 md:size-32 rounded-lg object-cover shrink-0"
                />

                <div className="flex-1 inline-flex flex-col justify-start items-start gap-2 md:gap-[4px]">
                  <div className="self-stretch text-forest-300 text-lg font-bold font-pt-sans line-clamp-1">
                    {item.name}
                  </div>

                  <div className="flex flex-col md:flex-row w-full items-start md:items-center justify-between gap-2 md:gap-0 mt-2 md:mt-3 min-[1184px]:mt-4 md:!w-[208px]">
                    <div className="flex h-6 items-center gap-2 sm:gap-[8px]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xl md:rounded-full bg-rose-100/20 text-forest-300 hover:bg-rose-100/40 transition-colors"
                      >
                        <svg
                          width="10"
                          height="2"
                          viewBox="0 0 10 2"
                          fill="currentColor"
                        >
                          <path d="M0 0h10v2H0z" />
                        </svg>
                      </button>

                      <div className="flex h-6 w-[56px] md:w-[61px] items-center justify-center rounded-lg md:rounded-[8px] bg-rose-100/20 text-[12px] text-forest-300 font-montserrat">
                        {item.quantity}
                      </div>

                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-xl md:rounded-full bg-rose-100/20 text-forest-300 hover:bg-rose-100/40 transition-colors"
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="currentColor"
                        >
                          <path d="M4 4V0h2v4h4v2H6v4H4V6H0V4h4z" />
                        </svg>
                      </button>
                    </div>

                    <div className="text-rose-300 text-lg font-bold font-pt-sans">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="mt-auto w-full pl-2 md:pl-0 flex flex-col gap-4">
            <div className="flex justify-between items-center text-forest-300 font-pt-sans text-xl font-bold">
              <span>Total:</span>
              <span className="text-rose-300">${totalPrice.toFixed(2)}</span>
            </div>
            <Button
              size="medium"
              onClick={handleCheckout}
              className="capitalize w-full md:!w-[256px] mx-auto"
            >
              Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
