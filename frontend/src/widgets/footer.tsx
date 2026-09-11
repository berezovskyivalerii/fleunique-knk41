import logo from "@/shared/assets/logo.svg";
import phone from "@/shared/assets/phone_for_footer.png";
import email from "@/shared/assets/email_for_footer.png";
import insta from "@/shared/assets/insta_for_footer.png";
import facebook from "@/shared/assets/facebook_for_footer.png";
import location from "@/shared/assets/location_footer.png";

export function Footer() {
  return (
    <footer className="w-full bg-[#04191D] py-12">
      <div className="w-full mx-auto px-10 xl:px-[160px] flex flex-col md:flex-row justify-between items-start md:items-end min-h-[200px]">
        <div className="flex flex-col justify-between h-full gap-16">
          <div>
            <div className="logo_in_footer mb-2">
              <img src={logo} alt="logo" />
            </div>
            <div className="text-[#FFFAFE] max-w-[352px] font-montserrat font-normal text-[16px] leading-none tracking-normal text-justify">
              <p>
                Fleunique crafts bold, artistic, playful bouquets for truly
                unique people. Our vivid floral charm brightens any gloomy day.
              </p>
            </div>
          </div>{" "}
          <div className="text-[#BFBFBF] text-[11px] font-montserrat">
            <p>©2026, IT STEP COLLEGE TEAM</p>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end h-full gap-12 mt-10 md:mt-0">
          <div className="flex gap-4">
            <button>
              <img src={phone} alt="phone" />
            </button>
            <button>
              <img src={email} alt="email" />
            </button>
            <button>
              <img src={insta} alt="instagram" />
            </button>
            <button>
              <img src={facebook} alt="facebook" />
            </button>
            <button>
              <img src={location} alt="location" />
            </button>
          </div>

          <div className="text-[#BFBFBF] flex gap-4 text-[11px] font-montserrat">
            <a
              href="#"
              className="hover:text-white cursor-pointer transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-white cursor-pointer transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-white cursor-pointer transition-colors"
            >
              Cookies Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
