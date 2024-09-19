import { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { urlenCode, blogPostSchema } from "../util/basic";
import { request } from "../util/Tools";
import { useDispatch, useSelector } from "react-redux";
import { toggleSignIn } from "../state/appSlice/appSlice";

function CommentButton({ post }) {
  post.numOfComments = post.numOfComments || 0;
  // const [numOfComments, setNumOfComments] = useState(post.numOfComments);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function gotToComments() {
    if (!isAuthenticated) {
      dispatch(toggleSignIn());
      return null;
    }
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

let exec = true;
function BookmarkButton({ post }) {
  const [bookmarked, setBookmarked] = useState(post.saved === true);
  const url = `http://127.0.0.1:3000/users/bookmarks?postId=${post._id}`;
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleBookmark() {
    if (!isAuthenticated) {
      dispatch(toggleSignIn());
      return null;
    }

    request
      .post(url)
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        // console.dir('BookmarkButton:', data);
        setBookmarked(data.liked === true); // === for boolean safety
      })
      .catch((error) => {
        console.error("BookmarkButton:", error);
      });
    setBookmarked(!bookmarked);
  }

  if (exec) exec = console.dir("BookmarkButton:", post);

  return (
    <button className="absolute right-0 top-0" onClick={handleBookmark}>
      {bookmarked ? (
        <FaBookmark size={25} color="blue" />
      ) : (
        <FaRegBookmark size={25} color="black" />
      )}
    </button>
  );
}

function LikeButton({ post }) {
  const [liked, setLiked] = useState(post.liked || false);
  const [numOfLikes, setNumOfLikes] = useState(post.likes.count || 0);
  const url = `http://127.0.0.1:3000/blogs/${post._id}/likes`;
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  function handleLikeClick() {
    if (!isAuthenticated) {
      dispatch(toggleSignIn());
      return null;
    }

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
          <AiFillLike size={25} color="#00aaff" />
        ) : (
          <AiOutlineLike size={25} color="black" />
        )}
      </span>
      <span className="text-black font-bold">{numOfLikes}</span>
    </button>
  );
}

function PostStats({ post }) {
  {
    /* Like, Comment, Bookmark Buttons */
  }
  return (
    <div className="flex items-center justify-around pt-2">
      <LikeButton post={post} />
      <CommentButton post={post} />
    </div>
  );
}

export { CommentButton, BookmarkButton, LikeButton, PostStats };

BookmarkButton.propTypes = blogPostSchema;
LikeButton.propTypes = blogPostSchema;
PostStats.propTypes = blogPostSchema;
CommentButton.propTypes = blogPostSchema;
