interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <div
      className={`flex w-[97px] h-[21px] font-montserrat justify-center items-center text-[11px] border-2 border-[#079941] text-[#079941] rounded-lg px-3 py-1 whitespace-nowrap ${className}`}
    >
      {children}
    </div>
  );
}
