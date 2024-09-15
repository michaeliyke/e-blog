import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";
import { UserSettings } from "./UserSettings";
import { toggleSignIn } from "../state/appSlice/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
        onClick={() => navigate("/")}
        className="flex items-center border-b-2 border-black h-16  justify-between p-1
      bg-[#f2f2f2]"
      >
        <div
          className="flex items-center justify-center pb-0.5 h-auto bg-[#b5b5b5]
        w-[120px] rounded-md ml-4 z-10 cursor-pointer border-2 border-[#8e8e8e]
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
        <div
          className="flex items-center border border-black w-[40%] h-9
        rounded-md"
        >
          <div>
            <svg
              className="flex items-center ml-3 mr-2"
              width="20px"
              height="20px"
              viewBox="0 0 24.00 24.00"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              transform="matrix(1, 0, 0, 1, 0, 0)"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                  stroke="#000000"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
              </g>
            </svg>
          </div>
          <input
            type="text"
            className="h-8 text-black text-md border-none outline-none bg-transparent"
            placeholder="Search"
          />
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
