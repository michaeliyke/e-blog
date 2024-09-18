import { useMemo, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";

export const SearchEngine = () => {
  const [result, setResult] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resultLength, setResultLength] = useState(0);
  const [focused, setFocused] = useState(false);
  const [currentChoice, setCurrentChoice] = useState(0);
  const search = useMemo(
    () =>
      debounce(async (searchText) => {
        if (searchText) {
          try {
            const suggestionUrl = new URL("http://127.0.0.1:3000/blogs/search");
            suggestionUrl.searchParams.set("text", searchText);
            const { data } = await axios.get(suggestionUrl);
            setResult(data);
            setResultLength(data.length);
          } catch (err) {
            console.log({ err });
          }
        } else {
          setResult([]);
          setResultLength(0);
        }
        setIsLoading(false);
      }, 200),
    []
  );

  const handleChange = async (e) => {
    const value = e.target.value;
    setIsLoading(true);
    setSearchText(value);
    setCurrentChoice(value);
    search(value);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setCurrentChoice((prev) => (prev < resultLength ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setCurrentChoice((prev) => (prev > 0 ? prev - 1 : resultLength));
        break;
      case "Enter":
        e.preventDefault();
        // console.log("enter");
        if (!result[currentChoice]) return;
        window.location.href = `/posts/${result[currentChoice].slug}`;
        break;
    }
  };

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  const handleMouseDown = (e) => {
    // Prevent onBlur from firing when clicking inside the results field
    e.preventDefault();
  };

  return (
    <div className="w-full px-5">
      <div
        className="relative flex items-center border border-black w-full max-w-[500px] h-9
    rounded-full bg-[#f2f2f2]"
      >
        <img
          src="/search.svg"
          alt=""
          width={20}
          height={20}
          className="ml-3 mr-2"
        />
        <input
          type="text"
          className="w-full h-8 text-black text-md border-none outline-none bg-transparent"
          placeholder="Search"
          value={searchText}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        <div
          className={`absolute top-[36px] left-0 w-full max-w-[500px]
    bg-[#f9f9f9] border border-gray-300 shadow-lg rounded-md z-50 scroll__style overflow-x-hidden
    ${focused && searchText ? "block" : "hidden"}`}
          onMouseEnter={() => setCurrentChoice(-1)}
          onMouseDown={handleMouseDown}
        >
          <ul className="list-none py-2 m-0 scroll__style">
            {isLoading && result.length === 0 ? ( // If loading and no results yet
              <li className="py-2 px-3 cursor-pointer">Loading...</li>
            ) : result.length !== 0 ? ( // If results are available
              result.map((post, index) => (
                <a
                  href={`/posts/${post.slug}`}
                  key={index}
                  className={`flex hover:bg-gray-200 ${
                    index === currentChoice && "bg-gray-200"
                  }`}
                >
                  <img
                    src="/search.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="ml-3 mr-2"
                  />
                  <li className="py-1 w-full  cursor-pointer">{post.title}</li>
                </a>
              ))
            ) : (
              searchText && ( // If no results and search text is present
                <li className="py-2 px-3 hover:bg-gray-200 cursor-pointer">
                  No result found
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
