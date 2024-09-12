import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import TogglePasswordVisibility from "../util/TogglePasswordVisibility";
import { useContext } from "react";
import { DataContext } from "../data/Context";
import { signInFormValidator } from "../util/Tools";
import { login } from "../util/Tools";

export const SignIn = () => {
  const { visible, setVisible } = useContext(DataContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(<br />);
  const cardisVisible = visible.signin;
  const [showPassword, setShowPassword] = useState(false);
  const handlePopUp = (signin = false, signup = false) => {
    setVisible({ signin, signup });
  };

  const handleCheckBox = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    setError(<br />);
    if (!signInFormValidator(formData, setError)) {
      return;
    }
    console.log(formData);
    login(formData).then(({ status, message }) => {
      if (status === 200) {
        window.location.href = "/";
      } else if (status === 409) {
        setError("** Please choose another email **");
      } else if (status === 403) {
        setError(message);
      }
    });
  };
  return (
    <>
      <div
        className={`popup__container fixed bg-black w-full h-full transition-all duration-500 ease-in-out ${
          cardisVisible ? "opacity-60" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => {
          handlePopUp();
        }}
      ></div>
      <div
        className={`text-white fixed w-[90%] sm:w-[500px] h-auto  shadow-sm shadow-white  bg-[#2b2738] flex flex-col items-center popup
              rounded-md p-9 z-10
              ${cardisVisible ? "" : "hide__popup"}`}
      >
        <h3 className="font-bold text-3xl mb-5 text-white ">Sign In</h3>
        <p className="text-center underline underline-offset-[4px] font-pompiere text-[22px]  mb-7 font-medium text-gray-300">
          Welcome to e-Blog <br /> Your blogging platform
        </p>
        <p className="error__box text-red-400">{error}</p>
        <form className="form__container mt-5 w-full px-9">
          <div className="w-full mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input__box w-full"
              onChange={handleCheckBox}
            />
          </div>
          <div className="relative flex items-center mb-3">
            <input
              className="input__box w-full"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleCheckBox}
            />
            <TogglePasswordVisibility
              visible={showPassword}
              setVisible={setShowPassword}
            />
          </div>

          <div className="flex flex-col h-full">
            <div className="flex items-center mb-4">
              <input type="checkbox" name="" id="" className="" />

              <span className="text-[15px] text-white">Remembre me</span>
            </div>
            <button
              onClick={handleSubmit}
              className="mb-2 mt-6 border border-black w-full h-10 text-white rounded-sm bg-[#6e54b5]"
            >
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
