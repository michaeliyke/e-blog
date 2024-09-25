import axios from "axios";
import { useEffect, useState } from "react";

export const TrendingTagsCard = () => {
  const [trending, setTrending] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://127.0.0.1:3000/tags/top");
      const data = res.data.topTags;
      //   console.log(data);
      setTrending(data);
    };
    fetchData();
  }, []);
  return (
    <div className="my-4 pb-2 font-poppins rounded-md  md:w-60 sm:w-72 w-[70%] border shadow-lg border-gray-300 h-auto text-black bg-white">
      <div className="p-2">
        <h2 className="text-md font-bold text-center">Trending Tags</h2>
        <hr className="border-b-1 border-black" />
      </div>
      <ul className="list-none px-3 py-1 m-0 font-medium flex flex-wrap gap-2 justify-center">
        {trending.map((tag) => (
          <li
            key={tag._id}
            className="px-2 py-1 bg-gray-200 rounded-full border border-gray-300 text-sm
            hover:bg-indigo-200 hover:border-gray-500 "
          >
            {tag.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
