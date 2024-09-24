import { MdNightlight, MdOutlineLightMode, MdHome } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaArrowUp, FaArrowLeft } from "react-icons/fa";
import PropTypes from "prop-types";

export function PostLeftSide({ handleToggle, toggleBg }) {
  const navigate = useNavigate();
  const buttonStyling = "size-10 bg-black p-0.5 rounded-md hover:scale-110 ";
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="mx-auto w-60 h-auto flex flex-col sticky top-3 z-20 bg-[#f5f5df] rounded-full
          border-2 border-gray-400"
    >
      {/* left container */}
      <div className="w-full flex h-16 justify-evenly items-center">
        {/* controle buttons */}
        <button>
          <FaArrowLeft
            color="white"
            size={30}
            onClick={() => navigate(-1)}
            className="size-10 bg-black p-0.5 rounded-md hover:scale-110 "
          />
        </button>
        <button>
          <MdHome
            color="white"
            size={30}
            onClick={() => navigate("/")}
            className="size-10 bg-black p-0.5 rounded-md hover:scale-110 "
          />
        </button>
        <button onClick={handleToggle}>
          {toggleBg ? (
            <MdOutlineLightMode
              size={30}
              color="white"
              className={buttonStyling}
            />
          ) : (
            <MdNightlight color="white" size={30} className={buttonStyling} />
          )}
        </button>
        <button>
          <FaArrowUp
            color="white"
            size={30}
            onClick={scrollToTop}
            className={buttonStyling}
          />
        </button>
      </div>
    </div>
  );
}

PostLeftSide.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  toggleBg: PropTypes.bool.isRequired,
};
