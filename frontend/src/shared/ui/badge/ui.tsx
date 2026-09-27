import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "in_stock" | "out_of_stock";
  className?: string;
}

export function Badge({
  children,
  variant = "in_stock",
  className = "",
}: BadgeProps) {
  const isOutOfStock = variant === "out_of_stock";

  const variantStyles = isOutOfStock
    ? "w-[121px] border-silver-100 text-silver-100"
    : "w-[97px] border-success text-success";

  return (
    <div
      className={`flex h-[21px] font-montserrat justify-center items-center text-[11px] border-2 rounded-lg px-3 py-1 whitespace-nowrap ${variantStyles} ${className}`}
    >
      {children}
    </div>
  );
}
