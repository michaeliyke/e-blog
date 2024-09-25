import PropTypes from "prop-types";
import { BookmarkButton, PostStats } from "./PostStats";
import moment from "moment";
import { PostOptions } from "./PostOptions";
import { isUserOwner } from "../util/Tools";

export const PostCard = ({ post, withOptions = false, checkSlug = "" }) => {
  const profileUrl = isUserOwner(post.user.href, checkSlug)
    ? "/profile"
    : `/user/${post.user.href}`;
  return (
    <li className="bg-white mx-2 my-4 p-6 shadow-lg rounded-lg border border-gray-300">
      {/* User Information */}
      <figure className="flex items-center mb-4 relative">
        <a href={profileUrl}>
          <img
            src={post.user.profilePicture.thumbnail}
            alt="User avatar"
            className="w-10 h-10 rounded-full mr-3"
            width={40}
            height={40}
          />
        </a>
        <figcaption>
          <h3 className="font-bold text-gray-700">
            <a href={profileUrl}>
              {post.user.firstname} {post.user.lastname}
            </a>
            <BookmarkButton post={post} />
            {Boolean(withOptions) === true &&
              isUserOwner(post.user.href, checkSlug) && (
                <PostOptions postId={post._id} />
              )}
          </h3>
          {/* <p className="text-xs text-gray-500">2 days ago</p> */}
          <p className="text-xs text-gray-500">
            {moment(post.createdAt).fromNow()}
          </p>
        </figcaption>
      </figure>

      {/* Post Content */}
      <div className="flex items-start max-h-[40%] overflow-clip">
        <div className="flex-1">
          <a href={`/posts/${post.slug}`}>
            {/* Post Title */}
            <h2 className="text-blue-600 text-xl font-[600] mb-2 font-poppins">
              {post.title}
            </h2>
            {/* Post Text */}
            <p className="font-poppins text-sm whitespace-pre-wrap overflow-hidden overflow-ellipsis">
              {post.text}...{" "}
              <span className="text-indigo-400 text-[13px]">
                click to continue reading
              </span>
            </p>
          </a>
        </div>
      </div>
      {post.cover?.medium && (
        <a href={`/posts/${post.slug}`}>
          <img
            className="w-auto mx-auto max-h-[300px] my-3"
            src={post.cover.medium}
            alt="Post cover"
          />
        </a>
      )}

      {/* Impressions and Comments */}
      <div className="flex items-center justify-between text-xs text-gray-500 my-3">
        <p>{post.likes.count} impressions</p>
        <p>{post.comments.count} comments</p>
      </div>

      {/* The tags section */}
      <div className="flex gap-2 justify-start text-gray-400 font-poppins text-[13px]">
        {post.tags.map((tag, index) => (
          <span key={index}>#{tag.name}</span>
        ))}
      </div>

      {/* Like and Comment Buttons */}
      <PostStats post={post} />

      {/* Bookmark Button */}
    </li>
  );
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  withOptions: PropTypes.bool,
  checkSlug: PropTypes.string,
};
