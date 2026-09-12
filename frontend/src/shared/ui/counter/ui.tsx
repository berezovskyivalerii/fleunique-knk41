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
        className="group w-[24px] h-[24px] flex justify-center items-center rounded-full bg-[#FBB2EA33] hover:bg-[#033438] transition-colors cursor-pointer"
      >
        <img
          src={minus}
          alt="minus"
          className="brightness-0 invert-0 group-hover:brightness-0 group-hover:invert transition-all"
        />
      </button>

      <input
        type="text"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        className="flex justify-center items-center h-[24px] max-w-[61px] rounded-[8px] bg-[#FBB2EA33] text-[#033438] font-montserrat font-medium text-center outline-none text-[13px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />

      <button
        type="button"
        onClick={handleIncrease}
        className="group w-[24px] h-[24px] flex justify-center items-center rounded-full bg-[#FBB2EA33] hover:bg-[#033438] transition-colors cursor-pointer"
      >
        <img
          src={plus}
          alt="plus"
          className="brightness-0 invert-0 group-hover:brightness-0 group-hover:invert transition-all"
        />
      </button>
    </div>
  );
}
