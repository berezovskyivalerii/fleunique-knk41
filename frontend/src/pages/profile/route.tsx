import { Navigate } from "react-router-dom";
import { ProfileLayout } from "./ui/ProfileLayout";
import { RecentPurchases } from "./ui/RecentPurchases";
import { ProfileSettings } from "./ui/ProfileSettings";

export const route = {
  path: "/profile",
  element: <ProfileLayout />,
  children: [
    {
      index: true,
      element: <Navigate to="purchases" replace />,
    },
    {
      path: "purchases",
      element: <RecentPurchases />,
    },
    {
      path: "settings",
      element: <ProfileSettings />,
    },
  ],
};
