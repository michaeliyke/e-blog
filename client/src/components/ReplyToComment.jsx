import { useState } from 'react';
import PropTypes from 'prop-types';

export function Reply({ comment }) {
  const [replyText, setReplyText] = useState('');
  const [replyId, setReplyId] = useState(null);

  function handleReplyClick(commentId) {
    setReplyId(replyId === commentId ? null : commentId);
  }

  function handleReplySubmit(commentId) {
    console.log(`Reply submitted for comment ${commentId}: ${replyText}`);
    setReplyText('');
    setReplyId(null);
  }

  return (
    <>
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

Reply.propTypes = {
  replyId: PropTypes.string,
  setReplyId: PropTypes.func,
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    replies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        text: PropTypes.string,
        user: PropTypes.shape({
          firstname: PropTypes.string,
          lastname: PropTypes.string,
          href: PropTypes.string,
        }),
      })
    ),
  }).isRequired,
};
