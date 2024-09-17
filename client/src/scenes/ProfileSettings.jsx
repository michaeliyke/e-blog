import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import axios from 'axios';
import { getCookie } from '../util/basic';
import { useNavigate } from 'react-router-dom';

export function ProfileSettings() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    firstname: '',
    lastname: '',
    email: '',
    profilePicture: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const url = 'http://127.0.0.1:3000/users/profile';

  useEffect(() => {
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
        setProfile({
          firstname: data.user.firstname,
          lastname: data.user.lastname,
          email: data.user.email,
          profilePicture: data.user.profilePicture.thumbnail,
        });
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [url]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    setProfile((prevProfile) => ({
      ...prevProfile,
      profilePicture: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('firstname', profile.firstname);
    formData.append('lastname', profile.lastname);
    formData.append('email', profile.email);
    if (profile.profilePicture) {
      formData.append('profilePicture', profile.profilePicture);
    }

    axios
      .put(url, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getCookie('_token')}`,
        },
      })
      .then(() => {
        setSuccess(true);
        setLoading(false);
        setTimeout(() => navigate('/profile'), 3000);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }

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
      <div className="max-w-4xl mx-auto -mt-2 p-5">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            {/* Profile Picture */}
            <div className="flex flex-col items-center">
              <label
                htmlFor="profilePicture"
                className="cursor-pointer">
                <img
                  src={
                    imagePreview ||
                    profile.profilePicture ||
                    '/default-avatar.png'
                  }
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-full mb-4"
                />
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <p className="text-gray-500 mb-4">Click image to change</p>
            </div>

            {/* First Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                value={profile.firstname}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            {/* Last Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastname"
                value={profile.lastname}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:outline-none">
                Save Changes
              </button>
            </div>

            {/* Success message */}
            {success && (
              <p className="text-green-500 mt-4">
                Profile updated successfully!
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
