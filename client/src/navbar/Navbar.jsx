import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { navData } from "./navData";
import MenuItems from "./MenuItems";
import SwitchMode from "./SwitchMode";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import authStore from "../stores/AuthStore";
import userStore from "../stores/UserStore";

export default function Navbar() {
  const loggedStore = authStore();
  const store = userStore();

  const [navOpen, setNavOpen] = useState(false);

  function NavClose(NavEvent) {
    setNavOpen(NavEvent);
  }

  useEffect(() => {
    navOpen
      ? document.body.classList.add("overflow-y-hidden")
      : document.body.classList.remove("overflow-y-hidden");
  });

  const ScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const [scrolling, setScrolling] = useState(false);
  const scroll = () => {
    window.scrollY > 5 ? setScrolling(true) : setScrolling(false);
  };
  window.addEventListener("scroll", scroll);

  return (
    <nav
      className={`${
        scrolling ? " bg-opacity-80 tablet:py-1" : " "
      }  py-0  bg-violet-700 text-white fixed px-4 font-main w-full z-50 duration-200 `}
    >
      <div className="main-container flex flex-col flex-wrap laptop:items-center laptop:flex-row justify-between py-2 laptop:py-0">
        <div className="flex justify-between">
          <Link
            to={loggedStore.loggedIn ? "/profile" : "/"}
            onClick={ScrollToTop}
          >
            {loggedStore.loggedIn ? (
              <Avatar
                alt={`${store.user && store.user.fullName} photo`}
                src={
                  store.user && store.user.image == "avatar"
                    ? `/assets/images/default-avatar.svg`
                    : `http://localhost:3000/uploads/${
                        store.user && store.user.image
                      }`
                }
                className="border-2"
              />
            ) : (
              <img
                src="/assets/svg/logo/logo.svg"
                alt=""
                className="h-10 selection:bg-transparent"
                onClick={() => {
                  setNavOpen(false);
                  document.body.classList.remove("fixed");
                }}
              />
            )}
          </Link>
          <div
            className={`cursor-pointer nav-icon ${
              navOpen ? "nav-open" : ""
            } selection:bg-transparent`}
            onClick={() => {
              setNavOpen(!navOpen);
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div
          className={`flex flex-col justify-start  transition-all ${
            navOpen ? "h-screen pt-10 duration-500" : "h-0 transition-none"
          } laptop:h-fit laptop:p-0 laptop:transition-none`}
        >
          <ul className="overflow-scroll remove-scrollbar laptop:overflow-visible laptop:max-h-fit flex flex-col laptop:flex-row gap-8 laptop:p-0 laptop:w-fit justify-between items-center text-start whitespace-nowrap text-xl laptop:text-sm font-medium hover-container">
            {navData.map((menu, index) => {
              return <MenuItems NavClose={NavClose} items={menu} key={index} />;
            })}
            <SwitchMode />
          </ul>
        </div>
      </div>
    </nav>
  );
}

MenuItems.propTypes = {
  NavClose: PropTypes.func,
};
