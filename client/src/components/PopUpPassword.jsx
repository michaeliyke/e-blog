import PropTypes from "prop-types";
import { useState } from "react";
import { RiAdminFill } from "react-icons/ri";
import { request } from "../util/Tools";
import { useDispatch } from "react-redux";
import { clearUser } from "../state/AuthSlice/AuthSlice";
import { useNavigate } from "react-router-dom";

export const PopUpPassword = ({ visible, toggle }) => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = "http://127.0.0.1:3000/users/profile";

  const handleDeleteAccount = async () => {
    // delete account
    const response = await request.delete(url, {
      data: {
        password,
      },
    });
    if (response.status === 200) {
      dispatch(clearUser());
      navigate("/");
    }
  };

  const toggleVisibility = () => {
    toggle(!visible);
    setPassword("");
  };

  return (
    <>
      <div
        className={`bg-black z-20 opacity-40 top-0 w-full h-full fixed border-2 border-black ${
          Boolean(visible) === true ? "opacity-40" : "hidden"
        }`}
        onClick={toggleVisibility}
      ></div>
      <div
        className={`w-80 h-30 z-30 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col justify-center items-center bg-gray-100 rounded-lg shadow-xl p-4 border border-gray-400
           transition-transform duration-500 ease-in-out ${
             Boolean(visible) === true
               ? "translate-y-50 opacity-100"
               : "-translate-y-96 opacity-0"
           }`}
      >
        <span>
          <h5 className="text-[14px] font-poppins">
            Enter password to delete your account
          </h5>
          <span
            className="flex gap-1 border border-black w-[80%] mx-auto my-4 rounded-full px-2 py-1
        bg-white"
          >
            <RiAdminFill size={25} />
            <input
              placeholder="Enter your password"
              type="password"
              className="bg-transparent outline-none w-[80%]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </span>
        </span>
        <button
          onClick={handleDeleteAccount}
          className=" bg-red-700 hover:bg-red-800 active:bg-red-400 text-white px-4 py-2 rounded-md  focus:outline-none"
        >
          Delete account
        </button>
      </div>
    </>
  );
};

PopUpPassword.propTypes = {
  visible: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};
