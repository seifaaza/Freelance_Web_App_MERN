import { NavLink } from "react-router-dom";
import AsideData from "./AsideData";

export default function Aside() {
  return (
    <div className="flex flex-col gap-6 py-8 px-8 h-fit rounded-lg bg-violet-100 dark:bg-violet-800 backdrop-opacity-10 font-main text-small text-slate-700 dark:text-white top-0">
      {AsideData.map((item, index) => {
        return (
          <NavLink
            key={index}
            to={`/dashboard/${item.url}`}
            className={` hover:text-violet-600 dark:hover:text-violet-100 
            }`}
          >
            {item.title}
          </NavLink>
        );
      })}
    </div>
  );
}
