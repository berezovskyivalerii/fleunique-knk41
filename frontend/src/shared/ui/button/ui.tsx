interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "flex-1 max-w-[256px] h-[45px] rounded-full font-montserrat font-bold text-[18px] leading-none tracking-normal text-center capitalize transition-colors cursor-pointer";

  const variants = {
    primary: "bg-[#B3158E] text-white hover:bg-[#911072]",
    outline:
      "bg-transparent border-2 border-[#B3158E] text-[#B3158E] hover:bg-[#FFF0F8]",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
