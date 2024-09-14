import { useState } from "react";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineStar,
  AiFillStar,
} from "react-icons/ai"; // Add AiFillLike for the filled icon
import { FaRegComment } from "react-icons/fa";
import { urlenCode, blogPostSchema } from "../util/basic";
import { request } from "../util/Tools";

function CommentButton({ post }) {
  post.numOfComments = post.numOfComments || 0;
  const [numOfComments, setNumOfComments] = useState(post.numOfComments);

  function gotToComments() {
    window.location = `/posts/${urlenCode(post.title)}`;
  }

  return (
    <button className="flex items-center space-x-2" onClick={gotToComments}>
      <span role="img" aria-label="comment" className="text-2xl">
        <FaRegComment size={25} color="black" />
      </span>
      <span className="text-black font-bold">Comment</span>
    </button>
  );
}

function BookmarkButton({ post }) {
  post.bookmarked = post.bookmarked || false;
  const [bookmarked, setBookmarked] = useState(post.bookmarked);

  function handleBookmark() {
    setBookmarked(!bookmarked);
  }

  return (
    <button className="flex items-center space-x-2" onClick={handleBookmark}>
      {bookmarked ? (
        <AiFillStar size={25} color="green" />
      ) : (
        <AiOutlineStar size={25} color="black" />
      )}
      <span className="text-black font-bold">
        {bookmarked ? "Bookmarked" : "Bookmark"}
      </span>
    </button>
  );
}

function LikeButton({ post, setPosts }) {
  async function handleLikeClick() {
    console.log(post);
    const res = await request.post(
      `http://127.0.0.1:3000/blogs/likes?postId=${post._id}`
    );
    console.log(res.data.liked);
    console.log(res.data.likes);
    setPosts((prev) => {
      return prev.map((prevPost) => {
        // Add return here to return the new array
        if (prevPost._id === post._id) {
          return {
            ...prevPost,
            likes: { ...prevPost.likes, count: res.data.likes },
            liked: res.data.liked,
          };
        }
        return prevPost;
      });
    });
    // setLiked(res.data.liked);
    // setNumOfLikes(res.data.likes);
  }

  return (
    <button className="flex items-center space-x-2" onClick={handleLikeClick}>
      <span role="img" aria-label="like" className="text-2xl">
        {post.liked ? (
          <AiFillLike size={25} color="blue" />
        ) : (
          <AiOutlineLike size={25} color="black" />
        )}
      </span>
      <span className="text-black font-bold">{post.likes.count}</span>
    </button>
  );
}

export function PostStats({ post, setPosts }) {
  {
    /* Like, Comment, Bookmark Buttons */
  }
  return (
    <div className="flex items-center justify-around pt-2">
      <LikeButton post={post} setPosts={setPosts} />
      <BookmarkButton post={post} />
      <CommentButton post={post} />
    </div>
  );
}

BookmarkButton.propTypes = blogPostSchema;
LikeButton.propTypes = blogPostSchema;
PostStats.propTypes = blogPostSchema;
CommentButton.propTypes = blogPostSchema;
