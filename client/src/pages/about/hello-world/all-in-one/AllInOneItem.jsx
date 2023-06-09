import PropTypes from "prop-types";

const AllInOneItem = (props) => {
  return (
    <div className=" flex flex-col gap-5 items-center justify-start max-w-md tablet:px-5 tablet:max-w-xs laptop:w-1/4 laptop:px-0">
       <img
        src={`/assets/svg/icons/${props.icon}.svg`}
        alt={`${props.title} Icon`}
        className="w-16 h-fit tablet:w-20 laptop:w-24 "
      />
      <div className="flex flex-col gap-2 text-center font-main text-slate-700 tablet:gap-3">
        <h4 className="font-medium text-xl dark:text-white">{props.title}</h4>
        <p className="text-small dark:text-slate-300">{props.content}</p>
      </div>
    </div>
  );
};

AllInOneItem.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
};

export default AllInOneItem;
