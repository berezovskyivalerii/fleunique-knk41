import logo from "../../assets/logo.svg";

import phone from "../../assets/phone_for_footer.png";
import email from "../../assets/email_for_footer.png";
import insta from "../../assets/insta_for_footer.png";
import facebook from "../../assets/facebook_for_footer.png";
import location from "../../assets/location_footer.png";

export function Footer(){
  return (
    <footer className="flex justify-between items-center bg-[#04191D] w-full h-[279px] px-[160px] py-8">
      <div className="left_part">
        <div className="mb-[57px]">
          <div className="logo_in_footer">
            <img src={logo} alt="logo" />
          </div>
          <div className="text-[#FFFAFE] w-[352px] text-base">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
        <div className="text-[#BFBFBF] text-[11px]">
          <p>©2026, IT STEP COLLEGE TEAM</p>
        </div>
      </div>

      <div className="right_part">
        <div className="ml-[180px] mb-[57px] flex">
          <button className="mr-4"><img src={phone}/></button>
          <button className="mr-4"><img src={email}/></button>
          <button className="mr-4"><img src={insta}/></button>
          <button className="mr-4"><img src={facebook}/></button>
          <button className="mr-4"><img src={location}/></button>
        </div>
        <div className="text-[#BFBFBF] ml-[148px] -mb-[90px] flex">
            <a className="mr-4 text-[11px]">Terms of Service</a>
            <a className="mr-4 text-[11px]">Privacy Policy</a>
            <a className="mr-4 text-[11px]">Cookies Settings</a>
        </div>
      </div>
    </footer>
  );
}