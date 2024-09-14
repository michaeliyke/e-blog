import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../state/AuthSlice/AuthSlice";
import profilePic from "../../public/profile.svg";
import logOutPic from "../../public/logout2.svg";
import { deleteCookie } from "../util/Tools";

export const UserSettings = () => {
  const { user } = useSelector((state) => state.auth);
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();
  const optionsRef = useRef(null);
  const triggerRef = useRef(null);

  const handleShowOptions = () => {
    setShowOptions((prev) => !prev);
  };

  const handleLogOut = () => {
    deleteCookie("_token");
    dispatch(clearUser());
    window.location.href = "/";
  };

  // Hide options if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target) &&
        !triggerRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (optionsRef.current) {
      optionsRef.current.style.maxHeight = showOptions
        ? `${optionsRef.current.scrollHeight}px`
        : "0px";
    }
  }, [showOptions]);

  // Apply styles after mounting to prevent flash
  const style = {
    maxHeight: showOptions ? `${optionsRef.current?.scrollHeight}px` : "0px",
  };

  return (
    <div className="relative">
      <figure onClick={handleShowOptions} ref={triggerRef}>
        <img
          src={user.profilePicture.thumbnail}
          className="rounded-full w-12 h-12 hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-gray-500"
          alt="User Thumbnail"
        />
      </figure>
      <div
        ref={optionsRef}
        className="options__list absolute w-36 bg-gray-200 border-black right-0 rounded-md overflow-hidden transition-all duration-200 ease-out text-sm"
        style={style}
      >
        <div className="flex flex-col border border-black rounded-md overflow-hidden">
          <span className="text-center p-2 bg-slate-400 font-medium">
            {user.firstname} {user.lastname}
          </span>
          <ul className="font-medium text-[15px]">
            <li className="hover:bg-gray-300 pl-3 py-2 grid grid-cols-[20px_1fr] items-center">
              <img src={profilePic} width={15} height={15} />
              <button className="ml-1 text-left">Profile</button>
            </li>
            <li className="hover:bg-gray-300 pl-3 py-2 grid grid-cols-[20px_1fr] items-center">
              <img src={logOutPic} width={16} height={16} />
              <button className="ml-1 text-left" onClick={handleLogOut}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
