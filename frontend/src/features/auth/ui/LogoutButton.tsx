import { useNavigate } from "react-router-dom";
import logout from "@/shared/assets/logout.svg";

export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    navigate("/login", { replace: true });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex items-center justify-center gap-1 w-[160px] h-[32px] rounded-[27px] border border-silver-200 bg-transparent text-silver-200 font-montserrat text-[12px]! cursor-pointer"
    >
      <img src={logout} className="w-4 h-4 shrink-0" />
      Log Out
    </button>
  );
};
