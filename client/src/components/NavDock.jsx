import {
  FaHome,
  FaFireAlt,
  FaAddressCard,
  FaCog,
  FaTags,
} from 'react-icons/fa';
import '../styles/leftSide.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const NavDock = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="font-poppins rounded-md lg:w-auto overflow-hidden md:w-52 hidden md:block border-2 shadow border-[#e5e5e5] h-auto text-black bg-[#f2f2f2] sticky top-4 z-0">
      <div className="p-2">
        <h2 className="text-md font-bold text-center">NavDock</h2>
        <hr className="border-b-1 border-black" />
      </div>
      <ul className="list-none px-3 py-1 m-0 nav__dock font-medium">
        <li
          onClick={() => navigate('/')}
          className="relative w-fit mb-3 nav__dock_li">
          <div className="grid grid-cols-[25px_auto] gap-4 items-center">
            <FaHome size={25} />
            <span>Home</span>
          </div>
          <hr className="absolute " />
        </li>

        <li
          onClick={() => navigate('/about')}
          className="relative w-fit mb-3 nav__dock_li">
          <div className="grid grid-cols-[25px_auto] gap-4 items-center">
            <img
              src="/about.svg"
              alt="About"
              className="w-6 h-6"
            />
            <span>About</span>
          </div>
          <hr className="absolute " />
        </li>
        {/* ---------start---------- */}
        {isAuthenticated ? (
          <>
            <li
              onClick={() => navigate('/post/new')}
              className="relative w-fit mb-3 nav__dock_li">
              <div className="grid grid-cols-[25px_auto] gap-4 items-center">
                <img
                  src="/share.svg"
                  alt="Share"
                  className="w-6 h-6 pb-0.5"
                />
                <span>Create Post</span>
              </div>
              <hr className="absolute " />
            </li>

            <li
              onClick={() => navigate('/profile')}
              className="relative w-fit mb-3 nav__dock_li">
              <div className="grid grid-cols-[25px_auto] gap-4 items-center">
                <FaAddressCard size={25} />
                <span>Profile</span>
              </div>
              <hr className="absolute " />
            </li>

            <li
              onClick={() => navigate('/profile/settings')}
              className="relative w-fit mb-3 nav__dock_li">
              <div className="grid grid-cols-[25px_auto] gap-4 items-center">
                <FaCog
                  size={25}
                  className="pb-0.5"
                />
                <span>Settings</span>
              </div>
              <hr className="absolute " />
            </li>

            <li
              onClick={() => navigate('/favorites')}
              className="relative w-fit mb-3 nav__dock_li">
              <div className="grid grid-cols-[25px_auto] gap-4 items-center">
                <img
                  src="/fav.svg"
                  alt="Favorites"
                  className="w-6 h-6"
                />
                <span>Favorites</span>
              </div>
              <hr className="absolute " />
            </li>
          </>
        ) : (
          <p className="text-center text-sm text-gray-500 pl-0 pt-0 -mt-2 -ml-4 p-2 italic">
            Log in to see more actions
          </p>
        )}
        {/* -------end------------- */}
        <li
          onClick={() => navigate('/posts?trending=true')}
          className="relative w-fit mb-3 nav__dock_li">
          <div className="grid grid-cols-[25px_auto] gap-4 items-center">
            <FaFireAlt
              size={25}
              className="pb-0.5"
            />
            <span>Trending</span>
          </div>
          <hr className="absolute " />
        </li>

        <li
          onClick={() => navigate('/posts?trending=true')}
          className="relative w-fit mb-3 nav__dock_li">
          <div className="grid grid-cols-[25px_auto] gap-4 items-center">
            <FaTags
              size={25}
              className="pb-0.5"
            />
            <span>All Tags</span>
          </div>
          <hr className="absolute " />
        </li>
      </ul>
    </div>
  );
};
