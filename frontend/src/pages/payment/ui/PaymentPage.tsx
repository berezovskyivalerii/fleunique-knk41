import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import card from "@/shared/assets/card-icon.svg";
import back from "@/shared/assets/arrow-left.svg";
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
  <img src={card}></img>
);

function PaymentCheckbox({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px] border-[1.5px] border-forest-300 bg-rose-50"
    >
      {checked && (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-forest-300">
          <path d="m5 12.5 4.2 4.2L19 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      )}
    </span>
  );
}

function PaymentBackground() {
  return (
    <>
      <div className="pointer-events-none absolute left-[150.67px] top-[172.77px] z-0 h-[1143px] w-[1148px] -translate-x-1/2 rotate-[-136.29deg] bg-[radial-gradient(circle,_#f0a9df_22%,_#04c6d1_72%,_transparent_100%)] opacity-50 blur-[108px] max-[1439px]:left-[-0.79px] max-[1439px]:top-[448px] max-[743px]:left-[calc(12.5%+8.35px)] max-[743px]:top-[414px]" />
      <div className="pointer-events-none absolute left-[calc(41.67%+14px)] top-[-289px] z-0 h-[1132px] w-[1165px] rotate-[83.81deg] bg-[radial-gradient(circle,_#fbb2ea_0%,_#fffafe_68%,_transparent_100%)] opacity-50 blur-[100px] max-[1439px]:left-[calc(12.5%+45px)] max-[1439px]:top-[-308px] max-[743px]:left-[calc(25%+38.5px)] max-[743px]:top-[-109px]" />
    </>
  );
}

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
      <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(90deg,_#fffafe_0%,_#fdf7fb_42%,_#edf7fb_100%)] px-4 py-6 font-montserrat text-forest-300 md:px-8">
        <PaymentBackground />
        <div className="relative z-10 flex flex-col items-center gap-12">
          <img
            src={logo}
            alt="Fleunique"
            className={`h-[48px] w-[141px] transition-opacity duration-700 ${loadingMotionStarted ? "opacity-100" : "opacity-0"}`}
          />
          <div className="relative h-20 w-20" aria-label={paymentState === "loadingFinish" ? "Payment successful" : "Processing payment"} role="status">
            <span className="absolute inset-0 rounded-full border-[8px] border-rose-100" />
            {paymentState === "loading" ? (
              <span className="absolute inset-0 animate-spin rounded-full border-[8px] border-transparent border-l-rose-300" />
            ) : (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="absolute left-2.5 top-2.5 h-[60px] w-[60px] text-rose-300">
                <path d="m5 12.5 4.2 4.2L19 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" />
              </svg>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(90deg,_#fffafe_0%,_#fdf7fb_42%,_#edf7fb_100%)] px-4 py-6 font-montserrat text-forest-300 md:px-8 min-[1440px]:px-0">
      <PaymentBackground />
      <div className="relative z-10 w-full max-w-[608px]">
        <div className={`mb-12 flex justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${paymentState === "form" || completeMotionStarted ? "translate-y-0 opacity-100" : "translate-y-[58px] opacity-0"}`}>
          <img src={logo} alt="Fleunique" className="h-[48px] w-[141px] object-contain" />
        </div>
        {paymentState === "complete" ? (
          <div className="mx-auto w-full animate-[fade-in_300ms_ease-out]">
            <div className="rounded-[32px] bg-white/[0.01] px-8 py-8 text-forest-300 shadow-[0_4px_4px_rgba(61,59,59,0.2)]">
              <h1 className="text-center font-pt-sans text-headline-3 md:text-headline-2 font-bold uppercase leading-none">Your order is complete!</h1>

              <div className="mt-6 space-y-6">
                <p className=" text-label">
                  Order ID: <span className="ml-2 font-pt-sans text-headline-3 font-bold">#FLEUN-100926-67</span>
                </p>
                <div>
                  <p className=" text-label">You Ordered:</p>
                  <div className="ml-8 mt-4 font-pt-sans font-bold text-headline-4 space-y-2">
                    <p>Name of bouquet x1</p>
                    <p>Name of bouquet x1</p>
                  </div>
                </div>
                <div>
                  <p className=" text-label">For:</p>
                  <p className="ml-8 mt-4 font-pt-sans font-bold text-headline-4">Receiver&apos;s Full Name</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleBackToHome}
              className={`text-medium-button font-semibold! payment-button mt-10 flex h-[61px] w-full items-center justify-center rounded-[27px] border-0 text-[18px] font-semibold text-white shadow-[0_2px_2px_rgba(61,59,59,0.2)] transition-colors duration-300 ease-out active:translate-y-[1px] ${isLeaving ? "bg-forest-300 opacity-80" : "bg-rose-300"}`}
            >
              Back To Home
            </button>
          </div>
        ) : (
          <form className="mx-auto w-full" onSubmit={handleSubmit}>
            <div className="rounded-[32px] bg-[rgba(255,250,254,0.01)] p-8 shadow-[0_4px_4px_rgba(61,59,59,0.2)]">
              <div className="space-y-6">
                <label className="block text-left">
                  <span className="mb-[3px] ml-[8px] text-label text-forest-300">
                    Card Number
                  </span>

                  <div className="flex h-[56px] items-center gap-2 rounded-[16px] border-[1.5px] border-forest-400 bg-rose-50 px-4 py-3 transition-colors hover:border-[#033438]">
                    <span className="flex h-8 w-8 items-center justify-center text-forest-300 ">{cardIcon}</span>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(event) => setCardNumber(formatCardNumber(event.target.value))}
                      className="h-full w-full bg-transparent text-[16px] text-forest-300 outline-none placeholder:text-silver-200"
                      placeholder="0000 0000 0000 0000"
                      inputMode="numeric"
                    />
                  </div>
                </label>

                <div className="grid grid-cols-2 gap-8">
                  <label className="block text-left">
                    <span className="mb-[3px] text-label text-forest-300">
                      Expiry Date
                    </span>

                    <input
                      type="text"
                      value={expiry}
                      onChange={(event) => setExpiry(formatExpiry(event.target.value))}
                      className="h-[56px] w-full rounded-[16px] border-[1.5px] border-forest-400 bg-rose-50 px-6 py-3 text-[16px] text-forest-300 outline-none placeholder:text-silver-200"
                      placeholder="MM/YY"
                      inputMode="numeric"
                    />
                  </label>

                  <label className="block text-left">
                    <span className="mb-[3px] text-label text-forest-300">
                      CVV
                    </span>

                    <input
                      type="text"
                      value={cvv}
                      onChange={(event) => setCvv(event.target.value.replace(/\D/g, "").slice(0, 3))}
                      className="h-[56px] w-full rounded-[16px] border-[1.5px] border-forest-400 bg-rose-50 px-6 py-3 text-[16px] text-forest-300 outline-none placeholder:text-silver-200"
                      placeholder="●●●"
                      maxLength={3}
                      inputMode="numeric"
                    />
                  </label>
                </div>

                <label className="flex cursor-pointer items-center gap-2 text-label text-forest-300">
                  <input
                    type="checkbox"
                    checked={savePayment}
                    onChange={(event) => setSavePayment(event.target.checked)}
                    className="sr-only"
                  />
                  <PaymentCheckbox checked={savePayment} />
                  <span>Save this payment method</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className={`text-medium-button font-semibold! mt-12 flex h-[61px] w-full items-center justify-center rounded-[27px] border-0 text-[18px] font-semibold shadow-[0_2px_2px_rgba(61,59,59,0.2)] transition-colors duration-300 ease-out active:translate-y-[1px] ${paymentState === "pressed" ? "bg-forest-300 text-rose-50" : "bg-rose-50 text-forest-300 hover:bg-forest-300/80 hover:text-rose-50"}`}
            >
              Pay Now
            </button>

            <div className="mt-12 text-center">
              <button
                type="button"
                className="mx-auto flex items-center justify-center gap-2 text-small font-normal text-silver-200 transition hover:text-forest-300"
              >
                <img src={back}></img>
                Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
