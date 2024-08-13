import { useLocation } from "react-router-dom";

export const useCanLogout = () => {
  const location = useLocation();
  const canLogout =
    location.pathname.includes("list") || location.pathname.includes("profile");
  return canLogout;
};
