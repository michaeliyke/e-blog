import { useEffect, useState } from "react";
import { request } from "../util/Tools";
import { PostCard } from "./PostCard";
import { useSelector } from "react-redux";

export const FavoritesContainer = () => {
  const [data, setData] = useState([]);
  const currentUserHref = useSelector((state) => state.auth?.user?.href);

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
      <ul className="list-none">
        {data.map(({ blog }) => (
          <PostCard key={blog._id} post={blog} checkSlug={currentUserHref} />
        ))}
      </ul>
    </div>
  );
};
