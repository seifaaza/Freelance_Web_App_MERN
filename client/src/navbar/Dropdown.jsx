import PropTypes from "prop-types";
import MenuItems from "./MenuItems";
const Dropdown = ({ submenus, dropdown }) => {
  return (
    <ul
      className={`bg-white bg-opacity-10 laptop:bg-opacity-50 backdrop-blur-lg text-white laptop:text-slate-700 dark:text-white  dark:bg-opacity-5  flex flex-col items-center laptop:items-start dropdown ${
        dropdown ? "show transition duration-200" : ""
      } `}
    >
      {submenus.map((submenu, index) => (
        <MenuItems items={submenu} key={index}/>
      ))}
    </ul>
  );
};

Dropdown.propTypes = {
  submenus: PropTypes.array,
  dropdown: PropTypes.func,
  NavClose: PropTypes.string,
};

export default Dropdown;
