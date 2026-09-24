import { Outlet } from "react-router-dom";
import { ProfileSidebar } from "@/widgets/profile-sidebar/";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import grcenter from "@/shared/assets/gr_center_profile.png";
import grtopleft from "@/shared/assets/gr-topleft-profile.png";
import grbottomleft from "@/shared/assets/gr-bottomleft-profile.png";
import grtopright from "@/shared/assets/gr-topright-profile.png";
import grbottomright from "@/shared/assets/gr-bottomright-profile.png";

export const ProfileLayout = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between">
      <div className="absolute inset-0 z-[-1] pointer-events-none">
        <img src={grtopleft} alt="" className="absolute top-0 left-0" />
        <img src={grtopright} alt="" className="absolute top-0 right-0" />
        <img
          src={grcenter}
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <img src={grbottomleft} alt="" className="absolute bottom-0 left-0" />
        <img src={grbottomright} alt="" className="absolute bottom-0 right-0" />
      </div>

      <div>
        <Header />

        <div className="max-w-[1440px] mt-28 mx-auto px-10 xl:px-[160px] flex flex-col md:flex-row gap-8 py-10 relative z-10 items-start">
          <aside className="w-full md:w-[250px] shrink-0">
            <ProfileSidebar />
          </aside>

          <main className="w-[832px] flex rounded-[32px] bg-transparent justify-center p-6 pb-8 bg-white/20 backdrop-blur-[20px] [-webkit-backdrop-filter:blur(20px)] border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]">
            <Outlet />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};
