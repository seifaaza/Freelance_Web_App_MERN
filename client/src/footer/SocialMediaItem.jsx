import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const SocialMediaItem = (props) => {
  return (
    <Link className="hover:text-orange-500 " to={props.url} target={"_blank"}>
      {props.icon}
    </Link>
  );
};

SocialMediaItem.propTypes = {
  icon: PropTypes.string,
  url: PropTypes.string,
};

export default SocialMediaItem;
