import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { getCookie } from '../util/basic';
import axios from 'axios';

export function Comments(post) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = `http://127.0.0.1:3000/blogs/${post.post._id}/comments`;

  function shareComment() {
    const text = document.querySelector('textarea');
    const comment = { text: DOMPurify.sanitize(text.value) };
    const token = getCookie('_token');

    if (!token) {
      console.error('No token found');
      return;
    }

    axios
      .post(url, comment, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setComments([...comments, res.data.currentComment]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments.ids);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <></>;
  }

  console.log('comments: ', comments);
  return (
    <div className="mt-8 bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="space-y-6">
        {/* Comment box */}
        <div className="flex space-x-4">
          <div className="flex-grow">
            <textarea
              className="w-full h-24 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none"
              placeholder="Write a comment..."></textarea>
            <button
              className="mt-4 mb-10 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-md hover:shadow-lg transition duration-300"
              onClick={shareComment}>
              Share comment
            </button>
          </div>
        </div>

        {/* Main Comments */}
        {comments &&
          Array.isArray(comments) &&
          comments.map((comment, index) => (
            <div
              key={index}
              className="space-y-4">
              {/* Parent Comment */}
              <div className="flex space-x-4 bg-gray-100 p-4 rounded-lg shadow-sm">
                <div className="flex-shrink-0">
                  <img
                    src="https://randomuser.me/api/portraits/men/75.jpg"
                    alt="User avatar"
                    className="w-12 h-12 rounded-full mr-3 hover:opacity-80 transition duration-200"
                    width={48}
                    height={48}
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">
                      <a
                        href={comment.user.href}
                        className="text-blue-500 hover:underline">
                        {comment.user.firstname} {comment.user.lastname}
                      </a>
                    </h3>
                  </div>
                  <p className="text-gray-700 text-base">{comment.text}</p>
                  <button className="text-blue-500 hover:underline mt-2">
                    Reply
                  </button>
                </div>
              </div>

              {/* Replies (One-Level) */}
              {comment.replies &&
                Array.isArray(comment.replies) &&
                comment.replies.map((reply, replyIndex) => (
                  <div
                    key={replyIndex}
                    className="ml-12 flex space-x-4 bg-gray-50 p-3 rounded-lg">
                    <div className="flex-shrink-0">
                      <img
                        src="https://randomuser.me/api/portraits/women/25.jpg"
                        alt="User avatar"
                        className="w-10 h-10 rounded-full hover:opacity-80 transition duration-200"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h3 className="text-md font-medium">
                          <a
                            href={reply.user.href}
                            className="text-blue-500 hover:underline">
                            {reply.user.firstname} {reply.user.lastname}
                          </a>
                        </h3>
                      </div>
                      <p className="text-gray-600">{reply.text}</p>
                    </div>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
}
