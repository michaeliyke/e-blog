import { useState, useEffect } from 'react';

export function Comments(post) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">Error: {error.message}</div>
    );
  }

  console.log(post);

  const comments = [
    {
      author: 'John Doe',
      avatar: 'https://i.ibb.co/C5V20xt/image.jpg',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae metus ac nisl hendrerit lacinia. Nulla facilisi.',
    },
    {
      author: 'Jane Smith',
      avatar: 'https://i.ibb.co/C5V20xt/image.jpg',
      comment:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae metus ac nisl hendrerit lacinia. Nulla facilisi.',
    },
  ];

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
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Submit
            </button>
          </div>
        </div>

        {/* Dummy comments */}
        {comments.map((comment, index) => (
          <div
            key={index}
            className="flex space-x-4">
            <div className="flex-shrink-0">
              <img
                src={comment.avatar}
                alt="User avatar"
                className="w-10 h-10 rounded-full mr-3"
                width={40}
                height={40}
              />
            </div>
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{comment.author}</h3>
              </div>
              <p className="text-gray-600">{comment.comment}</p>
              <button className="text-blue-500 hover:underline">Reply</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
