import FooterData from "./FooterData";
import { Link } from "react-router-dom";

const FooterLinks = () => {
  return FooterData.map((item, index) => {
    return (
      <div key={index} className="flex flex-col text-slate-700 dark:text-slate-300 whitespace-nowrap gap-2 laptop:gap-4">
        <h3 className="font-medium dark:text-white">{item.menu}</h3>
        <ul className="flex flex-col gap-2 laptop:gap-4">
          {item.submenu.map((submenu, index) => {
            return (
              <li key={index}>
                <Link to={submenu.url} className="text-small hover:text-violet-600 ">
                  {submenu.title}{" "}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  });
};

export default FooterLinks;
