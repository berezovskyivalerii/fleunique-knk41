import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  size?: "default" | "large" | "medium";
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
    "flex items-center justify-center !font-montserrat font-semibold transition-colors cursor-pointer shadow-[0_2px_2px_0_rgba(61,59,59,0.20)]";

  const variants = {
    primary: "bg-rose-300 text-rose-50 hover:bg-forest-300/80",
    outline:
      "bg-transparent border-2 border-rose-300 text-rose-300 hover:bg-rose-100/50",
  };

  const sizes = {
    default:
      "flex-1 max-w-[256px] h-[45px] rounded-full text-[18px] !font-semibold leading-none text-center capitalize",
    large: "w-full h-[86px] rounded-2xl !text-large-button !font-semibold",
    medium: "w-full py-4 px-0 rounded-full leading-none text-center",
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