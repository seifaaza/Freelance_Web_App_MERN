import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const SwitchMode = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Link className="cursor-pointer p-2 py-3" onClick={handleThemeSwitch}>
      {" "}
      <span className="mr-1 laptop:hidden">Thème </span>
      {theme === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
    </Link>
  );
};

export default SwitchMode;
