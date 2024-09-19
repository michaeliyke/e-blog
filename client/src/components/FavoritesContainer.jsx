import { useEffect, useState } from "react";
import { request } from "../util/Tools";
import { BookmarkButton, PostStats } from "../components/PostStats";
import moment from "moment";

export const FavoritesContainer = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    request
      .get("http://127.0.0.1:3000/users/bookmarks")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="">
      <h1 className="text-2xl font-poppins font-bold mb-8 text-center">
        Favorites
      </h1>
      <ul>
        {data.map(({ blog }) => (
          <div
            key={blog._id}
            className="bg-white mx-2 my-4 p-6 shadow-lg rounded-lg border border-gray-300"
          >
            {/* User Information */}
            <figure className="flex items-center mb-4 relative">
              <a href={`/user/${blog.user.href}`}>
                <img
                  src={blog.user.profilePicture.thumbnail}
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
                  <BookmarkButton post={blog} />
                </h3>
                {/* <p className="text-xs text-gray-500">2 days ago</p> */}
                <p className="text-xs text-gray-500">
                  {moment(blog.createdAt).fromNow()}
                </p>
              </figcaption>
            </figure>

            {/* Post Content */}
            <div className="flex items-start max-h-[40%] overflow-clip">
              <div className="flex-1">
                <a href={`/posts/${blog.slug}`}>
                  {/* Post Title */}
                  <h2 className="text-blue-600 text-xl font-[600] mb-2 font-poppins">
                    {blog.title}
                  </h2>
                  {/* Post Text */}
                  <p className="font-poppins text-sm whitespace-pre-wrap overflow-hidden overflow-ellipsis">
                    {blog.text}... <br />
                  </p>
                  <p className="text-indigo-500 text-[13px]">
                    click to continue reading
                  </p>
                </a>
              </div>
            </div>
            {blog.cover?.medium && (
              <a href={`/posts/${blog.slug}`}>
                <img
                  className="w-auto mx-auto max-h-[300px] my-3"
                  src={blog.cover.medium}
                  alt="Post cover"
                />
              </a>
            )}

            {/* Impressions and Comments */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <p>{blog.likes.count} impressions</p>
              <p>{blog.comments.count} comments</p>
            </div>

            {/* The tags section */}
            <div className="flex gap-2 justify-start text-gray-400 font-poppins text-[13px]">
              {blog.tags.map((tag, index) => (
                <span key={index}>#{tag.name}</span>
              ))}
            </div>

            {/* Like and Comment Buttons */}
            <PostStats post={blog} />

            {/* Bookmark Button */}
          </div>
        ))}
      </ul>
    </div>
  );
};
