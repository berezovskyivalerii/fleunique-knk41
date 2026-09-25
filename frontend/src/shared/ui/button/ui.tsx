import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  size?: "default" | "large";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "default",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "flex items-center justify-center !font-montserrat font-semibold transition-colors cursor-pointer";

  const variants = {
    primary: "bg-rose-300 text-white hover:bg-forest-300/80",
outline:
  "bg-transparent border-2 border-rose-300 text-rose-300 hover:bg-rose-100/50",
  };

  const sizes = {
  default:
    "flex-1 max-w-[320px] h-[45px] md:max-w-[256px] rounded-full text-[18px] !font-semibold leading-none text-center capitalize",
  large: "w-full h-21.5 rounded-2xl !text-large-button !font-semibold",
};

  return (
    <button
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
