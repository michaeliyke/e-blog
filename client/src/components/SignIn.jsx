import PropTypes from "prop-types";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export const SignIn = ({ displayed, setDisplayed }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handlePopUp = (signin = false, signup = false) => {
    setDisplayed({ signin, signup });
  };
  return (
    <>
      <div
        className={`popup__container fixed bg-black w-full h-full transition-all duration-500 ease-in-out ${
          displayed ? "opacity-60" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          handlePopUp();
        }}
      ></div>
      <div
        className={`text-white fixed w-[90%] sm:w-[500px] h-auto  shadow-sm shadow-white  bg-[#2b2738] flex flex-col items-center popup
              rounded-md p-9 z-10
              ${displayed ? "" : "hide__popup"}`}
      >
        <h3 className="font-bold text-3xl mb-5 text-white ">Sign In</h3>
        <p className="text-center underline underline-offset-[4px] font-pompiere text-[22px]  mb-7 font-medium text-gray-300">
          Welcome to e-Blog <br /> Your blogging platform
        </p>
        <form className="form__container mt-5 w-full px-9">
          <div className="w-full mb-3">
            <input
              type="email"
              placeholder="Email"
              className="input__box w-full"
            />
          </div>
          <div className="relative flex items-center mb-3">
            <input
              className="input__box w-full"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
            />
            <div
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <FaRegEyeSlash className="eye__icon" size={20} />
              ) : (
                <FaRegEye className="eye__icon" size={20} />
              )}
            </div>
          </div>

          <div className="flex flex-col h-full">
            <div className="flex items-center mb-4">
              <input type="checkbox" name="" id="" className="" />

              <span className="text-[15px] text-white">Remembre me</span>
            </div>
            <button className="mb-2 mt-6 border border-black w-full h-10 text-white rounded-sm bg-[#6e54b5]">
              Sign In
            </button>
          </div>
        </form>
        <span className="text-sm text-center">
          You don&apos;t have an account:{" "}
          <button
            onClick={() => {
              handlePopUp(false, true);
            }}
            className="my-3 underline underline-offset-2 text-[16px] text-sky-300"
          >
            Register
          </button>
        </span>
        <div className="w-full flex items-center">
          <hr className="w-full mx-5" />
          <h2 className="text-lg font-medium">or</h2>
          <hr className="w-full mx-5" />
        </div>
        <div className="flex w-full justify-evenly items-center my-3">
          <div className="oath__buttons github__btn cursor-pointer">
            <FaGithub size={25} />
            <p className="ml-2 text-[16px] font-poppins font-medium">Github</p>
          </div>
          <div className="oath__buttons google__btn cursor-pointer">
            <FcGoogle size={25} />
            <p className="ml-2 text-[16px] font-poppins font-medium">Google</p>
          </div>
        </div>
      </div>
    </>
  );
};

SignIn.propTypes = {
  displayed: PropTypes.bool.isRequired, // Expecting displayed to be a boolean and required
  setDisplayed: PropTypes.func.isRequired,
};
