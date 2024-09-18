// 404 - Page Not Found
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <div className="max-w-lg">
        <img
          src="https://via.placeholder.com/400x300?text=404+Not+Found"
          alt="404 illustration"
          className="w-full h-auto mb-8"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-700 text-white text-lg font-semibold rounded-md hover:bg-blue-800 transition duration-300">
          Home Page
        </Link>
      </div>
    </div>
  );
}

// Redirect to NotFoundPage after a tiny delay
// Allows navigating back to teh last visited page after a 404 redirect.
function NotFoundRedirect() {
  const [redirect, setRedirect] = useState(false);

  //   Delay the redirect for a tiny bit of time
  useEffect(() => {
    const timer = setTimeout(() => {
      setRedirect(true);
    }, 1700);
    return () => clearTimeout(timer); // Clear the timer
  }, []);

  if (redirect) return <Navigate to="/404" />;

  return null;
}

export { NotFoundRedirect, NotFoundPage };
