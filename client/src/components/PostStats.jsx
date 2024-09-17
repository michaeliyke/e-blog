import { useState } from "react";
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineStar,
  AiFillStar,
} from "react-icons/ai"; // Add AiFillLike for the filled icon
import { FaRegComment } from "react-icons/fa";
import { urlenCode, blogPostSchema } from "../util/basic";

function CommentButton({ post }) {
  post.numOfComments = post.numOfComments || 0;
  // const [numOfComments, setNumOfComments] = useState(post.numOfComments);

  function gotToComments() {
    window.location = `/posts/${urlenCode(post.slug)}`;
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
        <FaBookmark size={25} color="green" />
      ) : (
        <FaRegBookmark size={25} color="black" />
      )}
      <span className="text-black font-bold">
        {bookmarked ? "Bookmarked" : "Bookmark"}
      </span>
    </button>
  );
}

function LikeButton({ post }) {
  const [liked, setLiked] = useState(post.liked || false);
  const [numOfLikes, setNumOfLikes] = useState(post.likes.count || 0);
  const url = `http://127.0.0.1:3000/blogs/${post._id}/likes`;

  function handleLikeClick() {
    const newLikedState = !liked;

    // Update the state before sending the request
    setLiked(newLikedState);
    setNumOfLikes((prevNumOfLikes) => {
      return newLikedState ? prevNumOfLikes + 1 : prevNumOfLikes - 1;
    });

    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setNumOfLikes(data.likes);
      })
      .catch((error) => {
        console.log("Error updating likes:", error);
      });
  }

  return (
    <button className="flex items-center space-x-2" onClick={handleLikeClick}>
      <span role="img" aria-label="like" className="text-2xl">
        {liked ? (
          <AiFillLike size={25} color="blue" />
        ) : (
          <AiOutlineLike size={25} color="black" />
        )}
      </span>
      <span className="text-black font-bold">{numOfLikes}</span>
    </button>
  );
}

export function PostStats({ post }) {
  {
    /* Like, Comment, Bookmark Buttons */
  }
  return (
    <div className="flex items-center justify-around pt-2">
      <LikeButton post={post} />
      <BookmarkButton post={post} />
      <CommentButton post={post} />
    </div>
  );
}

BookmarkButton.propTypes = blogPostSchema;
LikeButton.propTypes = blogPostSchema;
PostStats.propTypes = blogPostSchema;
CommentButton.propTypes = blogPostSchema;
