import logo from "../../assets/logo.svg";

import phone from "../../assets/phone_for_footer.png";
import email from "../../assets/email_for_footer.png";
import insta from "../../assets/insta_for_footer.png";
import facebook from "../../assets/facebook_for_footer.png";

import "../app/styles/footer.css";

export function Footer(){
  return (
    <footer>
      <div id="left_part">
        <div id="text_and_logo_in_footer">
          <div id="logo_in_footer">
            <img src={logo} alt="logo" />
          </div>
          <div id="text_in_footer">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        </div>
        <div id="info_in_footer">
          <p>©2026, IT STEP COLLEGE TEAM</p>
        </div>
      </div>

      <div id="right_part">
        <div id="social_links">
          <button className="btn_social_links"><img src={phone}/></button>
          <button className="btn_social_links"><img src={email}/></button>
          <button className="btn_social_links"><img src={insta}/></button>
          <button className="btn_social_links"><img src={facebook}/></button>
        </div>
        <div id="legal_links">
            <a>Terms of Service</a>
            <a>Privacy Policy</a>
            <a>Cookies Settings</a>
        </div>
      </div>
    </footer>
  );
}