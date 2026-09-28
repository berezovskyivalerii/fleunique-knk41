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

export const ProfileLayout = () => {
  const { pathname } = useLocation();
  const isPurchasesPage = pathname.includes("purchases");

  return (
    <div
      className={`relative flex min-h-screen w-full flex-col justify-between overflow-x-hidden ${isPurchasesPage ? "bg-rose-50" : ""
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
      <div>
        <Header />

        <div className="max-w-[1440px] mt-28 mx-auto px-4 md:px-10 flex flex-col md:flex-row gap-8 lg:py-10 relative z-10 items-start justify-center">
          <aside className="hidden lg:block w-full md:w-[250px] shrink-0">
            <ProfileSidebar />
          </aside>

          <main className="w-full md:w-[680px] lg:w-[832px] flex flex-col lg:items-center rounded-[32px] bg-transparent justify-center px-1 pt-6 md:p-6 pb-8 bg-white/20 backdrop-blur-[20px] [-webkit-backdrop-filter:blur(20px)] border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]">
            <Outlet />
          </main>
        </div>
      </div>
      <div className="relative z-10 w-full">
        <Footer />
      </div>

    </div>
  );
};