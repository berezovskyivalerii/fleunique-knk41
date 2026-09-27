import logo from "@/shared/assets/logo.svg";
import phone from "@/shared/assets/phone_for_footer.png";
import email from "@/shared/assets/email_for_footer.png";
import insta from "@/shared/assets/insta_for_footer.png";
import facebook from "@/shared/assets/facebook_for_footer.png";
import location from "@/shared/assets/location_footer.png";

export function Footer() {
  return (
    <footer className="w-full bg-forest-400 pt-4 pb-9 md:pt-6 md:pb-12 lg:pt-8 px-4 md:px-8 lg:px-[160px] flex flex-col items-start gap-6 md:gap-[86px] lg:gap-[80px]">
      <div className="flex flex-col justify-between h-auto gap-6 md:flex-row md:justify-between md:items-end md:w-full">
        <div>
          <img src={logo} alt="logo" className="logo_in_footer mb-2 md:mb-0" />
          <p className="text-rose-50 md:max-w-[352px] font-montserrat font-normal text-[16px] leading-none tracking-normal text-justify">
            Fleunique crafts bold, artistic, playful bouquets for truly unique
            people. Our vivid floral charm brightens any gloomy day.
          </p>
        </div>

        <div className="flex justify-between md:justify-start md:gap-4">
          <button>
            <img src={phone} alt="phone" />
          </button>
          <button>
            <img src={email} alt="email" />
          </button>
          <button>
            <img src={facebook} alt="facebook" />
          </button>
          <button>
            <img src={insta} alt="instagram" />
          </button>
          <button>
            <img src={location} alt="location" />
          </button>
        </div>
      </div>

      <div className="flex flex-col-reverse items-center h-full gap-4 w-full md:flex-row md:justify-between w-full">
        <p className="text-silver-100 text-helper font-montserrat">
          ©2026, IT STEP COLLEGE TEAM
        </p>
        <div className="text-silver-100 text-helper w-full md:w-auto flex justify-between md:gap-4 md:justify-start font-montserrat">
          <a
            href="#"
            className="hover:underline underline-offset-3 cursor-pointer transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="hover:underline underline-offset-3 cursor-pointer transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:underline underline-offset-3 cursor-pointer transition-colors"
          >
            Cookies Settings
          </a>
        </div>
      </div>
    </footer>
  );
}
