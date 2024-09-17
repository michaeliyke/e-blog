import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { useNavigate } from 'react-router-dom';

export function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = 'http://127.0.0.1:3000/users/profile';
  const navigate = useNavigate();

  useEffect(function cb() {
    const options = {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">Error: {error.message}</div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto mt-14 p-5">
        {profile && profile.user ? (
          <div className="bg-white relative shadow-lg rounded-lg p-8">
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-16">
              {/* Profile image */}
              <img
                src={
                  profile.user.profilePicture.thumbnail || '/default-avatar.png'
                }
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white"
              />
            </div>

            {/* Edit profile button */}
            <button
              onClick={() => navigate('/profile/settings')}
              className="absolute top-6 right-6 bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none">
              Edit profile
            </button>

            {/* User info */}
            <div className="flex items-center flex-col my-14">
              <h2 className="text-2xl font-semibold">
                {profile.user.firstname} {profile.user.lastname}
              </h2>
              <p className="text-gray-600">{profile.user.email}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No profile data found.</p>
        )}
      </div>
    </>
  );
}
