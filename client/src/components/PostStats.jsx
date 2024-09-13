import { useState } from "react";
import { AiOutlineLike, AiFillLike, AiOutlineStar } from "react-icons/ai"; // Add AiFillLike for the filled icon
import { FaRegComment } from "react-icons/fa";
import { urlenCode, blogPostSchema } from "../util/basic";

function CommentButton({post}) {
	post.numOfComments = post.numOfComments || 0;
	const [numOfComments, setNumOfComments] = useState(post.numOfComments);

	function gotToComments() {
		window.location = `/posts/${urlenCode(post.title)}`;
	}

  return (
	  <button className="flex items-center space-x-2"
	  onClick={gotToComments}
	  >
          <span role="img" aria-label="comment" className="text-2xl">
            <FaRegComment size={25} color="black" />
          </span>
          <span className="text-black font-bold">Comment</span>
        </button>
  );
}


function BookmarkButton({post}) {
	post.bookmarked = post.bookmarked || false;
	const [bookmarked, setBookmarked] = useState(post.bookmarked);

  function handleBookmark() {
    setBookmarked(!bookmarked);
  }

  return (
      <button className="flex items-center space-x-2" onClick={handleBookmark}>
        <AiOutlineStar size={25} color={bookmarked ? "yellow" : "black"} />
        <span className="text-black font-bold">{bookmarked ? "Bookmarked" : "Bookmark"}</span>
      </button>
  );
}

function LikeButton({post}) {
	post.numOfLikes = post.numOfLikes || 0;
	const [liked, setLiked] = useState(false);
	const [numOfLikes, setNumOfLikes] = useState(post.numOfLikes);

  function handleLikeClick() {
	setLiked(!liked);
	setNumOfLikes(liked ? numOfLikes - 1 : numOfLikes + 1);
	// api calls: PUST/POST to update the backend with numOfLikes
  }

  return (
	<button className="flex items-center space-x-2" onClick={handleLikeClick}>
		<span role="img" aria-label="like" className="text-2xl">
            {liked ? <AiFillLike size={25} color="blue" /> : <AiOutlineLike size={25} color="black" />}
          </span>
		<span className="text-black font-bold">{numOfLikes}</span>
	</button>
  );
}

export function PostStats ({ post }) {
  {/* Like, Comment, Bookmark Buttons */}
  return (
      <div className="flex items-center justify-around pt-2">
		<LikeButton post={post} />
		<BookmarkButton post={post} />
		<CommentButton post={post} />
      </div>
  );
};



BookmarkButton.propTypes = blogPostSchema;
LikeButton.propTypes = blogPostSchema;
PostStats.propTypes = blogPostSchema;
CommentButton.propTypes = blogPostSchema;
