import { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
// import { GoBookmark } from "react-icons/go";
// import { GoBookmarkFill } from "react-icons/go";

export const MiddleSide = () => {
  const [data, setData] = useState([]);

  // get all the blog and store then in data
  useEffect(() => {
    fetch("http://127.0.0.1:3000/blogs/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData((prev) => [...prev, ...data]);
      });
  }, []);

  return (
    <div className="lg:w-[700px] md:w-[600px] w-[90%] mx-0 md:mx-5 border h-full ">
      {data.map((post) => (
        <div
          key={post._id}
          className="bg-white mx-2 my-4 p-6 shadow-lg rounded-lg border border-gray-300"
        >
          {/* User Information */}
          <div className="flex items-center mb-4">
            <img
              src="https://i.ibb.co/C5V20xt/image.jpg"
              alt="User avatar"
              className="w-10 h-10 rounded-full mr-3"
              width={40}
              height={40}
            />
            <div>
              <h3 className="font-bold text-gray-700">User One</h3>
              <p className="text-xs text-gray-500">2 days ago</p>
            </div>
          </div>

          {/* Post Title */}
          <h2 className="text-blue-600 text-lg font-bold mb-2">{post.title}</h2>

          {/* Post Text */}
          <p className="text-gray-800 text-sm mb-3">
            {post.text}
            <a href="#" className="text-blue-500 ml-2">
              ...see more
            </a>
          </p>

          {/* Impressions and Comments */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <p>19 impressions</p>
            <p>2 comments</p>
          </div>

          {/* Like and Comment Buttons */}
          <div className="flex items-center justify-around border-t pt-2">
            <button className="flex items-center space-x-2">
              <span role="img" aria-label="like" className="text-2xl">
                <AiOutlineLike size={25} color="black" />
              </span>
              <span className="text-black font-bold">Like</span>
            </button>
            <button className="flex items-center space-x-2">
              <span role="img" aria-label="comment" className="text-2xl">
                <FaRegComment size={25} color="black" />
              </span>
              <span className="text-black font-bold">Comment</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
