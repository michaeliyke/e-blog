import PropTypes from "prop-types";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import TogglePasswordVisibility from "../util/TogglePasswordVisibility";

export const SignUp = ({ visible, setVisible }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    repeatedPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // e.preventDefault();
    console.log(formData);
  };

  const handlePopUp = (signin = false, signup = false) => {
    setVisible({ signin, signup });
  };
  return (
    <>
      <div
        className={`popup__container fixed bg-black w-full h-full transition-all duration-500 ease-in-out ${
          visible ? "opacity-60" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          handlePopUp();
        }}
      ></div>
      <div
        className={`text-white fixed w-[90%] sm:w-[500px] h-auto  shadow-sm shadow-white  bg-[#2b2738] flex flex-col items-center popup
          rounded-md p-9 z-10
          ${visible ? "" : "hide__popup"}`}
      >
        <h3 className="font-bold text-3xl mb-5 text-white ">
          Create an account
        </h3>
        <p className="text-center underline underline-offset-[4px] font-pompiere text-[22px]  mb-7 font-medium text-gray-300">
          Welcome to e-Blog <br /> Where ideas Find words
        </p>
        <form className="flex flex-col gap-4 form__container mt-5">
          <div className="name__section flex gap-3 flex-col sm:flex-row">
            <input
              className="input__box"
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="First name"
            />
            <input
              className="input__box"
              type="text"
              name="lastname"
              placeholder="Last name"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
          <input
            className="input__box"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <div className="password__section flex gap-3">
            <span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <TogglePasswordVisibility
                visible={showPassword}
                setVisible={setShowPassword}
              />
            </span>
            <span>
              <input
                type={showPassword ? "text" : "password"}
                name="repeatedPassword"
                placeholder="Password"
                value={formData.repeatedPassword}
                onChange={handleChange}
              />
              <TogglePasswordVisibility
                visible={showPassword}
                setVisible={setShowPassword}
              />
            </span>
          </div>
          <div className="flex flex-col h-full px-2">
            {/* <span className="flex items-center">
              <input type="checkbox" name="" id="" className="" />
              <p>Show password</p>
            </span> */}
            <div className="flex items-center mb-4">
              <input type="checkbox" name="" id="" className="" />

              <span className="text-[15px] text-white">
                {" "}
                I agree to the{" "}
                <a href="#" className="underline text-sky-300">
                  Terms & Conditions
                </a>
              </span>
            </div>
            <button
              onClick={handleSubmit}
              className="mb-2 mt-6 border border-black w-full h-10 text-white rounded-sm bg-[#6e54b5]"
            >
              Create account
            </button>
          </div>
        </form>
        <span className="text-sm text-center">
          Already have an account:{" "}
          <button
            onClick={() => {
              handlePopUp(true, false);
            }}
            className="my-3 underline underline-offset-2 text-[16px] text-sky-300"
          >
            Sign in
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

SignUp.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};
