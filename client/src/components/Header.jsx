import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";
import { UserSettings } from "./UserSettings";
import { toggleSignIn } from "../state/appSlice/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SearchEngine } from "./SearchEngine";

export const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const toggleFormPopUp = () => {
    // prompt the login card
    dispatch(toggleSignIn());
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
        className="flex items-center border-b-2 border-black h-16  justify-between p-1
      bg-[#f2f2f2]"
      >
        <div
          onClick={() => navigate("/")}
          className="flex items-center justify-center pb-0.5 h-auto bg-[#b5b5b5]
        w-[120px] rounded-md ml-4 cursor-pointer border-2 border-[#8e8e8e]
        home__btn hover:bg-[#969696]"
        >
          <span className="relative top-1 font-Teko text-[40px] font-bold">
            <p style={{ lineHeight: 0.9 }}>Blog</p>
          </span>
          <img
            className="relative bottom-1 size-9 home__img_btn"
            src="/pic_1.png"
            width={200}
            height={200}
            alt="pic"
          />
        </div>
        <SearchEngine />
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
