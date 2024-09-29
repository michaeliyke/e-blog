import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { request } from '../util/Tools';

function DisplayReplies({ replies }) {
  return (
    <>
      {replies.map((reply) => (
        <div
          key={reply._id}
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
    </>
  );
}

export function Reply({ comment }) {
  const [replyText, setReplyText] = useState('');
  const [replyId, setReplyId] = useState(null);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    request
      .get(`http://127.0.0.1:3000/comments/${comment._id}/replies`)
      .then((response) => {
        setReplies(response.data.replies);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [comment._id]);

  function handleReplyClick(commentId) {
    setReplyId(replyId === commentId ? null : commentId);
  }

  function handleReplySubmit(commentId) {
    if (replyText === '') {
      return;
    }
    console.log(`Reply submitted for comment ${commentId}: ${replyText}`);
    request
      .post(`http://127.0.0.1:3000/comments/${commentId}/replies`, {
        text: replyText,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    setReplyText('');
    setReplyId(null);
  }

  return (
    <>
      <DisplayReplies replies={replies} />
      <button
        className="text-blue-500 hover:underline mt-2"
        onClick={() => handleReplyClick(comment._id)}>
        {replyId === comment._id ? 'Cancel' : 'Reply'}
      </button>

      {replyId === comment._id && (
        <div className="ml-12 mt-2">
          <textarea
            className="w-full h-20 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none"
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}></textarea>
          <button
            type="button"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handleReplySubmit(comment._id)}>
            Submit Reply
          </button>
        </div>
      )}
    </>
  );
}

DisplayReplies.propTypes = {
  replies: PropTypes.array.isRequired,
};

Reply.propTypes = {
  replyId: PropTypes.string,
  setReplyId: PropTypes.func,
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};
