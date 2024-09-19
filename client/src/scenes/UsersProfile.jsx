import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useParams } from "react-router-dom";
import { request } from "../util/Tools";
import moment from "moment";

export function UsersProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const { slug } = useParams();

  const url = `http://127.0.0.1:3000/users/info?slug=${slug}`;

  useEffect(
    function cb() {
      request
        .get(url)
        .then((res) => {
          if (!res.statusText == "OK") throw new Error("Failed to fetch data");
          return res.data;
        })
        .then((data) => {
          if (data.user == null) data.user = data;
          //   console.dir(data);
          setUser(data.user);
          console.log(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error message:", error);
          setError(error);
          setLoading(false);
        });
    },
    [url]
  );

  const getPosts = () => {
    if (dataLoading) return;
    setDataLoading(true);
    request
      .get(`http://127.0.0.1:3000/users/${user._id}/posts`)
      .then((res) => {
        if (!res.data.length) return;
        setData((prev) => [...prev, ...res.data]);
        console.log(res.data);
        setPage(page + 1);
        setDataLoading(false);
      })
      .catch((err) => console.log("err:", err));
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">Error: {error.message}</div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto mt-14 p-5">
        <div className="bg-white relative shadow-lg rounded-lg p-8">
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-16">
            {/* Profile image */}
            <img
              src={user.profilePicture.medium || "/default-avatar.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white"
            />
          </div>

          {/* User info */}
          <div className="flex items-center flex-col my-14">
            <h2 className="text-2xl font-semibold">
              {user.firstname} {user.lastname}
            </h2>
          </div>
        </div>
        <ul className="flex flex-col items-center justify-center mt-10">
          {data.map(({ blog }) => (
            <li
              key={blog._id}
              className="bg-white mx-2 my-4 p-6 shadow-lg rounded-lg border border-gray-300 w-full"
            >
              {/* User Information */}
              <figure className="flex items-center mb-4 relative">
                <a href={`/user/${user.href}`}>
                  <img
                    src={user.profilePicture.thumbnail}
                    alt="User avatar"
                    className="w-10 h-10 rounded-full mr-3"
                    width={40}
                    height={40}
                  />
                </a>
                <figcaption>
                  <h3 className="font-bold text-gray-700">
                    <a href={`/user/${blog.user.href}`}>
                      {user.firstname} {user.lastname}
                    </a>
                    {/* <BookmarkButton post={{ blog }} /> */}
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
              {/* <PostStats post={blog} /> */}

              {/* Bookmark Button */}
            </li>
          ))}
          <button
            onClick={getPosts}
            className="bg-indigo-600 text-lg font-poppins text-white border-2 border-indigo-800 rounded-xl w-32 h-12 hover:bg-indigo-500 active:bg-indigo-100 active:text-indigo-600 mr-0.5"
          >
            load posts
          </button>
        </ul>
      </div>
    </>
  );
}
