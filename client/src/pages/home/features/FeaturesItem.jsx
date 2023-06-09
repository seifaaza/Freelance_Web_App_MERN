import PropTypes from 'prop-types';

const FeaturesItem = (props) => {
  return (
    <div
      className={`border ${props.borderColor} flex gap-5 justify-start items-center p-2 tablet:p-3 tablet:gap-2 rounded-xl `}
      data-aos="zoom-in"
      data-aos-delay={props.delay}
    >
      <img
        alt={`${props.icon} icon`}
        src={`/assets/svg/icons/${props.icon}.svg`}
        className="w-16 h-fit dark:opacity-80"
      />
      <div className="flex flex-col gap-1 text-slate-700 ">
        <h1 className={`${props.textColor} dark:text-white text-small-heading font-medium`}>{props.title}</h1>
        <p className="text-small dark:text-slate-300 ">
          {props.description}
        </p>
      </div>
    </div>
  );
};

export default FeaturesItem;

FeaturesItem.propTypes = {
  borderColor: PropTypes.string,
  delay: PropTypes.number,
  icon: PropTypes.string,
  textColor: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};