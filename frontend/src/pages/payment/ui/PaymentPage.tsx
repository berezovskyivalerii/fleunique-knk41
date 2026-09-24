import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import logo from "@/shared/assets/logo.svg";

const formatCardNumber = (value: string) =>
  value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");

const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);

  if (digits.length <= 2) {
    return digits;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

const cardIcon = (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-8 w-8 text-[#033438]">
    <path
      d="M2.5 6.25c0-1.036.84-1.875 1.875-1.875h11.25c1.036 0 1.875.839 1.875 1.875v7.5c0 1.036-.839 1.875-1.875 1.875H4.375A1.875 1.875 0 0 1 2.5 13.75v-7.5Zm2.5-.625h10v1.875H5V5.625Zm0 4.375h3.125v1.25H5v-1.25Zm5.625 0h4.375v1.25h-4.375v-1.25Z"
      fill="currentColor"
    />
  </svg>
);

export function PaymentPage() {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [savePayment, setSavePayment] = useState(false);
  const [paymentState, setPaymentState] = useState<"form" | "pressed" | "loading" | "loadingFinish" | "complete">("form");
  const [isLeaving, setIsLeaving] = useState(false);
  const [loadingMotionStarted, setLoadingMotionStarted] = useState(false);
  const [completeMotionStarted, setCompleteMotionStarted] = useState(false);

  useEffect(() => {
    if (paymentState !== "pressed" && paymentState !== "loading" && paymentState !== "loadingFinish") {
      return;
    }

    const timer = window.setTimeout(
      () => {
        if (paymentState === "pressed") {
          setPaymentState("loading");
        } else if (paymentState === "loading") {
          setPaymentState("loadingFinish");
        } else {
          setPaymentState("complete");
        }
      },
      paymentState === "pressed" ? 260 : paymentState === "loading" ? 1400 : 650,
    );

    return () => window.clearTimeout(timer);
  }, [paymentState]);

  useEffect(() => {
    setLoadingMotionStarted(false);
    setCompleteMotionStarted(false);

    if (paymentState === "loading" || paymentState === "loadingFinish") {
      const timer = window.setTimeout(() => setLoadingMotionStarted(true), 20);

      return () => window.clearTimeout(timer);
    }

    if (paymentState === "complete") {
      const timer = window.setTimeout(() => setCompleteMotionStarted(true), 20);

      return () => window.clearTimeout(timer);
    }
  }, [paymentState]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (paymentState !== "form") {
      return;
    }

    setPaymentState("pressed");
  };

  const handleBackToHome = () => {
    setIsLeaving(true);
    window.setTimeout(() => navigate("/"), 260);
  };

  if (paymentState === "loading" || paymentState === "loadingFinish") {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_15%_25%,rgba(251,178,234,0.40),transparent_20%),radial-gradient(circle_at_80%_70%,rgba(86,196,255,0.18),transparent_22%),linear-gradient(90deg,#fffafe_0%,#fdf7fb_42%,#edf7fb_100%)]">
        <img
          src={logo}
          alt="Fleunique"
          className={`absolute left-1/2 top-1/2 h-[48px] w-[141px] -translate-x-1/2 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${loadingMotionStarted ? "-translate-y-[82px] opacity-100" : "-translate-y-[150px] opacity-0"}`}
        />
        <div className="relative mt-20 h-20 w-20" aria-label={paymentState === "loadingFinish" ? "Payment successful" : "Processing payment"} role="status">
            <span className="absolute inset-0 rounded-full border-[8px] border-[#f3a7e4]" />
          {paymentState === "loading" ? (
            <span className="absolute inset-0 animate-spin rounded-full border-[8px] border-transparent border-l-[#b3158e]" />
          ) : (
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="absolute left-2.5 top-2.5 h-[60px] w-[60px] text-[#b3158e]">
              <path d="m5 12.5 4.2 4.2L19 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
            </svg>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_15%_25%,rgba(251,178,234,0.40),transparent_20%),radial-gradient(circle_at_80%_70%,rgba(86,196,255,0.18),transparent_22%),linear-gradient(90deg,#fffafe_0%,#fdf7fb_42%,#edf7fb_100%)] px-4 py-6 font-montserrat text-[#033438]">
      <div className="w-full max-w-[608px]">
        <div className={`mb-12 flex justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${completeMotionStarted ? "translate-y-0 opacity-100" : "translate-y-[58px] opacity-0"}`}>
          <img src={logo} alt="Fleunique" className="h-[48px] w-[141px] object-contain" />
        </div>

        {paymentState === "complete" ? (
          <div className="mx-auto w-full max-w-[500px] animate-[fade-in_300ms_ease-out]">
            <div className="rounded-[32px] bg-white/[0.01] px-8 py-8 text-[#033438] shadow-[0_4px_4px_rgba(61,59,59,0.2)]">
              <h1 className="text-center font-pt-sans text-[30px] font-bold uppercase leading-none sm:text-[36px]">Your order is complete!</h1>

              <div className="mt-6 space-y-6 text-[16px] sm:text-[18px]">
                <p>
                  Order ID: <strong className="ml-2 font-pt-sans text-[20px] sm:text-[22px]">#FLEUN-100926-67</strong>
                </p>
                <div>
                  <p>You Ordered:</p>
                  <p className="ml-8 mt-8 font-pt-sans font-bold">Name of bouquet x1</p>
                  <p className="ml-8 mt-2 font-pt-sans font-bold">Name of bouquet x1</p>
                </div>
                <div>
                  <p>For:</p>
                  <p className="ml-8 mt-8 font-pt-sans font-bold">Receiver&apos;s Full Name</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleBackToHome}
              className={`mt-10 flex h-[61px] w-full items-center justify-center rounded-[27px] border-0 text-[18px] font-semibold text-white shadow-[0_2px_2px_rgba(61,59,59,0.2)] transition-colors duration-300 ease-out active:translate-y-[1px] ${isLeaving ? "bg-[#033438] opacity-80" : "bg-[#b3158e] hover:bg-[#033438]"}`}
            >
              Back To Home
            </button>
          </div>
        ) : (
        <form className="mx-auto w-full max-w-[500px]" onSubmit={handleSubmit}>
          <div className="rounded-[32px] bg-[rgba(255,250,254,0.01)] p-8 shadow-[0_4px_4px_rgba(61,59,59,0.2)]">
            <div className="space-y-6">
            <label className="block text-left">
              <span className="mb-[3px] block text-[18px] font-normal leading-normal text-[#033438]">
                Card Number
              </span>

              <div className="flex h-[56px] items-center gap-2 rounded-[16px] border-[1.5px] border-[#04191d] bg-[#fffafe] px-4 py-3 transition-colors hover:border-[#033438]">
                <span className="flex h-8 w-8 items-center justify-center text-[#033438]">{cardIcon}</span>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(event) => setCardNumber(formatCardNumber(event.target.value))}
                  className="h-full w-full bg-transparent text-[16px] text-[#033438] outline-none placeholder:text-[#828282]"
                  placeholder="0000 0000 0000 0000"
                  inputMode="numeric"
                />
              </div>
            </label>

            <div className="grid grid-cols-2 gap-4 sm:gap-8">
              <label className="block text-left">
                <span className="mb-[3px] block text-[18px] font-normal leading-normal text-[#033438]">
                  Expiry Date
                </span>

                <input
                  type="text"
                  value={expiry}
                  onChange={(event) => setExpiry(formatExpiry(event.target.value))}
                  className="h-[56px] w-full rounded-[16px] border-[1.5px] border-[#04191d] bg-[#fffafe] px-6 py-3 text-[16px] text-[#033438] outline-none placeholder:text-[#828282]"
                  placeholder="MM/YY"
                  inputMode="numeric"
                />
              </label>

              <label className="block text-left">
                <span className="mb-[3px] block text-[18px] font-normal leading-normal text-[#033438]">
                  CVV
                </span>

                <input
                  type="password"
                  value={cvv}
                  onChange={(event) => setCvv(event.target.value.replace(/\D/g, "").slice(0, 4))}
                  className="h-[56px] w-full rounded-[16px] border-[1.5px] border-[#04191d] bg-[#fffafe] px-6 py-3 text-[16px] tracking-[0.18em] text-[#033438] outline-none placeholder:text-[#828282]"
                  placeholder="•••"
                  maxLength={4}
                  inputMode="numeric"
                />
              </label>
            </div>

            <label className="flex items-center gap-2 text-[18px] font-normal text-[#033438]">
              <input
                type="checkbox"
                checked={savePayment}
                onChange={(event) => setSavePayment(event.target.checked)}
                className="h-6 w-6 accent-[#b3158e]"
              />
              <span>Save this payment method</span>
            </label>
            </div>
          </div>

          <button
            type="submit"
            className={`mt-8 flex h-[61px] w-full items-center justify-center rounded-[27px] border-0 text-[18px] font-semibold shadow-[0_2px_2px_rgba(61,59,59,0.2)] transition-colors duration-300 ease-out active:translate-y-[1px] ${paymentState === "pressed" ? "bg-[#42686b] text-white hover:bg-[#033438]" : "bg-[#fffafe] text-[#033438] hover:bg-[#033438] hover:text-[#fffafe]"}`}
          >
            Pay Now
          </button>

          <div className="mt-3 text-center">
            <button
              type="button"
              className="mx-auto flex items-center justify-center gap-2 text-[13px] font-normal text-[#828282] transition hover:text-[#033438]"
            >
              <span aria-hidden="true">&larr;</span>
              Back
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}
