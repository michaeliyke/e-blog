import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { request } from "../util/Tools";
import { PostCard } from "./PostCard";
import { appendToData, resetData } from "../state/appSlice/appSlice";

export const MiddleSide = () => {
  // const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageLoading, setPageLoading] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const data = useSelector((state) => state.app.data);
  const currentUserHref = useSelector((state) => state.auth?.user?.href);
  const dispatch = useDispatch();

  useEffect(() => {
    // clear the data when the component mounts
    dispatch(resetData());
  }, []);

  // get all the blog and store then in data
  useEffect(() => {
    request
      .get(`http://127.0.0.1:3000/blogs/page/${pageNumber}`)
      .then((res) => {
        if (!res.data.length) return;
        // setData((prev) => [...prev, ...res.data]);
        dispatch(appendToData(res.data));
        setPageLoading(false);
      })
      .catch((err) => console.log("err:", err));
  }, [pageNumber]);

  useEffect(() => {
    // Function to check if the user is at the bottom of the page
    const handleScroll = () => {
      if (pageLoading) return;
      const scrollTop = window.scrollY; // Modern alternative to window.pageYOffset
      const windowHeight = window.innerHeight; // Height of the visible part of the window
      const documentHeight = document.documentElement.scrollHeight; // Total height of the page

      // Check if the scroll position is at the bottom
      // console.log(`${scrollTop} + ${windowHeight} >= ${documentHeight} - 50`);
      if (scrollTop + windowHeight >= documentHeight - 50) {
        setPageLoading(true);
        setPageNumber(pageNumber + 1);
      }
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pageNumber, pageLoading]);

  if (data && data.length > 0) console.dir("data:", data[0].blog);
  return (
    <div className="lg:w-[700px] md:w-[600px] w-full mx-0 md:mx-5 h-full ">
      <div className="bg-white text-center mx-2 my-4 p-6 shadow-lg rounded-lg border border-gray-300">
        {isAuthenticated ? (
          <>
            <h2 className="text-lg font-bold mb-4 text-gray-700">
              Got something on your mind?
            </h2>
            <p className="text-gray-600 mb-6 font-pompiere text-xl font-bold">
              Share your ideas, stories, or updates with the world!
            </p>
            <button
              className="bg-blue-500 text-white w-full py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              onClick={() => (window.location.href = "/post/new")}
            >
              <span>Create Post</span>
            </button>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold mb-4 text-gray-700">e-Blog</h2>
            <p className="text-gray-600 mb-6 font-pompiere text-xl font-bold">
              e-blog is your go-to platform for effortless blogging. Whether
              you’re an experienced writer or a beginner, e-blog offers an
              easy-to-use space to publish, share, and connect with a vibrant
              community. Explore topics, follow bloggers, and let your
              creativity shine!
            </p>
          </>
        )}
      </div>

      <ul className="list-none">
        {data.map(({ blog }) => (
          <PostCard
            key={blog._id}
            post={blog}
            checkSlug={currentUserHref}
            withOptions={true}
          />
        ))}
      </ul>

      {pageLoading && (
        <div className="bg-white mx-2 my-4 p-6 shadow-lg rounded-lg border border-gray-300">
          <div className="animate-pulse space-y-6">
            {/* User Information */}
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-slate-400 h-10 w-10"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-400 rounded w-32"></div>
                <div className="h-3 bg-slate-400 rounded w-24"></div>
              </div>
              <div className="bg-slate-400 h-10 w-8"></div>
            </div>

            {/* Post Title */}
            <div className="h-5 bg-slate-400 rounded w-5/6"></div>

            {/* Impressions and Comments */}
            <div className="flex justify-between">
              <div className="h-3 bg-slate-400 rounded w-28"></div>
              <div className="h-3 bg-slate-400 rounded w-20"></div>
            </div>

            {/* Tags Section */}
            <div className="flex gap-2">
              <div className="h-3 bg-slate-400 rounded w-16"></div>
              <div className="h-3 bg-slate-400 rounded w-16"></div>
              <div className="h-3 bg-slate-400 rounded w-16"></div>
              <div className="h-3 bg-slate-400 rounded w-16"></div>
            </div>

            {/* Like and Comment Buttons */}
            <div className="flex justify-evenly mt-4">
              <div className="h-8 bg-slate-400 rounded w-24"></div>
              <div className="h-8 bg-slate-400 rounded w-24"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
