import { useState } from "react";
import { request } from "../util/Tools";
import { PostCard } from "./PostCard";
import { appendToData } from "../state/appSlice/appSlice";
import { useDispatch, useSelector } from "react-redux";

export const AllUserPosts = () => {
  const posts = useSelector((state) => state.app.data);
  const currentUserHref = useSelector((state) => state.auth?.user?.href);
  // const [posts, setPosts] = useState([]);
  const url = new URL("http://127.0.0.1:3000/users/posts");
  const [pageNumber, setPageNumber] = useState(1);
  const [dataLoading, setDataLoading] = useState(false);
  const [allPostsFetched, setAllDataFetched] = useState(false);
  const dispatch = useDispatch();

  const loadMorePosts = async () => {
    if (dataLoading) return;
    setDataLoading(true);
    url.searchParams.set("page", pageNumber);
    try {
      const data = await request.get(url);
      dispatch(appendToData(data.data));
    } catch (res) {
      console.log(res.status);
      if (res.status === 404) setAllDataFetched(true);
    }
    setPageNumber(pageNumber + 1);
    setDataLoading(false);
  };
  return (
    <div className="flex flex-col w-full">
      <ul className="list-none">
        {posts.map((post) => (
          <PostCard
            key={post.blog._id}
            post={post.blog}
            withOptions={true}
            checkSlug={currentUserHref}
          />
        ))}
      </ul>
      {!allPostsFetched ? (
        <span className="flex w-full justify-center mt-5">
          {/* <hr className="w-full h-1 bg-gray-300" /> */}
          <button
            onClick={loadMorePosts}
            className="w-80 bg-blue-700 text-white mx-5 px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none active:bg-blue-400"
          >
            {dataLoading ? (
              <span className="flex items-center justify-center gap-2">
                <img
                  src="/loading_circle.svg"
                  alt=""
                  className="size-6 animate-spin"
                />
                Loading
              </span>
            ) : (
              "Load posts"
            )}
          </button>
          {/* <hr className="w-full h-1 bg-gray-300" /> */}
        </span>
      ) : (
        <span className="flex w-full items-center">
          <hr className="w-full h-1 bg-gray-300" />
          <p className="w-full text-center">No more posts to load</p>
          <hr className="w-full h-1 bg-gray-300" />
        </span>
      )}
    </div>
  );
};
