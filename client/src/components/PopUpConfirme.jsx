import PropTypes from "prop-types";
import { request } from "../util/Tools";
import { useDispatch } from "react-redux";
import { removeItem } from "../state/appSlice/appSlice";
import { useNavigate } from "react-router-dom";

export const PopUpConfirme = ({
  visible,
  toggle,
  postId,
  redirectTo = null,
}) => {
  const url = `http://127.0.0.1:3000/blogs/${postId}`;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteAccount = async () => {
    // delete Post
    try {
      request.delete(url).then(toggleVisibility);
      if (redirectTo) {
        navigate(-1);
      } else {
        dispatch(removeItem(postId));
        toggle(!visible);
      }
    } catch (res) {
      console.log(res);
    }
  };

  const toggleVisibility = () => {
    toggle(!visible);
  };

  return (
    <>
      <div
        className={`bg-black opacity-40 top-0 left-0 w-full h-full fixed z-10 ${
          Boolean(visible) === true ? "opacity-30" : "hidden"
        }`}
        onClick={toggleVisibility}
      ></div>
      <div
        className={`w-80 h-30 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col justify-center items-center bg-gray-100 rounded-lg shadow-xl p-4 border border-gray-400
           transition-transform duration-500 ease-in-out z-20 ${
             Boolean(visible) === true
               ? "translate-y-0 opacity-100"
               : "-translate-y-96 opacity-0"
           }`}
      >
        <span className="text-center">
          <h5 className="text-[14px] font-poppins">Delete Post?</h5>
          <p className="text-[12px] text-gray-500">
            Are you sure you want to remove this post?
          </p>
        </span>
        <button
          onClick={handleDeleteAccount}
          className="mt-4 bg-red-700 hover:bg-red-800 active:bg-red-400 text-white px-4 py-2 rounded-md  focus:outline-none"
        >
          Delete Post
        </button>
      </div>
    </>
  );
};

PopUpConfirme.propTypes = {
  visible: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  redirectTo: PropTypes.string,
};
