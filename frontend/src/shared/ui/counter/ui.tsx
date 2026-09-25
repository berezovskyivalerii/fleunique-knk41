import minus from "@/shared/assets/minus_icon.png";
import plus from "@/shared/assets/plus_icon.png";

interface CounterProps {
  value: number | string;
  onChange: (value: number | string) => void;
  onBlur?: () => void;
}

export function Counter({ value, onChange, onBlur }: CounterProps) {
  const handleDecrease = () => {
    const num = Number(value) || 1;
    onChange(num > 1 ? num - 1 : 1);
  };

  const handleIncrease = () => {
    onChange((Number(value) || 0) + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      onChange("");
      return;
    }
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 0) {
      onChange(num);
    }
  };

  return (
    <div className="flex items-center gap-[10px]">
      <button
        type="button"
        onClick={handleDecrease}
        className="group w-[24px] h-[24px] flex justify-center items-center rounded-full bg-rose-100 leading-none hover:bg-forest-300 transition-colors cursor-pointer"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-black group-hover:text-rose-100 transition-colors"
        >
          <path
            d="M3 8H13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        className="flex justify-center items-center h-[24px] max-w-[61px] rounded-[8px] bg-rose-100 text-forest-300 font-montserrat font-medium text-center outline-none text-[13px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />

      <button
        type="button"
        onClick={handleIncrease}
        className="group w-[24px] h-[24px] flex justify-center items-center rounded-full bg-rose-100 leading-none hover:bg-forest-300 transition-colors cursor-pointer"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-black group-hover:text-rose-100 transition-colors"
        >
          <path
            d="M8 1V15M1 8H15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
