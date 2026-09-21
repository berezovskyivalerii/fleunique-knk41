import { NavLink } from "react-router-dom";
import { LogoutButton } from "@/features/auth";
import clockIcon from "@/shared/assets/recent_purchases.svg";
import settingsIcon from "@/shared/assets/profile_settings.svg";

export const ProfileSidebar = () => {
  return (
    <div className="flex flex-col gap-8">
      <nav className="flex flex-col gap-4 font-montserrat text-[13px]">
        <NavLink
          to="/profile/purchases"
          className={({ isActive }) =>
            `flex items-center gap-2 ${
              isActive
                ? "text-forest-400 font-bold"
                : "text-[#808080] hover:underline underline-offset-2"
            }`
          }
        >
          <img src={clockIcon} className="w-6 h-6" />
          Recent Purchases
        </NavLink>

        <NavLink
          to="/profile/settings"
          className={({ isActive }) =>
            `flex items-center gap-2 ${
              isActive
                ? "text-forest-400 font-bold"
                : "text-[#808080] hover:underline underline-offset-2"
            }`
          }
        >
          <img src={settingsIcon} className="w-6 h-6" />
          Profile Settings
        </NavLink>
      </nav>

      <div>
        <LogoutButton />
      </div>
    </div>
  );
};
