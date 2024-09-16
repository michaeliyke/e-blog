import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { request } from '../util/Tools';
import { Comments } from './Comments';

export function ReadPost({ post_title }) {
  const [post, setPost] = useState('');
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
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p>{post.text}</p>
      <Comments post={post} />
    </div>
  );
}

ReadPost.propTypes = {
  post_title: PropTypes.string.isRequired,
};
