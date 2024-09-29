import { useState } from 'react';
import PropTypes from 'prop-types';
import { useIsUserOwnPost } from '../util/basic';
import { request } from '../util/Tools';
import moment from 'moment';
import { Reply } from './ReplyToComment';

export function CommentComponent({ comment, post, onDelete, onEdit }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);

  const isOwner = useIsUserOwnPost(comment);
  const path = `blogs/${post.post._id}/comments/${comment._id}`;
  const url = `http://127.0.0.1:3000/${path}`;

  function handleDeleteClick() {
    setIsDeleting(true);
  }

  function handleCancelDelete() {
    setIsDeleting(false);
  }

  function handleConfirmDelete() {
    // DELETE /blogs/:postId/comments/:commentId : Delete a comment
    request
      .delete(url)
      .then(() => {
        onDelete(comment._id);
      })
      .catch((err) => {
        console.error('Error deleting comment: ', err.response);
      });
    setIsDeleting(false); // Dismiss the modal after confirming
  }

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    // console.log('Updated Comment: ', editedText);
    request
      .put(url, { text: editedText })
      .then(() => {
        onEdit(comment._id, editedText);
      })
      .catch((err) => {
        console.error('Error updating comment: ', err.response);
      });
    setIsEditing(false);
  }

  return (
    <div className="flex space-x-4 bg-gray-100 p-4 rounded-lg shadow-sm">
      <div className="flex-shrink-0">
        <img
          src={comment.user.profilePicture.thumbnail}
          alt="User avatar"
          className="w-12 h-12 rounded-full mr-3 hover:opacity-80 transition duration-200"
          width={48}
          height={48}
        />
      </div>
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <h3 className="text-lg mb-4 font-medium">
            <a
              href={isOwner ? '/profile' : comment.user.href}
              className="text-blue-500 hover:underline">
              {comment.user.firstname} {comment.user.lastname}
            </a>
            <p className="text-xs text-gray-500">
              {moment(comment.createdAt).fromNow()}
            </p>
          </h3>
          {/* <p className="text-xs text-gray-500">2 days ago</p> */}
          {!isDeleting && !isEditing && isOwner && (
            <div className="flex space-x-2 text-sm text-gray-400">
              <button
                onClick={handleEditClick}
                className="flex items-center space-x-1 hover:text-blue-500 transition duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7.05 10.12a1 1 0 00-.263.435l-1 4a1 1 0 001.264 1.264l4-1a1 1 0 00.435-.263l7.536-7.536a2 2 0 000-2.828l-1.414-1.414z" />
                </svg>
                <span>Edit</span>
              </button>
              <button
                onClick={handleDeleteClick}
                className="flex items-center space-x-1 hover:text-red-500 transition duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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

        {/* Editing form */}
        {isEditing ? (
          <form
            onSubmit={handleEditSubmit}
            className="mt-2 space-y-2">
            <textarea
              className="w-full border p-2 rounded-lg"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
            <button
              type="submit"
              className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
              Save
            </button>
            <button
              type="button"
              className="text-gray-500 hover:underline"
              onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </form>
        ) : (
          <div>
            {/* Display comment text if not editing */}
            <p className="text-gray-700 text-base">{comment.text}</p>
          </div>
        )}

        <Reply
          isEditing={isEditing}
          isDeleting={isDeleting}
          comment={comment}
        />

        {/* Delete Confirmation */}
        {isDeleting && (
          <div className="mt-2 space-x-4">
            <button
              className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              onClick={handleConfirmDelete}>
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
  );
}

CommentComponent.propTypes = {
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  post: PropTypes.shape({
    post: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  comment: PropTypes.shape({
    createdAt: PropTypes.string,
    _id: PropTypes.string.isRequired,
    postId: PropTypes.string,
    user: PropTypes.shape({
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      profilePicture: PropTypes.shape({
        thumbnail: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};
