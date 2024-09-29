import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { CommentComponent } from './CommentComponent';

export function Comments(post) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const url = `http://127.0.0.1:3000/blogs/${post.post._id}/comments`;

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Handler for deleting a comment
  function handleDelete(commentId) {
    const updatedComments = comments.filter(
      (comment) => comment._id !== commentId
    );
    setComments(updatedComments);
  }

  // Handler for editing a comment
  function handleEdit(commentId, updatedText) {
    const updatedComments = comments.map((comment) => {
      if (comment._id === commentId) return { ...comment, text: updatedText };
      return comment;
    });

    setComments(updatedComments);
  }

  function shareComment(event) {
    event.preventDefault();
    // setText(document.querySelector("textarea.comment-box").value);
    const sanitizedText = DOMPurify.sanitize(newComment); // Sanitize the text directly
    const comment = { text: sanitizedText };
    // console.log({ newComment });

    if (!newComment) return;

    axios
      .post(url, comment, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        setNewComment('');
        setComments([
          ...comments,
          {
            ...res.data.currentComment,
            user,
          },
        ]);
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

  const handleComment = (e) => {
    setNewComment(e.target.value);
  };

  return (
    <div className="mt-8 bg-white p-4 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="space-y-6">
        {/* Comment box */}
        {isAuthenticated ? (
          <form className="flex space-x-4">
            <div className="flex-grow">
              <textarea
                className="comment-box w-full h-24 p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500 resize-none"
                placeholder="Write a comment..."
                onChange={handleComment}
                value={newComment}></textarea>
              <button
                className="mt-4 mb-10 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-md hover:shadow-lg transition duration-300"
                onClick={shareComment}>
                Share comment
              </button>
            </div>
          </form>
        ) : (
          <p className="text-gray-600">Please log in to comment</p>
        )}
        {/* Main Comments */}
        {comments &&
          Array.isArray(comments) &&
          comments.map((comment, index) => (
            <div
              key={index}
              className="space-y-4">
              {/* Parent Comment */}
              <CommentComponent
                key={comment.id}
                comment={comment}
                user={user}
                post={post}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
