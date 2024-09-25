import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { isUserOwner, request } from '../util/Tools';
import { Comments } from './Comments';
import { useSelector } from 'react-redux';
import { PostOptions } from './PostOptions';
import { BookmarkButton, LikeButton } from './PostStats';
import { FaRegComment } from 'react-icons/fa';

export function ReadPost({ post_title }) {
  const href = useSelector((state) => state?.auth?.user?.href);
  const [post, setPost] = useState('');
  const commentsRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await request.get(
        `http://127.0.0.1:3000/blogs/h/${post_title}`
      );
      setPost(data.data.post);
    };
    fetchData();
  }, [post_title]);

  if (!post) {
    // if post is not found in mapped due to async fetch of data
    return (
      <div className="text-center font-bold text-lg font-poppins">
        Loading...
      </div>
    );
  }

  const scrollToComments = () => {
    if (commentsRef.current) {
      commentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div className="relative z-30 mb-10">
        <div>
          <div className="flex items-center gap-10 pt-2">
            <LikeButton post={post} />
            <button
              className="flex items-center space-x-2"
              onClick={scrollToComments}>
              <span
                role="img"
                aria-label="comment"
                className="text-2xl">
                <FaRegComment
                  size={25}
                  color="black"
                />
              </span>
              <span className="text-black font-bold">Comment</span>
            </button>
          </div>
          <BookmarkButton post={post} />
        </div>
        {isUserOwner(href, post.user.href) && (
          <PostOptions
            postId={post._id}
            redirectTo="/"
          />
        )}
      </div>
      <div className="col-span-2 whitespace-pre-wrap relative z-20">
        <h5
          className="text-3xl font-bold text-center mb-5 px-4 overflow-wrap-break-word"
          style={{ overflowWrap: 'break-word', wordWrap: 'break-word' }}>
          {post.title}
        </h5>
        <div>
          {post.cover?.image && (
            <img
              src={post.cover?.image}
              className="w-auto h-auto"
            />
          )}
        </div>
        <p
          className="whitespace-pre-wrap font-serif text-[#333333] font-bold
      border-t-2 border-gray-500 pt-5 mt-5">
          {post.text}
        </p>
        <div ref={commentsRef}>
          <Comments post={post} />
        </div>
      </div>
    </div>
  );
}

ReadPost.propTypes = {
  post_title: PropTypes.string.isRequired,
};
