import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { request } from '../util/Tools';
import moment from 'moment';
import { useUserHref, isUserOwnComment } from '../util/basic';

function HandleReplies({ comment, replies, onDelete, onEdit }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedId, setDeletedId] = useState('');
  const [editedId, setEditedId] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState('');
  const userHref = useUserHref();

  const url = (commentId, replyId) => {
    const path = `comments/${commentId}/replies/${replyId}`;
    return `http://127.0.0.1:3000/${path}`;
  };

  function handleDeleteClick(reply) {
    setIsDeleting(true);
    setDeletedId(reply._id);
  }

  function handleCancelDelete() {
    setIsDeleting(false);
    setDeletedId('');
  }

  function handleConfirmDelete(comment, reply) {
    // DELETE /comments/:commentId/replies/:replyId : Delete a reply
    request
      .delete(url(comment._id, reply._id))
      .then(() => {
        onDelete(reply._id);
      })
      .catch((err) => {
        console.error('Error deleting comment: ', err.response);
      });
    setIsDeleting(false); // Dismiss the modal after confirming
    setDeletedId('');
  }

  function handleEditClick(reply) {
    setIsEditing(true);
    setEditedId(reply._id);
    setEditedText(reply.text);
  }

  function handleCancelEdit() {
    setIsEditing(false);
    setEditedId('');
    setEditedText('');
  }

  function handleEditSubmit(comment, reply) {
    // PUT /comments/:commentId/replies/:replyId : Edit a reply
    request
      .put(url(comment._id, reply._id), { text: editedText })
      .then(() => {
        onEdit(reply._id, editedText);
      })
      .catch((err) => {
        console.error('Error updating comment: ', err.response);
      });
    setIsEditing(false);
    setEditedId('');
  }

  return (
    <>
      {replies.map((reply) => (
        <div
          key={reply._id}
          className="flex space-x-4 bg-white mt-1 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src="https://randomuser.me/api/portraits/women/25.jpg"
              alt="User avatar"
              className="w-12 h-12 rounded-full border-2 border-blue-200 shadow-lg hover:opacity-90 transition duration-200"
              width={48}
              height={48}
            />
          </div>

          {/* Main content */}
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              {/* Name and Date */}
              <div>
                <a
                  href={reply?.user?.href}
                  className="text-lg font-semibold text-blue-600 hover:underline">
                  {reply?.user?.firstname} {reply?.user?.lastname}
                </a>
                <p className="text-xs text-gray-400">
                  {moment(reply.createdAt).fromNow()}
                </p>
              </div>

              {/* Edit and Delete buttons */}
              {!isDeleting &&
                !isEditing &&
                isUserOwnComment(reply, userHref) && (
                  <div className="ml-auto flex space-x-3 text-sm">
                    <button
                      onClick={() => handleEditClick(reply)}
                      className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-all duration-200 ease-in-out">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7.05 10.12a1 1 0 00-.263.435l-1 4a1 1 0 001.264 1.264l4-1a1 1 0 00.435-.263l7.536-7.536a2 2 0 000-2.828l-1.414-1.414z" />
                      </svg>
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(reply)}
                      className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-all duration-200 ease-in-out">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 011-1h6a1 1 0 011 1v1h3a1 1 0 110 2h-1v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5H3a1 1 0 110-2h3V2zm3 4a1 1 0 00-1 1v8a1 1 0 102 0V7a1 1 0 00-1-1zm4 1a1 1 0 10-2 0v8a1 1 0 002 0V7z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Delete</span>
                    </button>
                  </div>
                )}
            </div>

            {/* Reply Text */}
            {!isEditing && (
              <p className="mt-2 text-gray-700 leading-relaxed">{reply.text}</p>
            )}

            {/* Editing form */}
            {isEditing && editedId === reply._id && (
              <form
                onSubmit={(e) =>
                  e.preventDefault() && handleEditSubmit(comment, reply)
                }
                className="mt-2 space-y-2">
                <textarea
                  className="w-full border border-gray-300 focus:outline-none p-3 rounded-lg focus:ring-0.5 focus:ring-blue-500 focus:border-blue-500 resize-none transition ease-in-out"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all duration-200 ease-in-out">
                    Save
                  </button>
                  <button
                    type="button"
                    className="text-gray-500 hover:underline"
                    onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Delete Confirmation */}
            {isDeleting && deletedId === reply._id && (
              <div className="mt-2 space-x-4">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200 ease-in-out"
                  onClick={() => handleConfirmDelete(comment, reply)}>
                  Confirm
                </button>
                <button
                  className="text-gray-500 hover:underline"
                  onClick={handleCancelDelete}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export function Reply({ comment, isEditing, isDeleting }) {
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

  function handleReplySubmit(comment) {
    if (replyText === '') {
      return;
    }
    console.log(`Reply submitted for comment ${comment._id}: ${replyText}`);
    request
      .post(`http://127.0.0.1:3000/comments/${comment._id}/replies`, {
        text: replyText,
      })
      .then((response) => {
        console.log(response);
        setReplies([...comment.replies, response.data]);
      })
      .catch((error) => {
        console.error(error);
      });
    setReplyText('');
    setReplyId(null);
  }

  function onDelete(replyId) {
    setReplies(replies.filter((reply) => reply._id !== replyId));
  }

  function onEdit(replyId, text) {
    const updatedReplies = replies.map((reply) => {
      if (reply._id === replyId) {
        reply.text = text;
      }
      return reply;
    });
    setReplies(updatedReplies);
  }

  return (
    <div className="mt-6">
      <HandleReplies
        comment={comment}
        replies={replies}
        onDelete={onDelete}
        onEdit={onEdit}
      />
      {isEditing || isDeleting || (
        <button
          className="text-blue-500 hover:underline mt-2"
          onClick={() => handleReplyClick(comment._id)}>
          {replyId === comment._id ? 'Cancel' : 'Reply'}
        </button>
      )}

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
            onClick={() => handleReplySubmit(comment)}>
            Submit Reply
          </button>
        </div>
      )}
    </div>
  );
}

HandleReplies.propTypes = {
  replies: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

Reply.propTypes = {
  isDeleting: PropTypes.bool,
  isEditing: PropTypes.bool,
  replyId: PropTypes.string,
  setReplyId: PropTypes.func,
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    replies: PropTypes.array,
  }).isRequired,
};
