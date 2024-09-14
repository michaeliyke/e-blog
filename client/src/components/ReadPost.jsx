import { useEffect } from "react";
import PropTypes from "prop-types";
import { request } from "../util/Tools";

export function ReadPost({ post_title, children }) {
  const post = {
    text: "hhhhhhhhhhhhhhhhhhhhhhh",
    title: "ggggggggggggggggggg",
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await request.get(
        `http://127.0.0.1:3000/blogs/slug/${post_title}`
      );
      console.log(data);
    };
    fetchData();
  });
  if (!post) {
    // if post is not found in mapped due to async fetch of data
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p>{post.text}</p>
      {children}
    </div>
  );
}

ReadPost.propTypes = {
  post_title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
