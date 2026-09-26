import { Outlet, useLocation } from "react-router-dom";
import { ProfileSidebar } from "@/widgets/profile-sidebar/";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import grcenter from "@/shared/assets/gr_center_profile.png";
import grtopleft from "@/shared/assets/gr-topleft-profile.png";
import grbottomleft from "@/shared/assets/gr-bottomleft-profile.png";
import grtopright from "@/shared/assets/gr-topright-profile.png";
import grbottomright from "@/shared/assets/gr-bottomright-profile.png";
import backgroundMain from "@/shared/assets/profile-purchases/background-main.svg";
import backgroundBottomLeft from "@/shared/assets/profile-purchases/background-bottom-left.svg";
import backgroundTopRight from "@/shared/assets/profile-purchases/background-top-right.svg";
import backgroundTopLeft from "@/shared/assets/profile-purchases/background-top-left.svg";
import backgroundBottomRight from "@/shared/assets/profile-purchases/background-bottom-right.svg";
import backgroundTablet from "@/shared/assets/profile-purchases/background-tablet.svg";
import backgroundMobile from "@/shared/assets/profile-purchases/background-mobile.svg";
import backToTop from "@/shared/assets/profile-purchases/back-to-top.svg";

const PurchasesBackground = () => (
  <div
    className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-rose-50"
    aria-hidden="true"
  >
    <div className="absolute inset-0 hidden lg:block">
      <div className="absolute left-[calc(54.17%-12.33px)] top-[167px] flex h-[1144.971px] w-[1147.339px] -translate-x-1/2 items-center justify-center">
        <div className="flex-none rotate-[-44.39deg]">
          <div className="relative h-[732px] w-[889px]">
            <div className="absolute inset-[-29.43%_-24.23%]">
              <img className="block size-full max-w-none" src={backgroundMain} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-[-155px] top-[954px] flex h-[617.491px] w-[632.057px] items-center justify-center">
        <div className="flex-none rotate-[-50.77deg]">
          <div className="relative h-[495.231px] w-[392.837px]">
            <div className="absolute inset-[-40.39%_-50.91%]">
              <img className="block size-full max-w-none" src={backgroundBottomLeft} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-[calc(75%-12px)] top-[-165px] flex h-[617.3px] w-[572.592px] items-center justify-center">
        <div className="flex-none rotate-[153.05deg]">
          <div className="relative h-[493.48px] w-[391.448px]">
            <div className="absolute inset-[-40.53%_-51.09%]">
              <img className="block size-full max-w-none" src={backgroundTopRight} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-[-310px] top-[124px] flex h-[480.176px] w-[473.548px] items-center justify-center">
        <div className="flex-none rotate-[-23.87deg]">
          <div className="relative h-[368px] w-[355px]">
            <div className="absolute inset-[-54.35%_-56.34%]">
              <img className="block size-full max-w-none" src={backgroundTopLeft} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-[calc(83.33%-82.22px)] top-[911.74px] flex h-[569.459px] w-[534.199px] items-center justify-center">
        <div className="flex-none rotate-[-150.49deg]">
          <div className="relative h-[451.59px] w-[358.219px]">
            <div className="absolute inset-[-44.29%_-55.83%]">
              <img className="block size-full max-w-none" src={backgroundBottomRight} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute left-1/2 top-[-114px] hidden h-[1396.974px] w-[1165.331px] -translate-x-1/2 md:block lg:hidden">
      <div className="absolute inset-[-11.87%_-10.4%_-11.05%_-12.47%]">
        <img className="block size-full max-w-none" src={backgroundTablet} alt="" />
      </div>
    </div>
    <div className="absolute left-1/2 top-[-146px] h-[1307.025px] w-[1090.297px] -translate-x-1/2 md:hidden">
      <div className="absolute inset-[-12.86%_-11.59%_-12.04%_-13.65%]">
        <img className="block size-full max-w-none" src={backgroundMobile} alt="" />
      </div>
    </div>
  </div>
);

const purchasesFooterClassName = [
  "relative z-10 w-full pt-6",
  "[&>footer]:!relative [&>footer]:!h-[290px] [&>footer]:!overflow-hidden [&>footer]:!px-0 [&>footer]:!py-0",
  "[&>footer>div]:!relative [&>footer>div]:!block [&>footer>div]:!h-full [&>footer>div]:!min-h-0 [&>footer>div]:!p-0",
  "[&>footer>div>div:first-child]:!contents [&>footer>div>div:last-child]:!contents",
  "[&>footer>div>div:first-child>div:first-child]:!absolute [&>footer>div>div:first-child>div:first-child]:!left-4 [&>footer>div>div:first-child>div:first-child]:!top-4 [&>footer>div>div:first-child>div:first-child]:!w-[calc(100%-32px)] [&>footer>div>div:first-child>div:first-child]:!max-w-[358px] [&>footer>div>div:first-child>div:first-child]:!gap-2",
  "[&>footer>div>div:first-child>div:first-child>div:first-child]:!mb-2",
  "[&>footer>div>div:first-child>div:last-child]:!absolute [&>footer>div>div:first-child>div:last-child]:!left-1/2 [&>footer>div>div:first-child>div:last-child]:!-translate-x-1/2 [&>footer>div>div:first-child>div:last-child]:!top-[241px] [&>footer>div>div:first-child>div:last-child]:!whitespace-nowrap [&>footer>div>div:first-child>div:last-child]:!text-[11px] [&>footer>div>div:first-child>div:last-child]:!leading-[11px]",
  "[&>footer>div>div:last-child>div:first-child]:!absolute [&>footer>div>div:last-child>div:first-child]:!left-1/2 [&>footer>div>div:last-child>div:first-child]:!-translate-x-1/2 [&>footer>div>div:last-child>div:first-child]:!top-[156px] [&>footer>div>div:last-child>div:first-child]:!w-[304px] [&>footer>div>div:last-child>div:first-child]:!justify-between [&>footer>div>div:last-child>div:first-child]:!gap-0",
  "[&>footer>div>div:last-child>div:last-child]:!absolute [&>footer>div>div:last-child>div:last-child]:!left-4 [&>footer>div>div:last-child>div:last-child]:!top-[212px] [&>footer>div>div:last-child>div:last-child]:!w-[calc(100%-32px)] [&>footer>div>div:last-child>div:last-child]:!max-w-[358px] [&>footer>div>div:last-child>div:last-child]:!justify-between [&>footer>div>div:last-child>div:last-child]:!gap-0 [&>footer>div>div:last-child>div:last-child]:!whitespace-nowrap [&>footer>div>div:last-child>div:last-child]:!text-[11px] [&>footer>div>div:last-child>div:last-child]:!leading-[11px]",
  "[&>footer>div>div:last-child>div:last-child>a:first-child]:!order-2 [&>footer>div>div:last-child>div:last-child>a:nth-child(2)]:!order-1 [&>footer>div>div:last-child>div:last-child>a:last-child]:!order-3",
  "md:pt-16 md:[&>footer]:!h-72 md:[&>footer>div]:!px-8 md:[&>footer>div]:!pt-6 md:[&>footer>div]:!pb-12",
  "md:[&>footer>div>div:first-child>div:first-child>div:first-child]:!mb-0",
  "md:[&>footer>div>div:first-child>div:first-child]:!left-8 md:[&>footer>div>div:first-child>div:first-child]:!top-6 md:[&>footer>div>div:first-child>div:first-child]:!w-80",
  "md:[&>footer>div>div:first-child>div:last-child]:!left-8 md:[&>footer>div>div:first-child>div:last-child]:!translate-x-0 md:[&>footer>div>div:first-child>div:last-child]:!top-[218px]",
  "md:[&>footer>div>div:last-child>div:first-child]:!left-auto md:[&>footer>div>div:last-child>div:first-child]:!translate-x-0 md:[&>footer>div>div:last-child>div:first-child]:!right-8 md:[&>footer>div>div:last-child>div:first-child]:!top-[100px] md:[&>footer>div>div:last-child>div:first-child]:!w-[224px] md:[&>footer>div>div:last-child>div:first-child]:!gap-4",
  "md:[&>footer>div>div:last-child>div:last-child]:!left-auto md:[&>footer>div>div:last-child>div:last-child]:!right-8 md:[&>footer>div>div:last-child>div:last-child]:!top-[218px] md:[&>footer>div>div:last-child>div:last-child]:!w-[289px]",
  "md:[&>footer>div>div:last-child>div:last-child>a:first-child]:!order-1 md:[&>footer>div>div:last-child>div:last-child>a:nth-child(2)]:!order-2 md:[&>footer>div>div:last-child>div:last-child>a:last-child]:!order-3",
  "lg:pt-24 lg:[&>footer>div]:!px-[160px] lg:[&>footer>div]:!pt-8",
  "lg:[&>footer>div>div:first-child>div:first-child]:!left-[160px] lg:[&>footer>div>div:first-child>div:first-child]:!top-8",
  "lg:[&>footer>div>div:first-child>div:last-child]:!left-[160px]",
  "lg:[&>footer>div>div:last-child>div:first-child]:!right-[160px] lg:[&>footer>div>div:last-child>div:first-child]:!top-[128px]",
  "lg:[&>footer>div>div:last-child>div:last-child]:!right-[160px] lg:[&>footer>div>div:last-child>div:last-child]:!top-[218px]",
].join(" ");

export const ProfileLayout = () => {
  const { pathname } = useLocation();
  const isPurchasesPage = pathname.includes("purchases");

  return (
    <div
      className={`relative flex min-h-screen w-full flex-col justify-between overflow-x-hidden ${
        isPurchasesPage ? "bg-rose-50" : ""
      }`}
    >
      {isPurchasesPage ? (
        <PurchasesBackground />
      ) : (
        <div className="pointer-events-none absolute inset-0 z-[-1]">
          <img src={grtopleft} alt="" className="absolute left-0 top-0" />
          <img src={grtopright} alt="" className="absolute right-0 top-0" />
          <img
            src={grcenter}
            alt=""
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
          <img src={grbottomleft} alt="" className="absolute bottom-0 left-0" />
          <img src={grbottomright} alt="" className="absolute bottom-0 right-0" />
        </div>
      )}

      <div
        className={
          isPurchasesPage
            ? "relative z-10 w-full [&>header]:left-4 [&>header]:right-4 [&>header]:top-6 [&>header]:w-[calc(100%-32px)] [&>header]:px-2 [&>header>div:first-child>img]:h-8 [&>header>div:first-child>img]:w-24 [&>header>div:last-child]:gap-6 md:[&>header]:left-8 md:[&>header]:right-8 md:[&>header]:top-6 md:[&>header]:h-16 md:[&>header]:w-[calc(100%-64px)] md:[&>header]:px-8 md:[&>header>div:first-child>img]:h-12 md:[&>header>div:first-child>img]:w-36 lg:[&>header]:left-16 lg:[&>header]:right-16 lg:[&>header]:top-8 lg:[&>header]:h-16 lg:[&>header]:w-[calc(100%-128px)] lg:[&>header]:px-8"
            : undefined
        }
      >
        <Header />

        <div
          className={
            isPurchasesPage
              ? "mx-auto flex w-full max-w-96 flex-col items-center justify-start gap-6 px-0 pt-20 pb-0 md:max-w-[744px] md:px-8 md:pt-28 lg:max-w-[1122px] lg:flex-row lg:items-start lg:gap-8 lg:px-0 lg:pt-36"
              : "relative z-10 mx-auto mt-20 flex w-full max-w-[1440px] flex-col items-center gap-6 px-4 py-4 md:mt-[88px] md:px-8 md:py-6 lg:mt-28 lg:flex-row lg:items-start lg:gap-8 lg:px-[160px] lg:py-10"
          }
        >
          <aside
            className={
              isPurchasesPage
                ? "hidden w-64 shrink-0 lg:block [&_a[aria-current=page]]:!font-normal [&_a[aria-current=page]]:!text-forest-300 [&_a[aria-current=page]]:!underline"
                : "hidden w-64 shrink-0 lg:block"
            }
          >
            <ProfileSidebar />
          </aside>

          <main
            className={
              isPurchasesPage
                ? "flex min-h-[720px] w-full max-w-96 flex-col items-center justify-start gap-4 rounded-[32px] bg-zinc-300/0 px-1 py-8 shadow-[0px_4px_4px_0px_rgba(61,59,59,0.20)] backdrop-blur-[20px] md:min-h-[747px] md:max-w-[680px] md:gap-6 md:px-6 md:py-8 lg:min-h-[931px] lg:max-w-[832px] lg:items-start lg:px-12 lg:py-8"
                : "flex w-full max-w-[832px] flex-col items-center justify-center rounded-[32px] border border-white/20 bg-white/20 p-4 pb-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] backdrop-blur-[20px] md:p-6"
            }
          >
            <Outlet />
          </main>
        </div>
      </div>

      <div className={isPurchasesPage ? purchasesFooterClassName : undefined}>
        <Footer />
      </div>

      {isPurchasesPage && (
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-4 z-40 size-8 cursor-pointer md:right-8 md:size-12 lg:right-24"
        >
          <img src={backToTop} alt="" className="block size-full" />
        </button>
      )}
    </div>
  );
};