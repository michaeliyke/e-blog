import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { getCookie } from '../util/basic';

export function Comments(post) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = `http://localhost:3000/blogs/${post.post._id}/comments`;

  function shareComment() {
    const text = document.querySelector('textarea').value;
    const comment = { text: DOMPurify.sanitize(text) }; // sanitize the text
    const token = getCookie('_token');

    if (!token) {
      console.error('No token found');
      return;
    }

    fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(comment),
    })
      .then((res) => res.json())
      .then((data) => {
        setComments([...comments, data.currentComment]);
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
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="space-y-4">
        {/* Comment box */}
        <div className="flex space-x-4">
          <div className="flex-grow">
            <textarea
              className="w-full h-20 p-2 border border-gray-300 rounded"
              placeholder="Write a comment..."></textarea>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={shareComment}>
              Share comment
            </button>
          </div>
        </div>

        {/* Dummy comments */}
        {comments &&
          Array.isArray(comments) &&
          comments.map((comment, index) => (
            <div
              key={index}
              className="flex space-x-4">
              <div className="flex-shrink-0">
                {/* <img
                  src={comment.avatar}
                  alt="User avatar"
                  className="w-10 h-10 rounded-full mr-3"
                  width={40}
                  height={40}
                /> */}
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  {/* <h3 className="text-lg font-medium">{comment.author}</h3> */}
                </div>
                {/* <p className="text-gray-600">{comment.comment}</p> */}
                <button className="text-blue-500 hover:underline">Reply</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
