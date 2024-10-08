import { useEffect, useState } from "react";
import { FaGripfire } from "react-icons/fa6";
import axios from "axios";

export const TrendingCard = () => {
  const [trending, setTrending] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://127.0.0.1:3000/blogs/top-ten");
      const data = res.data.topPosts;
      //   console.log(data);
      setTrending(data);
    };
    fetchData();
  }, []);
  return (
    <div className="my-4 pb-2 font-poppins rounded-md md:w-60 sm:w-64 w-[80%] border shadow-lg border-gray-300 h-auto text-black bg-white">
      <div className="p-2">
        <h2 className="text-md font-bold text-center">Trending Posts</h2>
        <hr className="border-b-1 border-black" />
      </div>
      <ul className="list-none px-3 py-1 font-medium text-sm">
        {trending.map((post, index) => (
          <li key={index} className="px-1 pb-0.5">
            <a href={`/posts/${post.slug}`}>
              <div className="items-center grid grid-cols-[17px_auto]">
                <FaGripfire color="red" className="-rotate-45" />
                <p
                  className="whitespace-nowrap overflow-hidden text-ellipsis
                hover:underline "
                  title={post.title}
                >
                  {post.title}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
