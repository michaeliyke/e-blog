import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { request } from "../util/Tools";

export function ReadPost({ post_title, children }) {
  const [post, setPost] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const data = await request.get(
        `http://127.0.0.1:3000/blogs/h/${post_title}`
      );
      setPost(data.data.post);
    };
    fetchData();
  });

  if (!post) {
    // if post is not found in mapped due to async fetch of data
    return (
      <div className="text-center font-bold text-lg font-poppins">
        Loading...
      </div>
    );
  }

  return (
    <div className="col-span-2 whitespace-pre-wrap relative z-20">
      <h1 className="text-3xl font-bold text-center mb-5">{post.title}</h1>
      <div>
        {post.cover?.image && (
          <img src={post.cover?.image} className="w-auto h-auto" />
        )}
      </div>
      <p
        className="whitespace-pre-wrap font-serif text-[#333333] font-bold
      border-t-2 border-gray-500 pt-5 mt-5"
      >
        {post.text}
      </p>
      {children}
    </div>
  );
}

ReadPost.propTypes = {
  post_title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
