import * as React from "react";

interface ProductCardProps {
  name: string;
  type: string;
  price: string;
  image: string;
  onAddToCart?: () => void;
}

export function ProductCard({
  name,
  type,
  price,
  image,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="relative w-[198px] h-[316px] rounded-[16px] overflow-hidden flex flex-col justify-end shadow-[0_2px_8px_2px_color-mix(in_srgb,var(--color-black-50)_20%,transparent)] hover:shadow-[0_2px_16px_2px_var(--color-rose-300)] transition-shadow duration-[120ms] ease-[cubic-bezier(0.36,0,0.66,-0.56)]">
      <img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover -z-20"
      />

      <div
        className="absolute inset-x-0 bottom-0 h-[50%] backdrop-blur-xl pointer-events-none -z-10"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 45%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 45%)",
        }}
      />

      <div className="absolute g-gradient-to-t from-[#4a4a4a]/95 via-[#4a4a4a]/50 to-transparent pointer-events-none -z-10" />

      <div className="relative z-10 p-4 pb-5 flex flex-col">
        <div className="flex justify-between items-center mb-1">
          <span className="font-pt-sans font-bold text-silver-50 text-headline-5 truncate drop-shadow-md pr-5">
            {name}
          </span>
          <span className="bg-rose-100 text-black-50 text-[12px] font-montserrat font-medium px-3.5 py-1 rounded-full shrink-0">
            {price}
          </span>
        </div>

        <span className="font-montserrat text-silver-50 text-[11px] mb-4 drop-shadow-md">
          {type}
        </span>

        <button
          onClick={onAddToCart}
          className="w-full h-9.25 bg-rose-50 text-forest-300 font-montserrat! font-semibold! text-headline-4 rounded-full transition-colors hover:bg-forest-300/80 hover:text-rose-50"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
