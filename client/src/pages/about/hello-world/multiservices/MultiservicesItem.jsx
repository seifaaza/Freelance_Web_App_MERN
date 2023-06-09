import PropTypes from "prop-types";

const MultiservicesItem = (props) => {
  return (
    <div className="w-fit flex gap-5  tablet:px-5 laptop:px-0">
        <img
        src={`/assets/svg/icons/${props.icon}.svg`}
        alt={`${props.title} Icon`}
        className="w-16 h-fit self-center"
      />
      <div className="flex flex-col gap-2 text-start font-main text-slate-700 tablet:gap-3">
        <h4 className="font-medium text-xl dark:text-white">{props.title}</h4>
        <p className="text-small dark:text-slate-300">{props.content}</p>
      </div>
    </div>
  );
};

MultiservicesItem.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
};

export default MultiservicesItem;
