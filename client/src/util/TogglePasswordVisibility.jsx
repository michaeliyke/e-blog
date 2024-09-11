import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import PropTypes from "prop-types";

export default function TogglePasswordVisibility({ visible, setVisible }) {
  return (
    <div
      onClick={() => {
        setVisible(!visible);
      }}
    >
      {visible ? (
        <FaRegEyeSlash className="eye__icon" size={20} />
      ) : (
        <FaRegEye className="eye__icon" size={20} />
      )}
    </div>
  );
}

TogglePasswordVisibility.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};
