import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import Dropdown from "./Dropdown";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Login from "../modals/account/Login";
import SignUp from "../modals/account/SignUp";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import authStore from "../stores/AuthStore";

export default function MenuItems({ items }) {
  const [dropdown, setDropdown] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [signSwitch, setSignSwitch] = useState("");

  const store = authStore();

  let ref = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (dropdown && ref.current && !ref.current.contains(event.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown, modalOpen]);

  const onMouseEnter = () => {
    setDropdown(true);
  };
  const onMouseLeave = () => {
    setDropdown(false);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const SignSwitch = (SignEvent) => {
    setSignSwitch(SignEvent);
  };

  const ModalOpen = (SignEvent) => {
    setModalOpen(SignEvent);
  };

  return (
    <>
      <li
        className="relative px-2  flex flex-col"
        ref={null}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {!items.url && items.submenu ? (
          <>
            <button
              className=" py-4 px-4 rounded-lg "
              type="button"
              aria-haspopup="menu"
              aria-expanded={dropdown ? "true" : "false"}
              onClick={() => {
                setDropdown(!dropdown);
              }}
            >
              <NavLink to={items.url}>
                {items.title}
                <KeyboardArrowDownIcon
                  style={{ transition: "200ms" }}
                  className={` ${dropdown ? "rotate-180" : null} `}
                />
              </NavLink>
            </button>
            <Dropdown submenus={items.submenu} dropdown={dropdown} />
          </>
        ) : !items.url && items.path === "signUp" ? (
          <NavLink
            className={`laptop:hover:text-violet-600 py-2 w-fit px-2 rounded-md flex gap-3 items-center `}
            to={items.url}
            onClick={() => {
              setModalOpen(true);
              setSignSwitch(items.path);
            }}
          >
            <PersonAddIcon />
            <span> {items.title} </span>
          </NavLink>
        ) : !items.url && items.path === "login" ? (
          <NavLink
            className={`laptop:hover:text-violet-600 py-2 w-fit px-2 rounded-md flex gap-3 items-center `}
            to={items.url}
            onClick={() => {
              setModalOpen(true);
              setSignSwitch(items.path);
            }}
          >
            <LoginIcon />
            <span> {items.title} </span>
          </NavLink>
        ) : items.url && items.path === "my-bag" ? (
          <NavLink
            className={`laptop:hover:text-violet-600 py-2 w-fit px-2 rounded-md flex gap-3 items-center `}
            to={items.url}
          >
            <ShoppingBagIcon />
            <span> {items.title} </span>
          </NavLink>
        ) : !items.url && items.path === "logout" ? (
          <NavLink
            className={`text-red-600 laptop:hover:text-red-500 py-2 w-fit px-2 rounded-md flex gap-3 items-center `}
            to={items.url}
            onClick={store.logout}
          >
            <LogoutIcon />
            <span> {items.title} </span>
          </NavLink>
        ) : items.url && items.url === "/community" ? (
          <NavLink
            className={` py-2 w-fit px-2 rounded-md flex gap-3 items-center `}
            to={items.url}
          >
            <span> {items.title} </span>
          </NavLink>
        ) : (
          <NavLink
            className={`laptop:hover:text-violet-600 py-2 w-fit px-2 rounded-md flex gap-3 items-center `}
            to={items.url}
          >
            <span> {items.title} </span>
          </NavLink>
        )}
      </li>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{ bgcolor: "white" }}
          className="p-4 tablet:p-6 laptop:p-8 desktop:p-10 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 dark:bg-slate-900 bg-opacity-50 backdrop-blur-lg rounded-lg"
        >
          {signSwitch === "signUp" ? (
            <SignUp SignSwitch={SignSwitch} ModalOpen={ModalOpen} />
          ) : signSwitch === "login" ? (
            <Login SignSwitch={SignSwitch} ModalOpen={ModalOpen} />
          ) : null}
        </Box>
      </Modal>
    </>
  );
}

MenuItems.propTypes = {
  items: PropTypes.object,
};
