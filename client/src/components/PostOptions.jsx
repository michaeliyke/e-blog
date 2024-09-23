import { useEffect, useRef, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
// import { CiBookmark } from "react-icons/ci";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { PopUpConfirme } from "./PopUpConfirme";
import PropTypes from "prop-types";

export const PostOptions = ({ postId }) => {
  const [displayOptions, setDisplayOptions] = useState(false);
  const [popUpConfirme, setPopUpConfirme] = useState(false);
  const dropdownRef = useRef(null);

  const toggleView = (e) => {
    e.preventDefault();
    setDisplayOptions(!displayOptions);
  };

  const handleClickOutside = (event) => {
    // Check if the click is outside the dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDisplayOptions(false);
    }
  };

  useEffect(() => {
    // Add event listener when the dropdown is opened
    if (displayOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener when component is unmounted or the dropdown is closed
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [displayOptions]);

  return (
    <div className="absolute right-0 top-0" ref={dropdownRef}>
      <SlOptionsVertical
        size={35}
        className="hover:bg-gray-400 rounded-full p-1"
        title="options"
        onClick={toggleView}
      />
      {displayOptions && (
        <div className="absolute right-0">
          <div className="bg-white border border-gray-200 rounded-md shadow-md w-40 h-auto py-2">
            <ul className="">
              {/* <li className="grid grid-cols-[30px__1fr] items-center p-2 hover:bg-gray-200">
                <CiBookmark size={25} />
                Save
              </li> */}
              <li className="grid grid-cols-[30px__1fr] items-center p-2 hover:bg-gray-200 cursor-pointer">
                <MdOutlineEdit size={25} />
                Edit post
              </li>
              <li
                className="grid grid-cols-[30px__1fr] items-center p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => setPopUpConfirme(!popUpConfirme)}
              >
                <MdDelete size={25} />
                Delete post
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="absolute w-full">
        <PopUpConfirme
          visible={popUpConfirme}
          toggle={setPopUpConfirme}
          postId={postId}
        />
      </div>
    </div>
  );
};

PostOptions.propTypes = {
  postId: PropTypes.string.isRequired,
};
