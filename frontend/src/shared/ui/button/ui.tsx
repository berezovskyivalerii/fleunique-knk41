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
    "flex-1 max-w-[256px] h-[45px] rounded-full font-montserrat font-bold text-[18px] leading-none tracking-normal text-center capitalize cursor-pointer flex items-center justify-center";

  const variants = {
    primary: "bg-[#B3158E] text-white hover:bg-[#033438CC]",
    outline:
      "bg-transparent border-2 border-[#B3158E] text-[#B3158E] hover:bg-[#FBB2EA80] transition-colors",
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
