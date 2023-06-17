import { NavLink } from "react-router-dom";
import AsideData from "./AsideData";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminAuthStore from "../stores/AdminAuthStore";

export default function Aside() {
  const store = AdminAuthStore();

  return (
    <div className="flex flex-col gap-6 py-8 px-8 h-fit rounded-lg bg-slate-200 dark:bg-violet-800 backdrop-opacity-10 font-main text-small text-slate-700 dark:text-white top-0">
      {AsideData.map((item, index) => {
        return item.url ? (
          <NavLink
            key={index}
            to={`/dashboard/${item.url}`}
            className={` hover:text-violet-600 dark:hover:text-violet-100 
            }`}
          >
            {item.title}
          </NavLink>
        ) : (
          <NavLink
            className={`text-red-600 laptop:hover:text-red-500 `}
            to={item.url}
            onClick={store.logout}
          >
            {/* <LogoutIcon /> */}
            <span> {item.title} </span>
          </NavLink>
        );
      })}
    </div>
  );
}
