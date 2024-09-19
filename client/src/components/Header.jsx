import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";
import { UserSettings } from "./UserSettings";
import { toggleSignIn } from "../state/appSlice/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SearchEngine } from "./SearchEngine";
import { useState } from "react";
import { NavDockMD } from "./NavDockMD";

export const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isNavDockVisible, setIsNavDockVisible] = useState(false);
  const dispatch = useDispatch();

  const toggleFormPopUp = () => {
    // prompt the login card
    dispatch(toggleSignIn());
  };

  const toggleNav = () => {
    setIsNavDockVisible(!isNavDockVisible);
  };

  return (
    <header className="h-16 w-full">
      {!isAuthenticated && (
        <>
          <SignIn />
          <SignUp />
        </>
      )}
      <div
        className="flex items-center  h-16  justify-between p-1
       bg-white shadow-xl border border-gray-300"
      >
        <div className="block md:hidden">
          <div
            className="p-1 mr-2 hover:bg-gray-400 size-[50px] "
            onClick={toggleNav}
          >
            <img src="/menu.svg" alt="" />
          </div>
          {isNavDockVisible && (
            <div className="absolute top-[63px] h-auto z-[100]">
              <NavDockMD />
            </div>
          )}
        </div>
        <div
          onClick={() => navigate("/")}
          className="flex items-center justify-center h-auto
        w-[120px] rounded-md md:ml-4  cursor-pointer home__btn"
        >
          <img src="/B.png" alt="" width={100} />
        </div>
        <div className="flex w-full max-w-[500px] justify-center ">
          <SearchEngine />
        </div>
        <div className="mr-4">
          {isAuthenticated ? (
            <UserSettings />
          ) : (
            <button
              onClick={toggleFormPopUp}
              className="bg-indigo-600 text-lg font-poppins text-white border-2 border-indigo-800 rounded-xl w-20 h-10 hover:bg-indigo-500 active:bg-indigo-100 active:text-indigo-600 mr-0.5"
            >
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
