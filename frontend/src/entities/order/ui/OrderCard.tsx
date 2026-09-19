interface OrderCardProps {
  status?: "Confirmed" | "In Progress" | "Canceled" | "Delivered";
  date?: string;
  orderId?: string;
  title?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
}

export const OrderCard = ({
  status = "Confirmed",
  date = "08-09-2026",
  orderId = "#FLEUN-080926-67",
  title = "Name of bouquet",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  price = 20,
  imageUrl = "https://via.placeholder.com/130",
}: OrderCardProps) => {
  const statusStyles = {
    Confirmed: "border-info text-info",
    "In Progress": "border-warning-100 text-warning-100",
    Canceled: "border-silver-200 text-silver-200",
    Delivered: "border-success text-success",
  };

  // Common button classes
  const primaryBtnClass =
    "w-full py-[3px] px-4 bg-rose-300 text-rose-50 rounded-[27px] text-[12px]! font-medium font-montserrat! cursor-pointer";
  const secondaryBtnClass =
    "w-full py-[3px] px-4 bg-transparent border border-silver-200 text-silver-200 rounded-full text-[12px]! font-medium font-montserrat! cursor-pointer";

  const renderActionButtons = () => {
    switch (status) {
      case "Confirmed":
        return (
          <>
            <button className={primaryBtnClass}>Track Order</button>
            <button className={secondaryBtnClass}>Buy This Again</button>
            <button className={secondaryBtnClass}>Cancel</button>
          </>
        );
      case "In Progress":
        return (
          <>
            <button className={primaryBtnClass}>Track Order</button>
            <button className={secondaryBtnClass}>Buy This Again</button>
            <button className={secondaryBtnClass}>Change Details</button>
          </>
        );
      case "Canceled":
        return (
          <>
            <button className={primaryBtnClass}>Refund Details</button>
            <button className={secondaryBtnClass}>Buy This Again</button>
          </>
        );
      case "Delivered":
        return (
          <>
            <button className={primaryBtnClass}>Leave A Review</button>
            <button className={secondaryBtnClass}>Buy This Again</button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-[722px] max-h-[187px] bg-white rounded-[16px] py-[16px] px-[24px] flex flex-col gap-[4px] shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-3">
        <span
          className={`px-[24px] h-[19px] rounded-full border text-[11px] font-montserrat font-medium flex items-center justify-center ${statusStyles[status]}`}
        >
          {status}
        </span>
        <div className="w-[1px] h-[16px] bg-silver-100"></div>
        <span className="text-silver-200 text-[11px] font-montserrat">
          {date}
        </span>
        <span className="text-silver-200 text-[11px] font-montserrat">
          {orderId}
        </span>
      </div>

      <div className="flex gap-[15px] items-stretch justify-center mt-1">
        {/* Image wrapper */}
        <div className="w-[128px] h-[128px] shrink-0 rounded-[12px] overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col flex-1 justify-center gap-1">
          <h3 className="text-forest-300 font-bold text-headline-4 font-pt-sans">
            {title}
          </h3>
          <p className="text-forest-300 text-[11px] leading-3.5 font-montserrat max-w-[322px]">
            {description}
          </p>
          <div className="text-rose-300 font-bold text-headline-4 font-pt-sans">
            ${price}
          </div>
        </div>

        <div className="flex flex-col gap-[8px] shrink-0 w-[160px] justify-center">
          {renderActionButtons()}
        </div>
      </div>
    </div>
  );
};
