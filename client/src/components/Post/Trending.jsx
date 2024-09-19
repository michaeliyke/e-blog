import { useEffect, useState } from "react";
import { BookmarkButton, PostStats } from "../PostStats";
import moment from "moment";
import { request } from "../../util/Tools";

export const Trending = () => {
  const url = new URL("http://127.0.0.1:3000/blogs/trending");
  const [pageIsLoading, setPageIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      url.searchParams.set("page", pageNumber);
      const data = await request.get(url);
      // console.log({ data });
      setData((prev) => [...prev, ...data.data]);
      setPageIsLoading(false);
    };
    fetchData();
  }, [pageNumber]);

  useEffect(() => {
    // Function to check if the user is at the bottom of the page
    const handleScroll = () => {
      if (pageIsLoading) return;
      const scrollTop = window.scrollY; // Modern alternative to window.pageYOffset
      const windowHeight = window.innerHeight; // Height of the visible part of the window
      const documentHeight = document.documentElement.scrollHeight; // Total height of the page

      // Check if the scroll position is at the bottom
      // console.log(`${scrollTop} + ${windowHeight} >= ${documentHeight} - 50`);
      if (scrollTop + windowHeight >= documentHeight - 50) {
        setPageIsLoading(true);
        setPageNumber(pageNumber + 1);
      }
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pageNumber, pageIsLoading]);
  return (
    <div className="">
      {data.map(({ blog }) => (
        <div
          key={blog._id}
          className="bg-white mx-2 my-4 p-6 shadow-lg rounded-lg border border-gray-300"
        >
          {/* User Information */}
          <figure className="flex items-center mb-4 relative">
            <a href={`/profile/${blog.user.href}`}>
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
                <a href={`/profile/${blog.user.href}`}>
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
    </div>
  );
};
