import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "@/widgets/header";

import minusIcon from "@/shared/assets/minus.svg";
import plusIcon from "@/shared/assets/plus.svg";
import checkWhiteIcon from "@/shared/assets/checkwhite.svg";
import emailIcon from "@/shared/assets/email.svg";
import userIcon from "@/shared/assets/user.svg";
import phoneIcon from "@/shared/assets/phone.svg";
import receiverIcon from "@/shared/assets/receiver.svg";
import deliveryIcon from "@/shared/assets/delivery.svg";
import chevronIcon from "@/shared/assets/chevron-up.svg";
import checkIcon from "@/shared/assets/check.svg";
import productImage from "@/shared/assets/photo_flowers_product.png";

type SectionKey = "contact" | "receiver" | "delivery";
type DeliveryType = "delivery" | "pickup";
type FieldKey =
  | "contactName"
  | "email"
  | "receiverName"
  | "phone"
  | "address"
  | "date";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[1-9]\d{9,14}$/;
const DATE_RE = /^\d{2}-\d{2}-\d{4}$/;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return <p className="mt-1 ml-2 text-[12px] leading-tight text-error">{message}</p>;
}

export function CheckoutPage() {
  const navigate = useNavigate();
  const [openedSections, setOpenedSections] = useState<
    Record<SectionKey, boolean>
  >({
    contact: true,
    receiver: true,
    delivery: true,
  });

  const [isReceiver, setIsReceiver] = useState(false);
  const [scheduleDelivery, setScheduleDelivery] = useState(false);
  const [commentOpened, setCommentOpened] = useState(false);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("delivery");
  const [quantities, setQuantities] = useState([1, 1]);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});

  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [floor, setFloor] = useState("");
  const [apartment, setApartment] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [comment, setComment] = useState("");

  const toggleSection = (section: SectionKey) => {
    setOpenedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sanitizeName = (value: string) =>
    value.replace(/[^a-zA-Z' -]/g, "").slice(0, 50);

  const sanitizeEmail = (value: string) =>
    value.replace(/[^a-zA-Z0-9@._+-]/g, "");

  const sanitizePhone = (value: string) => {
    const hasLeadingPlus = value.trimStart().startsWith("+");
    const digits = value.replace(/\D/g, "").slice(0, 15);
    return `${hasLeadingPlus ? "+" : ""}${digits}`;
  };

  const sanitizeNumbers = (value: string) => value.replace(/\D/g, "");

  const sanitizeDate = (value: string) => value.replace(/[^0-9-]/g, "");

  const sanitizeTime = (value: string) => value.replace(/[^0-9:\s—-]/g, "");

  const validateField = (field: FieldKey, value: string) => {
    let message = "";

    if (field === "contactName" && value && value.trim().length < 2) {
      message = "Enter at least 2 letters";
    }

    if (field === "email") {
      if (!value.trim()) message = "E-mail is required";
      else if (!EMAIL_RE.test(value.trim())) message = "Enter a valid e-mail";
    }

    if (field === "receiverName") {
      if (!value.trim()) message = "Receiver name is required";
      else if (value.trim().length < 2) message = "Enter at least 2 letters";
    }

    if (field === "phone") {
      if (!value.trim()) message = "Phone number is required";
      else if (!PHONE_RE.test(value.trim())) {
        message = "Enter a valid phone number (10–15 digits)";
      }
    }

    if (field === "address" && deliveryType === "delivery" && !value.trim()) {
      message = "Delivery address is required";
    }

    if (field === "date" && scheduleDelivery) {
      if (!value.trim()) message = "Delivery date is required";
      else if (!DATE_RE.test(value.trim())) message = "Use DD-MM-YYYY format";
    }

    setErrors((prev) => ({ ...prev, [field]: message || undefined }));
    return !message;
  };

  const updateQuantity = (index: number, delta: number) => {
    setQuantities((prev) =>
      prev.map((quantity, itemIndex) =>
        itemIndex === index ? Math.min(99, Math.max(1, quantity + delta)) : quantity,
      ),
    );
  };

  const subtotal = quantities.reduce((sum, quantity) => sum + quantity * 20, 0);
  const deliveryCost = deliveryType === "delivery" ? 4 : 0;
  const discount = 0;
  const total = subtotal + deliveryCost - discount;

  const handleCheckout = () => {
    const checks = [
      validateField("email", email),
      validateField("receiverName", receiverName),
      validateField("phone", phone),
      deliveryType === "delivery" ? validateField("address", address) : true,
      scheduleDelivery ? validateField("date", date) : true,
    ];

    if (checks.every(Boolean)) {
      navigate("/payment");
    }
  };

  return (
    <div className="flex min-h-screen pt-24 flex-col bg-[radial-gradient(circle_at_82%_68%,rgba(251,178,234,0.32),transparent_34%),linear-gradient(180deg,#fffafe_0%,#fffafe_62%,#fff5fc_100%)] font-montserrat text-forest-300">
      <Header checkout />

      <main className="mx-auto w-full max-w-[1120px] flex-1 px-4 pt-6 sm:px-8 sm:pt-10 min-[1184px]:px-0 min-[1184px]:pt-12">
        {/* Title + progress */}
        <div className="flex w-full items-center justify-between gap-6 max-[740px]:flex-col-reverse sm:gap-8">
          <h1 className="font-pt-sans text-[22px] font-bold uppercase leading-none sm:py-[7.5px] sm:text-[36px]">
            Checkout
          </h1>

          <div className="mx-auto flex h-8 w-fit shrink-0 items-center justify-center text-[11px] font-normal leading-none text-silver-200 sm:mx-0 sm:w-[478px] sm:text-[13px]">
            <div className="flex shrink-0 items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-100">
                <img src={checkWhiteIcon} alt="" className="h-4 w-4" />
              </div>

              <span className="hidden sm:inline">Your Cart</span>
            </div>

            <div className="mx-2 h-[2px] w-[48px] shrink-0 bg-silver-100 sm:mx-3 sm:w-auto sm:min-w-6 sm:flex-1" />

            <div className="flex shrink-0 items-center gap-2 text-forest-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-forest-100 bg-transparent">
                2
              </div>

              <span className="hidden sm:inline">Checkout</span>
            </div>

            <div className="mx-2 h-[2px] w-[48px] shrink-0 bg-silver-100 sm:mx-3 sm:w-auto sm:min-w-6 sm:flex-1" />

            <div className="flex shrink-0 items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-silver-100 bg-transparent">
                3
              </div>

              <span className="hidden sm:inline">Order Complete</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="mt-6 grid grid-cols-1 gap-8 sm:mt-8 min-[1184px]:mt-10 min-[1184px]:grid-cols-[544px_544px] min-[1184px]:items-start">
          {/* LEFT */}
          <section className="min-w-0 min-[1184px]:pt-[29px]">
            <form className="space-y-6 sm:space-y-8">
              {/* Contact */}
              <section>
                <button
                  type="button"
                  onClick={() => toggleSection("contact")}
                  className="mb-4 flex items-center gap-3 sm:mb-7"
                >
                  <h2 className="font-pt-sans text-[18px] font-bold leading-none sm:text-[22px]">
                    Your Contact Information
                  </h2>

                  <img
                    src={chevronIcon}
                    alt=""
                    className={`block h-3 w-3 shrink-0 transition-transform duration-200 ${
                      openedSections.contact ? "" : "-rotate-180"
                    }`}
                  />
                </button>

                {openedSections.contact && (
                  <div className="space-y-4">
                    <label className="block">
                      <span className="mb-[3px] ml-2 block text-[14px] font-normal leading-none sm:text-[18px]">
                        Full Name
                      </span>

                      <div className={`flex h-[48px] items-center gap-2 rounded-[14px] border-[1.5px] px-3 transition-colors sm:h-[56px] sm:rounded-[16px] sm:border-[2px] sm:px-4 ${errors.contactName ? "border-error" : "border-forest-400"}`}>
                        <img
                          src={userIcon}
                          alt=""
                          className="h-6 w-6 shrink-0 object-contain sm:h-8 sm:w-8"
                        />

                        <input
                          type="text"
                          value={contactName}
                          maxLength={50}
                          autoComplete="name"
                          placeholder="John Doe"
                          onChange={(event) => {
                            const value = sanitizeName(event.target.value);
                            setContactName(value);
                            if (errors.contactName) validateField("contactName", value);
                          }}
                          onBlur={() => validateField("contactName", contactName)}
                          className="h-full w-full bg-transparent text-[14px] outline-none placeholder:text-silver-100 sm:text-[16px]"
                        />
                      </div>
                      <FieldError message={errors.contactName} />
                    </label>

                    <label className="block">
                      <span className="mb-[3px] ml-2 block text-[14px] font-normal leading-none sm:text-[18px]">
                        E-mail*
                      </span>

                      <div className={`flex h-[48px] items-center gap-2 rounded-[14px] border-[1.5px] px-3 transition-colors sm:h-[56px] sm:rounded-[16px] sm:border-[2px] sm:px-4 ${errors.email ? "border-error" : "border-forest-400"}`}>
                        <img
                          src={emailIcon}
                          alt=""
                          className="h-6 w-6 shrink-0 object-contain sm:h-8 sm:w-8"
                        />

                        <input
                          type="email"
                          value={email}
                          required
                          maxLength={254}
                          autoComplete="email"
                          inputMode="email"
                          placeholder="example@.com"
                          onChange={(event) => {
                            const value = sanitizeEmail(event.target.value);
                            setEmail(value);
                            if (errors.email) validateField("email", value);
                          }}
                          onBlur={() => validateField("email", email)}
                          className="h-full w-full bg-transparent text-[14px] outline-none placeholder:text-silver-100 sm:text-[16px]"
                        />
                      </div>
                      <FieldError message={errors.email} />
                    </label>
                  </div>
                )}
              </section>

              {/* Receiver */}
              <section>
                <button
                  type="button"
                  onClick={() => toggleSection("receiver")}
                  className="mb-4 flex items-center gap-3 sm:mb-7"
                >
                  <h2 className="font-pt-sans text-[18px] font-bold leading-none sm:text-[22px]">
                    Your Receiver’s Information
                  </h2>

                  <img
                    src={chevronIcon}
                    alt=""
                    className={`block h-3 w-3 shrink-0 transition-transform duration-200 ${
                      openedSections.receiver ? "" : "-rotate-180"
                    }`}
                  />
                </button>

                {openedSections.receiver && (
                  <div className="space-y-4">
                    <label className="block">
                      <span className="mb-[3px] ml-2 block text-[14px] font-normal leading-none sm:text-[18px]">
                        Full Name*
                      </span>

                      <div className={`flex h-[48px] items-center gap-2 rounded-[14px] border-[1.5px] px-3 transition-colors sm:h-[56px] sm:rounded-[16px] sm:border-[2px] sm:px-4 ${errors.receiverName ? "border-error" : "border-forest-400"}`}>
                        <img
                          src={userIcon}
                          alt=""
                          className="h-6 w-6 shrink-0 object-contain sm:h-8 sm:w-8"
                        />

                        <input
                          type="text"
                          value={receiverName}
                          required
                          maxLength={50}
                          autoComplete="name"
                          placeholder="Jane Doe"
                          onChange={(event) => {
                            const value = sanitizeName(event.target.value);
                            setReceiverName(value);
                            if (errors.receiverName) validateField("receiverName", value);
                          }}
                          onBlur={() => validateField("receiverName", receiverName)}
                          className="h-full w-full bg-transparent text-[14px] outline-none placeholder:text-silver-100 sm:text-[16px]"
                        />
                      </div>
                      <FieldError message={errors.receiverName} />
                    </label>

                    <label className="block">
                      <span className="mb-[3px] ml-2 block text-[14px] font-normal leading-none sm:text-[18px]">
                        Phone number*
                      </span>

                      <div className={`flex h-[48px] items-center gap-2 rounded-[14px] border-[1.5px] px-3 transition-colors sm:h-[56px] sm:rounded-[16px] sm:border-[2px] sm:px-4 ${errors.phone ? "border-error" : "border-forest-400"}`}>
                        <img
                          src={phoneIcon}
                          alt=""
                          className="h-6 w-6 shrink-0 object-contain sm:h-8 sm:w-8"
                        />

                        <input
                          type="tel"
                          value={phone}
                          required
                          maxLength={16}
                          autoComplete="tel"
                          inputMode="tel"
                          placeholder="+380123456789"
                          onChange={(event) => {
                            const value = sanitizePhone(event.target.value);
                            setPhone(value);
                            if (errors.phone) validateField("phone", value);
                          }}
                          onBlur={() => validateField("phone", phone)}
                          className="h-full w-full bg-transparent text-[14px] outline-none placeholder:text-silver-100 sm:text-[16px]"
                        />
                      </div>
                      <FieldError message={errors.phone} />
                    </label>

                    <label className="flex w-fit cursor-pointer items-center gap-2 text-[13px] sm:text-[16px]">
                      <input
                        type="checkbox"
                        checked={isReceiver}
                        onChange={(event) =>
                          setIsReceiver(event.target.checked)
                        }
                        className="sr-only"
                      />

                      <span className="flex h-5 w-5 items-center justify-center rounded-[5px] border-[2px] border-forest-400">
                        {isReceiver && (
                          <img src={checkIcon} alt="" className="h-3 w-3" />
                        )}
                      </span>

                      <span>I am the receiver</span>
                    </label>
                  </div>
                )}
              </section>

              {/* Delivery */}
              <section>
                <button
                  type="button"
                  onClick={() => toggleSection("delivery")}
                  className="mb-4 flex items-center gap-3 sm:mb-7"
                >
                  <h2 className="font-pt-sans text-[18px] font-bold leading-none sm:text-[22px]">
                    Delivery Information
                  </h2>

                  <img
                    src={chevronIcon}
                    alt=""
                    className={`block h-3 w-3 shrink-0 transition-transform duration-200 ${
                      openedSections.delivery ? "" : "-rotate-180"
                    }`}
                  />
                </button>

                {openedSections.delivery && (
                  <div>
                    <label className="flex w-fit cursor-pointer items-center gap-2 text-[13px] sm:text-[16px]">
                      <input
                        type="checkbox"
                        checked={scheduleDelivery}
                        onChange={(event) =>
                          setScheduleDelivery(event.target.checked)
                        }
                        className="sr-only"
                      />

                      <span className="flex h-5 w-5 items-center justify-center rounded-[5px] border-[2px] border-forest-400">
                        {scheduleDelivery && (
                          <img src={checkIcon} alt="" className="h-3 w-3" />
                        )}
                      </span>

                      <span>Schedule delivery</span>
                    </label>

                    {scheduleDelivery && (
                      <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-8">
                        <label className="block">
                          <span className="mb-[3px] ml-2 block text-[14px] font-normal leading-none sm:text-[18px]">
                            Date*
                          </span>

                          <input
                            type="text"
                            value={date}
                            required
                            inputMode="numeric"
                            maxLength={10}
                            placeholder="08-09-2026"
                            onChange={(event) => {
                              const value = sanitizeDate(event.target.value).slice(0, 10);
                              setDate(value);
                              if (errors.date) validateField("date", value);
                            }}
                            onBlur={() => validateField("date", date)}
                            className={`h-[48px] w-full rounded-[14px] border-[1.5px] bg-transparent px-3 text-[14px] outline-none transition-colors placeholder:text-silver-100 sm:h-[56px] sm:rounded-[16px] sm:border-[2px] sm:px-4 sm:text-[16px] ${errors.date ? "border-error" : "border-forest-400"}`}
                          />
                          <FieldError message={errors.date} />
                        </label>

                        <label className="block">
                          <span className="mb-[3px] ml-2 block text-[14px] font-normal leading-none sm:text-[18px]">
                            Time
                          </span>

                          <input
                            type="text"
                            value={time}
                            maxLength={13}
                            placeholder="9:00 — 18:00"
                            onChange={(event) =>
                              setTime(sanitizeTime(event.target.value))
                            }
                            className="h-[48px] w-full rounded-[14px] border-[1.5px] border-forest-400 bg-transparent px-3 text-[14px] outline-none placeholder:text-silver-100 sm:h-[56px] sm:rounded-[16px] sm:border-[2px] sm:px-4 sm:text-[16px]"
                          />
                        </label>
                      </div>
                    )}

                    <button
                      type="button"
                      aria-pressed={deliveryType === "pickup"}
                      onClick={() => {
                        setDeliveryType("pickup");
                        setErrors((prev) => ({ ...prev, address: undefined }));
                      }}
                      className={`mt-3 flex h-[48px] w-full items-center gap-2 rounded-[14px] border-[1.5px] px-3 text-left text-[14px] font-semibold transition-all duration-200 sm:mt-4 sm:h-[56px] sm:rounded-[16px] sm:border-[2px] sm:px-4 sm:text-[18px] ${deliveryType === "pickup" ? "border-forest-100 bg-forest-100/10 shadow-[0_0_0_2px_rgba(4,198,209,0.12)]" : "border-silver-200 hover:border-forest-200"}`}
                    >
                      <img
                        src={receiverIcon}
                        alt=""
                        className="h-6 w-6 shrink-0 object-contain sm:h-8 sm:w-8"
                      />

                      <span>Pick Up At Boutique</span>
                    </button>

                    <button
                      type="button"
                      aria-pressed={deliveryType === "delivery"}
                      onClick={() => setDeliveryType("delivery")}
                      className={`mt-3 flex h-[48px] w-full items-center gap-2 rounded-[14px] border-[1.5px] px-3 text-left text-[14px] font-semibold transition-all duration-200 sm:mt-4 sm:h-[56px] sm:rounded-[16px] sm:border-[2px] sm:px-4 sm:text-[18px] ${deliveryType === "delivery" ? "border-forest-100 bg-forest-100/10 shadow-[0_0_0_2px_rgba(4,198,209,0.12)]" : "border-silver-200 hover:border-forest-200"}`}
                    >
                      <img
                        src={deliveryIcon}
                        alt=""
                        className="h-6 w-6 shrink-0 object-contain sm:h-8 sm:w-8"
                      />

                      <span>Address Delivery</span>
                    </button>

                    {deliveryType === "delivery" && (
                      <>
                    <label className="mt-4 block sm:mt-6">
                      <span className="mb-[3px] ml-2 block text-[14px] font-normal leading-none sm:text-[18px]">
                        Address*
                      </span>

                      <input
                        type="text"
                        value={address}
                        required
                        maxLength={160}
                        autoComplete="street-address"
                        placeholder="house, Street, City, Odesa oblast, Ukraine"
                        onChange={(event) => {
                          const value = event.target.value.slice(0, 160);
                          setAddress(value);
                          if (errors.address) validateField("address", value);
                        }}
                        onBlur={() => validateField("address", address)}
                        className={`h-[48px] w-full rounded-[14px] border-[1.5px] bg-transparent px-3 text-[14px] outline-none transition-colors placeholder:text-silver-100 sm:h-[56px] sm:rounded-[16px] sm:border-[2px] sm:px-4 sm:text-[16px] ${errors.address ? "border-error" : "border-forest-400"}`}
                      />
                      <FieldError message={errors.address} />
                    </label>

                    <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-8">
                      <label className="block">
                        <span className="mb-[3px] ml-2 block text-[14px] font-normal leading-none sm:text-[18px]">
                          Floor
                        </span>

                        <input
                          type="text"
                          value={floor}
                          maxLength={3}
                          inputMode="numeric"
                          placeholder="floor number"
                          onChange={(event) =>
                            setFloor(sanitizeNumbers(event.target.value))
                          }
                          className="h-[48px] w-full rounded-[14px] border-[1.5px] border-forest-400 bg-transparent px-3 text-[14px] outline-none placeholder:text-silver-100 sm:h-[56px] sm:rounded-[16px] sm:border-[2px] sm:px-4 sm:text-[16px]"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-[3px] ml-2 block text-[14px] font-normal leading-none sm:text-[18px]">
                          Apartment
                        </span>

                        <input
                          type="text"
                          value={apartment}
                          maxLength={6}
                          inputMode="numeric"
                          placeholder="apt number"
                          onChange={(event) =>
                            setApartment(sanitizeNumbers(event.target.value))
                          }
                          className="h-[48px] w-full rounded-[14px] border-[1.5px] border-forest-400 bg-transparent px-3 text-[14px] outline-none placeholder:text-silver-100 sm:h-[56px] sm:rounded-[16px] sm:border-[2px] sm:px-4 sm:text-[16px]"
                        />
                      </label>
                    </div>
                      </>
                    )}
                  </div>
                )}
              </section>
            </form>
          </section>

          {/* RIGHT */}
          <aside className="min-w-0">
            <div className="rounded-[20px] bg-[linear-gradient(180deg,rgba(255,255,255,0.72)_0%,rgba(255,236,249,0.88)_100%)] p-4 shadow-[0_4px_10px_rgba(0,0,0,0.12)] backdrop-blur-[20px] sm:rounded-[28px] sm:p-6 min-[1184px]:p-8">
              <h2 className="font-pt-sans text-[18px] font-bold leading-none sm:text-[22px]">
                Order Details
              </h2>

              <div className="mt-6 sm:mt-8 min-[1184px]:mt-12">
                {/* Product 1 */}
                <div className="flex h-[88px] w-full items-center gap-3 rounded-[8px] bg-rose-50/90 p-3 sm:h-[128px] sm:gap-4 sm:p-4 min-[1184px]:h-[160px]">
                  <div className="h-[64px] w-[64px] shrink-0 overflow-hidden rounded-[8px] sm:h-[96px] sm:w-[96px] min-[1184px]:h-[128px] min-[1184px]:w-[128px]">
                    <img
                      src={productImage}
                      alt="Name of bouquet"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-center sm:h-[96px] min-[1184px]:h-[128px]">
                    <div className="flex min-w-0 flex-col justify-center">
                      <h3 className="font-pt-sans text-[12px] font-bold leading-none sm:text-[16px] min-[1184px]:text-[18px]">
                        Name of bouquet
                      </h3>

                      <div className="mt-2 flex w-full items-center justify-between sm:mt-3 min-[1184px]:mt-4">
                        <div className="flex h-5 items-center gap-2 sm:h-6 sm:gap-[10px]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(0, -1)}
                            disabled={quantities[0] <= 1}
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100/20 transition-all duration-150 hover:bg-rose-100/40 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40 sm:h-6 sm:w-6"
                          >
                            <img
                              src={minusIcon}
                              alt="Decrease quantity"
                              className="h-3 w-3 object-contain"
                            />
                          </button>

                          <div className="flex h-5 w-[42px] items-center justify-center rounded-[8px] bg-rose-100/20 text-[12px] sm:h-6 sm:w-[61px]">
                            {quantities[0]}
                          </div>

                          <button
                            type="button"
                            onClick={() => updateQuantity(0, 1)}
                            disabled={quantities[0] >= 99}
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100/20 transition-all duration-150 hover:bg-rose-100/40 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40 sm:h-6 sm:w-6"
                          >
                            <img
                              src={plusIcon}
                              alt="Increase quantity"
                              className="h-3 w-3 object-contain"
                            />
                          </button>
                        </div>

                        <span className="shrink-0 font-pt-sans text-[14px] font-bold leading-none text-rose-300 sm:text-[16px] min-[1184px]:text-[18px]">
                          ${20 * quantities[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product 2 */}
                <div className="mt-3 flex h-[88px] w-full items-center gap-3 rounded-[8px] bg-rose-50/90 p-3 sm:mt-4 sm:h-[128px] sm:gap-4 sm:p-4 min-[1184px]:mt-5 min-[1184px]:h-[160px]">
                  <div className="h-[64px] w-[64px] shrink-0 overflow-hidden rounded-[8px] sm:h-[96px] sm:w-[96px] min-[1184px]:h-[128px] min-[1184px]:w-[128px]">
                    <img
                      src={productImage}
                      alt="Name of bouquet"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-center sm:h-[96px] min-[1184px]:h-[128px]">
                    <div className="flex min-w-0 flex-col justify-center">
                      <h3 className="font-pt-sans text-[12px] font-bold leading-none sm:text-[16px] min-[1184px]:text-[18px]">
                        Name of bouquet
                      </h3>

                      <div className="mt-2 flex w-full items-center justify-between sm:mt-3 min-[1184px]:mt-4">
                        <div className="flex h-5 items-center gap-2 sm:h-6 sm:gap-[10px]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(1, -1)}
                            disabled={quantities[1] <= 1}
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100/20 transition-all duration-150 hover:bg-rose-100/40 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40 sm:h-6 sm:w-6"
                          >
                            <img
                              src={minusIcon}
                              alt="Decrease quantity"
                              className="h-3 w-3 object-contain"
                            />
                          </button>

                          <div className="flex h-5 w-[42px] items-center justify-center rounded-[8px] bg-rose-100/20 text-[12px] sm:h-6 sm:w-[61px]">
                            {quantities[1]}
                          </div>

                          <button
                            type="button"
                            onClick={() => updateQuantity(1, 1)}
                            disabled={quantities[1] >= 99}
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100/20 transition-all duration-150 hover:bg-rose-100/40 active:scale-90 disabled:cursor-not-allowed disabled:opacity-40 sm:h-6 sm:w-6"
                          >
                            <img
                              src={plusIcon}
                              alt="Increase quantity"
                              className="h-3 w-3 object-contain"
                            />
                          </button>
                        </div>

                        <span className="shrink-0 font-pt-sans text-[14px] font-bold leading-none text-rose-300 sm:text-[16px] min-[1184px]:text-[18px]">
                          ${20 * quantities[1]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Promocode */}
                <div className="mt-5 sm:mt-6 min-[1184px]:mt-8">
                  <label className="mb-2 block text-[14px] sm:text-[18px] font-normal leading-none">
                    Promocode
                  </label>

                  <div className="flex h-[40px] w-full overflow-hidden rounded-[12px] border-[1.5px] border-forest-400 sm:h-[44px] sm:rounded-[14px] sm:border-[2px]">
                    <input
                      type="text"
                      maxLength={32}
                      placeholder="Your Promocode"
                      className="min-w-0 flex-1 bg-transparent px-4 text-[16px] font-normal outline-none placeholder:font-normal placeholder:text-silver-100"
                    />

                    <button
                      type="button"
                      className="w-[96px] shrink-0 bg-forest-300 text-[14px] font-semibold text-white sm:w-[128px] sm:text-[16px] min-[1184px]:w-[160px] min-[1184px]:text-[18px]"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-4 space-y-2 text-[13px] font-normal leading-[16px] sm:mt-5 sm:text-[14px] sm:leading-[18px] min-[1184px]:mt-6 min-[1184px]:space-y-3 min-[1184px]:text-[16px] min-[1184px]:leading-[20px]">
                  <div className="flex justify-between text-forest-200">
                    <span>Subtotal:</span>
                    <span>${subtotal}</span>
                  </div>

                  <div className="flex justify-between text-forest-200">
                    <span>Delivery:</span>
                    <span>${deliveryCost}</span>
                  </div>

                  <div className="flex justify-between text-forest-200">
                    <span>Discount:</span>
                    <span>${discount}</span>
                  </div>

                  <div className="flex justify-between pt-1">
                    <span>Total:</span>

                    <span className="font-pt-sans text-[12px] font-bold leading-none sm:text-[16px] min-[1184px]:text-[18px]">
                      ${total}
                    </span>
                  </div>
                </div>

                {/* Comment */}
                <div className="mt-5 shrink-0 sm:mt-6 min-[1184px]:mt-8">
                  <button
                    type="button"
                    onClick={() => setCommentOpened((prev) => !prev)}
                    className="flex items-center gap-3 text-left text-[13px] leading-none sm:text-[15px] min-[1184px]:gap-4 min-[1184px]:text-[18px]"
                  >
                    <span>Leave a Comment</span>

                    <img
                      src={chevronIcon}
                      alt=""
                      className={`block h-3 w-3 shrink-0 transition-transform duration-200 ${
                        commentOpened ? "" : "-rotate-180"
                      }`}
                    />
                  </button>

                  {commentOpened && (
                    <textarea
                      value={comment}
                      maxLength={500}
                      placeholder="Your Comment"
                      onChange={(event) => setComment(event.target.value)}
                      className="mt-4 h-[128px] w-full resize-none rounded-[18px] border-[1.5px] border-forest-400 bg-transparent px-4 py-3 text-[16px] font-normal outline-none placeholder:font-normal placeholder:text-silver-100"
                    />
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  className="mt-5 flex h-[40px] w-full items-center justify-center rounded-full bg-rose-300 text-[14px] font-semibold leading-none text-white shadow-[0_3px_5px_rgba(0,0,0,0.12)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-rose-200 hover:shadow-[0_6px_12px_rgba(0,0,0,0.16)] active:translate-y-0 active:scale-[0.98] sm:mt-6 sm:h-[44px] sm:text-[16px] min-[1184px]:mt-8 min-[1184px]:h-[48px] min-[1184px]:text-[18px]"
                >
                  Checkout
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="mx-auto mt-6 flex w-full max-w-[1220px] flex-col items-center justify-between gap-3 px-4 pb-6 text-[8px] leading-[10px] text-silver-100 sm:mt-12 sm:flex-row sm:px-8 sm:pb-12 sm:text-[9px] sm:leading-[11px] min-[1184px]:px-0 min-[1184px]:text-[11px] min-[1184px]:leading-[13px]">
        <div className="flex shrink-0 items-center gap-10 sm:gap-4">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookies Settings</a>
        </div>
        <p className="shrink-0">©2026, IT STEP COLLEGE TEAM</p>
      </footer>
    </div>
  );
}
