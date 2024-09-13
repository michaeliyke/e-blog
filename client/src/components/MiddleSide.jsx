import { useEffect, useState } from "react";
import { urlenCode } from "../util/basic";
import { PostStats } from "./PostStats";

export const MiddleSide = () => {
  const [data, setData] = useState([]);

  // get all the blog and store then in data
  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/blogs/page/1")
      .then((response) => response.json())
      .then((data) => {
        setData((prev) => [...prev, ...data]);
      });
  }, []);


  return (
    <div className="lg:w-[700px] md:w-[600px] w-[90%] mx-0 md:mx-5 border h-full ">
      {data.map(({ blog }) => (
        <div
          key={blog._id}
          className="bg-white mx-2 my-4 p-6 shadow-lg rounded-lg border border-gray-300"
        >
          {/* User Information */}
          <figure className="flex items-center mb-4">
            <a href={`/user/${blog.user.href}`}>
              <img
                src={blog.user.thumbnail}
                alt="User avatar"
                className="w-10 h-10 rounded-full mr-3"
                width={40}
                height={40}
              />
            </a>
            <figcaption>
              <h3 className="font-bold text-gray-700">
                <a href={`/user/${blog.user.href}`}>
                  {blog.user.firstname} {blog.user.lastname}
                </a>
              </h3>
              <p className="text-xs text-gray-500">2 days ago</p>
            </figcaption>
          </figure>

          {/* Post Title */}
          <h2 className="text-blue-600 text-lg font-bold mb-2">
            <a href={`/posts/${urlenCode(blog.title)}`}>{blog.title}</a>
          </h2>

          {/* Post Text */}
          {/* <p className="text-gray-800 text-sm mb-3">
            {post.text}
            <a href="#" className="text-blue-500 ml-2">
              ...see more
            </a>
          </p> */}

          {/* Impressions and Comments */}
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <p>19 impressions</p>
            <p>2 comments</p>
          </div>

          {/* The tags section */}
          <div className="flex gap-2 justify-start text-gray-300">
            <span>#react</span>
            <span>#javascript</span>
            <span>#webdev</span>
            <span>#beginner</span>
          </div>

          {/* Like and Comment Buttons */}
          <PostStats post={blog} />

		  {/* Bookmark Button */}
        </div>
      ))}
    </div>
  );
};
