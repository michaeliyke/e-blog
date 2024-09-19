import {
  FaHome,
  FaFireAlt,
  FaAddressCard,
  FaCog,
  FaTags,
} from "react-icons/fa";
import "../styles/leftSide.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleSignIn } from "../state/appSlice/appSlice";

export const NavDockMD = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const promptLogin = () => {
    dispatch(toggleSignIn());
  };

  return (
    <div className="font-poppins rounded-md overflow-hidden md:w-52  border-2 shadow border-[#e5e5e5] h-auto text-black bg-[#f2f2f2]">
      <div className="p-2">
        <h2 className="text-md font-bold text-center">NavDock</h2>
        <hr className="border-b-1 border-black" />
      </div>
      <ul className="list-none px-3 py-1 m-0 nav__dock font-medium">
        <li
          onClick={() => navigate("/")}
          className="relative w-fit mb-3 nav__dock_li"
        >
          <div className="grid grid-cols-[25px_auto] gap-4 items-center">
            <FaHome size={25} />
            <span>Home</span>
          </div>
          <hr className="absolute " />
        </li>

        <li
          onClick={() => navigate("/about")}
          className="relative w-fit mb-3 nav__dock_li"
        >
          <div className="grid grid-cols-[25px_auto] gap-4 items-center">
            <img src="/about.svg" alt="About" className="w-6 h-6" />
            <span>About</span>
          </div>
          <hr className="absolute " />
        </li>
        {/* ---------start---------- */}
        {isAuthenticated && (
          <>
            <li
              onClick={() => navigate("/post/new")}
              className="relative w-fit mb-3 nav__dock_li"
            >
              <div className="grid grid-cols-[25px_auto] gap-4 items-center">
                <img src="/share.svg" alt="Share" className="w-6 h-6 pb-0.5" />
                <span>Create Post</span>
              </div>
              <hr className="absolute " />
            </li>

            <li
              onClick={() => navigate("/profile")}
              className="relative w-fit mb-3 nav__dock_li"
            >
              <div className="grid grid-cols-[25px_auto] gap-4 items-center">
                <FaAddressCard size={25} />
                <span>Profile</span>
              </div>
              <hr className="absolute " />
            </li>

            <li
              onClick={() => navigate("/profile/settings")}
              className="relative w-fit mb-3 nav__dock_li"
            >
              <div className="grid grid-cols-[25px_auto] gap-4 items-center">
                <FaCog size={25} className="pb-0.5" />
                <span>Settings</span>
              </div>
              <hr className="absolute " />
            </li>

            <li
              onClick={() => navigate("/favorites")}
              className="relative w-fit mb-3 nav__dock_li"
            >
              <div className="grid grid-cols-[25px_auto] gap-4 items-center">
                <img src="/fav.svg" alt="Favorites" className="w-6 h-6" />
                <span>Favorites</span>
              </div>
              <hr className="absolute " />
            </li>
          </>
        )}
        {/* -------end------------- */}
        <li
          onClick={() => navigate("/posts/trending")}
          className="relative w-fit mb-3 nav__dock_li"
        >
          <div className="grid grid-cols-[25px_auto] gap-4 items-center">
            <FaFireAlt size={25} className="pb-0.5" />
            <span>Trending</span>
          </div>
          <hr className="absolute " />
        </li>

        <li
          onClick={() => navigate("/posts?trending=true")}
          className="relative w-fit mb-3 nav__dock_li"
        >
          <div className="grid grid-cols-[25px_auto] gap-4 items-center">
            <FaTags size={25} className="pb-0.5" />
            <span>All Tags</span>
          </div>
          <hr className="absolute " />
        </li>
      </ul>
      {isAuthenticated === false && (
        <p className="text-center text-sm text-gray-500 mt-4 p-2 italic">
          <span
            className="text-indigo-600 font-semibold cursor-pointer hover:underline"
            onClick={promptLogin}
          >
            Log in
          </span>
          &nbsp;to see more actions
        </p>
      )}
    </div>
  );
};
