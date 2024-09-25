import { useEffect, useState } from "react";
import { request } from "../../util/Tools";
import { PostCard } from "../PostCard";
import { useSelector } from "react-redux";

export const Trending = () => {
  const currentUserHref = useSelector((state) => state.auth?.user?.href);
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
      const scrollTop = window.scrollY; // get the current scroll position
      const windowHeight = window.innerHeight; // get the height of the viewport
      const documentHeight = document.documentElement.scrollHeight; // get the total height of the document

      // Check if the scroll position is at the bottom
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
    <ul className="list-none">
      {data.map(({ blog }) => (
        <PostCard key={blog._id} post={blog} checkSlug={currentUserHref} />
      ))}
    </ul>
  );
};
