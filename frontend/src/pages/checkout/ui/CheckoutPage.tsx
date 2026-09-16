import { useState } from "react";

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

export function CheckoutPage() {
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
    value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґҐ' -]/g, "");

  const sanitizeEmail = (value: string) =>
    value.replace(/[^a-zA-Z0-9@._+-]/g, "");

  const sanitizePhone = (value: string) =>
    value.replace(/[^0-9+\-()\s]/g, "");

  const sanitizeNumbers = (value: string) =>
    value.replace(/\D/g, "");

  const sanitizeDate = (value: string) =>
    value.replace(/[^0-9-]/g, "");

  const sanitizeTime = (value: string) =>
    value.replace(/[^0-9:\s—-]/g, "");

  return (
    <div className="min-h-screen bg-rose-50 font-montserrat text-forest-300">
      <Header checkout />

      <main className="mx-auto w-full max-w-[1120px] px-0 pt-[24px] md:px-6 md:pt-[48px] min-[1184px]:px-0">
        {/* Title + progress */}
        <div className="flex w-full items-center justify-center gap-[32px] px-8 max-[639px]:flex-col max-[639px]:items-start min-[640px]:px-0">
          <h1 className="py-[7.5px] font-pt-sans text-[36px] font-bold uppercase leading-none">
            Checkout
          </h1>

          <div className="flex h-8 w-[478px] shrink-0 items-center text-[13px] font-normal leading-none text-silver-200 max-[639px]:w-full">
            <div className="flex shrink-0 items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-forest-100">
                <img
                  src={checkWhiteIcon}
                  alt=""
                  className="h-4 w-4"
                />
              </div>

              <span>Your Cart</span>
            </div>

            <div className="mx-3 h-[2px] min-w-6 flex-1 bg-silver-100" />

            <div className="flex shrink-0 items-center gap-2 text-forest-100">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-forest-100 bg-transparent">
                2
              </div>

              <span>Checkout</span>
            </div>

            <div className="mx-3 h-[2px] min-w-6 flex-1 bg-silver-100" />

            <div className="flex shrink-0 items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-silver-100 bg-transparent">
                3
              </div>

              <span>Order Complete</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="mt-8 grid grid-cols-1 gap-8 px-8 min-[640px]:mt-4 min-[1184px]:grid-cols-[544px_544px] min-[1184px]:items-start min-[1184px]:px-0">
          {/* LEFT */}
          <section className="min-w-0 min-[1184px]:pt-[29px]">
            <form className="space-y-8">
              {/* Contact */}
              <section>
                <button
                  type="button"
                  onClick={() => toggleSection("contact")}
                  className="mb-7 flex items-center gap-3"
                >
                  <h2 className="font-pt-sans text-[22px] font-bold leading-none">
                    Your Contact Information
                  </h2>

                  <img
                    src={chevronIcon}
                    alt=""
                    className={`block h-3 w-3 shrink-0 transition-transform duration-200 ${openedSections.contact ? "" : "-rotate-180"
                      }`}
                  />
                </button>

                {openedSections.contact && (
                  <div className="space-y-4">
                    <label className="block">
                      <span className="mb-[3px] ml-2 block text-[18px] font-normal leading-none">
                        Full Name
                      </span>

                      <div className="flex h-[56px] items-center gap-2 rounded-[16px] border-[2px] border-forest-400 px-4">
                        <img
                          src={userIcon}
                          alt=""
                          className="h-8 w-8 shrink-0 object-contain"
                        />

                        <input
                          type="text"
                          value={contactName}
                          maxLength={80}
                          autoComplete="name"
                          placeholder="John Doe"
                          onChange={(event) =>
                            setContactName(
                              sanitizeName(event.target.value),
                            )
                          }
                          className="h-full w-full bg-transparent text-[16px] outline-none placeholder:text-silver-100"
                        />
                      </div>
                    </label>

                    <label className="block">
                      <span className="mb-[3px] ml-2 block text-[18px] font-normal leading-none">
                        E-mail*
                      </span>

                      <div className="flex h-[56px] items-center gap-2 rounded-[16px] border-[2px] border-forest-400 px-4">
                        <img
                          src={emailIcon}
                          alt=""
                          className="h-8 w-8 shrink-0 object-contain"
                        />

                        <input
                          type="email"
                          value={email}
                          required
                          maxLength={254}
                          autoComplete="email"
                          inputMode="email"
                          placeholder="example@.com"
                          onChange={(event) =>
                            setEmail(
                              sanitizeEmail(event.target.value),
                            )
                          }
                          className="h-full w-full bg-transparent text-[16px] outline-none placeholder:text-silver-100"
                        />
                      </div>
                    </label>
                  </div>
                )}
              </section>

              {/* Receiver */}
              <section>
                <button
                  type="button"
                  onClick={() => toggleSection("receiver")}
                  className="mb-7 flex items-center gap-3"
                >
                  <h2 className="font-pt-sans text-[22px] font-bold leading-none">
                    Your Receiver’s Information
                  </h2>

                  <img
                    src={chevronIcon}
                    alt=""
                    className={`block h-3 w-3 shrink-0 transition-transform duration-200 ${openedSections.receiver ? "" : "-rotate-180"
                      }`}
                  />
                </button>

                {openedSections.receiver && (
                  <div className="space-y-4">
                    <label className="block">
                      <span className="mb-[3px] ml-2 block text-[18px] font-normal leading-none">
                        Full Name*
                      </span>

                      <div className="flex h-[56px] items-center gap-2 rounded-[16px] border-[2px] border-forest-400 px-4">
                        <img
                          src={userIcon}
                          alt=""
                          className="h-8 w-8 shrink-0 object-contain"
                        />

                        <input
                          type="text"
                          value={receiverName}
                          required
                          maxLength={80}
                          autoComplete="name"
                          placeholder="Jane Doe"
                          onChange={(event) =>
                            setReceiverName(
                              sanitizeName(event.target.value),
                            )
                          }
                          className="h-full w-full bg-transparent text-[16px] outline-none placeholder:text-silver-100"
                        />
                      </div>
                    </label>

                    <label className="block">
                      <span className="mb-[3px] ml-2 block text-[18px] font-normal leading-none">
                        Phone number*
                      </span>

                      <div className="flex h-[56px] items-center gap-2 rounded-[16px] border-[2px] border-forest-400 px-4">
                        <img
                          src={phoneIcon}
                          alt=""
                          className="h-8 w-8 shrink-0 object-contain"
                        />

                        <input
                          type="tel"
                          value={phone}
                          required
                          maxLength={20}
                          autoComplete="tel"
                          inputMode="tel"
                          placeholder="+380 123 456 789"
                          onChange={(event) =>
                            setPhone(
                              sanitizePhone(event.target.value),
                            )
                          }
                          className="h-full w-full bg-transparent text-[16px] outline-none placeholder:text-silver-100"
                        />
                      </div>
                    </label>

                    <label className="flex w-fit cursor-pointer items-center gap-2 text-[16px]">
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
                          <img
                            src={checkIcon}
                            alt=""
                            className="h-3 w-3"
                          />
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
                  className="mb-7 flex items-center gap-3"
                >
                  <h2 className="font-pt-sans text-[22px] font-bold leading-none">
                    Delivery Information
                  </h2>

                  <img
                    src={chevronIcon}
                    alt=""
                    className={`block h-3 w-3 shrink-0 transition-transform duration-200 ${openedSections.delivery ? "" : "-rotate-180"
                      }`}
                  />
                </button>

                {openedSections.delivery && (
                  <div>
                    <label className="flex w-fit cursor-pointer items-center gap-2 text-[16px]">
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
                          <img
                            src={checkIcon}
                            alt=""
                            className="h-3 w-3"
                          />
                        )}
                      </span>

                      <span>Schedule delivery</span>
                    </label>

                    {scheduleDelivery && (
                      <div className="mt-4 grid grid-cols-2 gap-8">
                        <label className="block">
                          <span className="mb-[3px] ml-2 block text-[18px] font-normal leading-none">
                            Date*
                          </span>

                          <input
                            type="text"
                            value={date}
                            required
                            inputMode="numeric"
                            maxLength={10}
                            placeholder="08-09-2026"
                            onChange={(event) =>
                              setDate(
                                sanitizeDate(event.target.value),
                              )
                            }
                            className="h-[56px] w-full rounded-[16px] border-[2px] border-forest-400 bg-transparent px-4 text-[16px] outline-none placeholder:text-silver-100"
                          />
                        </label>

                        <label className="block">
                          <span className="mb-[3px] ml-2 block text-[18px] font-normal leading-none">
                            Time
                          </span>

                          <input
                            type="text"
                            value={time}
                            maxLength={13}
                            placeholder="9:00 — 18:00"
                            onChange={(event) =>
                              setTime(
                                sanitizeTime(event.target.value),
                              )
                            }
                            className="h-[56px] w-full rounded-[16px] border-[2px] border-forest-400 bg-transparent px-4 text-[16px] outline-none placeholder:text-silver-100"
                          />
                        </label>
                      </div>
                    )}

                    <button
                      type="button"
                      className="mt-4 flex h-[56px] w-full items-center gap-2 rounded-[16px] border-[2px] border-silver-200 px-4 text-left text-[18px] font-semibold"
                    >
                      <img
                        src={receiverIcon}
                        alt=""
                        className="h-8 w-8 shrink-0 object-contain"
                      />

                      <span>Pick Up At Boutique</span>
                    </button>

                    <button
                      type="button"
                      className="mt-4 flex h-[56px] w-full items-center gap-2 rounded-[16px] border-[2px] border-forest-400 px-4 text-left text-[18px] font-semibold"
                    >
                      <img
                        src={deliveryIcon}
                        alt=""
                        className="h-8 w-8 shrink-0 object-contain"
                      />

                      <span>Address Delivery</span>
                    </button>

                    <label className="mt-6 block">
                      <span className="mb-[3px] ml-2 block text-[18px] font-normal leading-none">
                        Address*
                      </span>

                      <input
                        type="text"
                        value={address}
                        required
                        maxLength={160}
                        autoComplete="street-address"
                        placeholder="house, Street, City, Odesa oblast, Ukraine"
                        onChange={(event) =>
                          setAddress(event.target.value)
                        }
                        className="h-[56px] w-full rounded-[16px] border-[2px] border-forest-400 bg-transparent px-4 text-[16px] outline-none placeholder:text-silver-100"
                      />
                    </label>

                    <div className="mt-4 grid grid-cols-2 gap-8">
                      <label className="block">
                        <span className="mb-[3px] ml-2 block text-[18px] font-normal leading-none">
                          Floor
                        </span>

                        <input
                          type="text"
                          value={floor}
                          maxLength={3}
                          inputMode="numeric"
                          placeholder="floor number"
                          onChange={(event) =>
                            setFloor(
                              sanitizeNumbers(event.target.value),
                            )
                          }
                          className="h-[56px] w-full rounded-[16px] border-[2px] border-forest-400 bg-transparent px-4 text-[16px] outline-none placeholder:text-silver-100"
                        />
                      </label>

                      <label className="block">
                        <span className="mb-[3px] ml-2 block text-[18px] font-normal leading-none">
                          Apartment
                        </span>

                        <input
                          type="text"
                          value={apartment}
                          maxLength={6}
                          inputMode="numeric"
                          placeholder="apt number"
                          onChange={(event) =>
                            setApartment(
                              sanitizeNumbers(event.target.value),
                            )
                          }
                          className="h-[56px] w-full rounded-[16px] border-[2px] border-forest-400 bg-transparent px-4 text-[16px] outline-none placeholder:text-silver-100"
                        />
                      </label>
                    </div>
                  </div>
                )}
              </section>
            </form>
          </section>

          {/* RIGHT */}
          <aside className="min-w-0">
            <div className="rounded-[28px] bg-white/55 p-8 shadow-[0_4px_10px_rgba(0,0,0,0.15)] backdrop-blur-[20px]">
              <h2 className="font-pt-sans text-[22px] font-bold leading-none">
                Order Details
              </h2>

              <div className="mt-12">
                {/* Product 1 */}
                <div className="flex h-[160px] w-full items-center gap-4 rounded-[8px] bg-rose-50 p-4">
                  <div className="h-[128px] w-[128px] shrink-0 overflow-hidden rounded-[8px]">
                    <img
                      src={productImage}
                      alt="Name of bouquet"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex h-[128px] min-w-0 flex-1 flex-col justify-center">
                    <div className="flex min-w-0 flex-col justify-center">
                      <h3 className="font-pt-sans text-[18px] font-bold leading-none">
                        Name of bouquet
                      </h3>

                      <div className="mt-4 flex w-full items-center justify-between">
                        <div className="flex h-6 items-center gap-[10px]">
                          <button
                            type="button"
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100/20"
                          >
                            <img
                              src={minusIcon}
                              alt="Decrease quantity"
                              className="h-3 w-3 object-contain"
                            />
                          </button>

                          <div className="flex h-6 w-[61px] items-center justify-center rounded-[8px] bg-rose-100/20 text-[12px]">
                            1
                          </div>

                          <button
                            type="button"
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100/20"
                          >
                            <img
                              src={plusIcon}
                              alt="Increase quantity"
                              className="h-3 w-3 object-contain"
                            />
                          </button>
                        </div>

                        <span className="shrink-0 font-pt-sans text-[18px] font-bold leading-none text-rose-300">
                          $20
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product 2 */}
                <div className="mt-5 flex h-[160px] w-full items-center gap-4 rounded-[8px] bg-rose-50 p-4">
                  <div className="h-[128px] w-[128px] shrink-0 overflow-hidden rounded-[8px]">
                    <img
                      src={productImage}
                      alt="Name of bouquet"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex h-[128px] min-w-0 flex-1 flex-col justify-center">
                    <div className="flex min-w-0 flex-col justify-center">
                      <h3 className="font-pt-sans text-[18px] font-bold leading-none">
                        Name of bouquet
                      </h3>

                      <div className="mt-4 flex w-full items-center justify-between">
                        <div className="flex h-6 items-center gap-[10px]">
                          <button
                            type="button"
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100/20"
                          >
                            <img
                              src={minusIcon}
                              alt="Decrease quantity"
                              className="h-3 w-3 object-contain"
                            />
                          </button>

                          <div className="flex h-6 w-[61px] items-center justify-center rounded-[8px] bg-rose-100/20 text-[12px]">
                            1
                          </div>

                          <button
                            type="button"
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-100/20"
                          >
                            <img
                              src={plusIcon}
                              alt="Increase quantity"
                              className="h-3 w-3 object-contain"
                            />
                          </button>
                        </div>

                        <span className="shrink-0 font-pt-sans text-[18px] font-bold leading-none text-rose-300">
                          $20
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Promocode */}
                <div className="mt-8">
                  <label className="mb-2 block text-[18px] font-normal leading-none">
                    Promocode
                  </label>

                  <div className="flex h-[44px] w-full overflow-hidden rounded-[14px] border-[2px] border-forest-400">
                    <input
                      type="text"
                      maxLength={32}
                      placeholder="Your Promocode"
                      className="min-w-0 flex-1 bg-transparent px-4 text-[16px] font-normal outline-none placeholder:font-normal placeholder:text-silver-100"
                    />

                    <button
                      type="button"
                      className="w-[160px] shrink-0 bg-forest-300 text-[18px] font-semibold text-white"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-6 space-y-3 text-[16px] font-normal leading-[20px]">
                  <div className="flex justify-between text-forest-200">
                    <span>Subtotal:</span>
                    <span>$40</span>
                  </div>

                  <div className="flex justify-between text-forest-200">
                    <span>Delivery:</span>
                    <span>$4</span>
                  </div>

                  <div className="flex justify-between text-forest-200">
                    <span>Discount:</span>
                    <span>$0</span>
                  </div>

                  <div className="flex justify-between pt-1">
                    <span>Total:</span>

                    <span className="font-pt-sans text-[18px] font-bold leading-none">
                      $44
                    </span>
                  </div>
                </div>

                {/* Comment */}
                <div className="mt-8 shrink-0">
                  <button
                    type="button"
                    onClick={() => setCommentOpened((prev) => !prev)}
                    className="flex items-center gap-4 text-left text-[18px] leading-none"
                  >
                    <span>Leave a Comment</span>

                    <img
                      src={chevronIcon}
                      alt=""
                      className={`block h-3 w-3 shrink-0 transition-transform duration-200 ${commentOpened ? "" : "-rotate-180"
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
                  className="mt-8 flex h-[48px] w-full items-center justify-center rounded-full bg-rose-300 text-[18px] font-semibold leading-none text-white shadow-[0_3px_5px_rgba(0,0,0,0.12)]"
                >
                  Checkout
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="mx-auto mt-[48px] flex w-full max-w-[1120px] flex-row items-center justify-between gap-4 px-8 pb-[48px] text-[11px] leading-[13px] text-silver-100 md:px-6 min-[1184px]:px-0">
        <p className="shrink-0">
          ©2026, IT STEP COLLEGE TEAM
        </p>

        <div className="flex shrink-0 items-center gap-4">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookies Settings</a>
        </div>
      </footer>
    </div>
  );
}