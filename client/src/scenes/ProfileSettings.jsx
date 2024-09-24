import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import axios from "axios";
import { PasswordChange } from "../components/PasswordChange";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

export function ProfileSettings() {
  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    email: "",
    profilePicture: "",
  });
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const url = "http://127.0.0.1:3000/users/profile";
  const [togglePwdProfile, setTogglePwdProfile] = useState(true);

  useEffect(() => {
    const options = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
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

  function handleRemoveImage() {
    setProfile((prevProfile) => ({
      ...prevProfile,
      profilePicture: "",
    }));
    setImagePreview(null);
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
    setError("");
    if (loading || pending) return;
    const formData = new FormData();
    formData.append("firstname", profile.firstname);
    formData.append("lastname", profile.lastname);
    formData.append("email", profile.email);
    if (profile.profilePicture) {
      formData.append("image", profile.profilePicture);
    }
    setPending(true);
    axios
      .put(url, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setSuccess(true);
        setTimeout(() => (window.location.href = "/profile"), 3000);
      })
      .catch((err) => {
        setPending(false);
        setError(err);
      });
  }

  function changePasword(e) {
    e.preventDefault();
    setTogglePwdProfile(!togglePwdProfile);
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="text-center mt-10">Loading...</div>
      </>
    );
  }

  // if (error) {
  //   return (
  //     <div className="text-red-500 text-center">Error: {error.message}</div>
  //   );
  // }

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto -mt-2 p-5">
        <div className="bg-white shadow-lg rounded-lg px-8 py-4">
          <h2 className="text-2xl font-semibold">
            {togglePwdProfile ? "Edit Profile" : "Change Password"}
          </h2>
          {togglePwdProfile ? (
            <form onSubmit={handleSubmit}>
              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                <label htmlFor="profilePicture" className="cursor-pointer">
                  <img
                    src={
                      imagePreview ||
                      profile.profilePicture ||
                      "/default-avatar.png"
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
              <div className="h-10">{error ? <p>{error}</p> : <br />}</div>

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
              <div className="mt-6 flex justify-between">
                <div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:outline-none"
                  >
                    Save Changes
                  </button>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="px-6 py-2 ml-6 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:outline-none"
                    >
                      Remove Image
                    </button>
                  )}
                </div>
                <button
                  onClick={changePasword}
                  className="px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 focus:outline-none"
                >
                  Change Password
                </button>
              </div>
            </form>
          ) : (
            <PasswordChange toogleEditPasswordProfile={setTogglePwdProfile} />
          )}
        </div>
        <div
          className={`w-80 h-auto z-30 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col justify-center items-center bg-white rounded-lg shadow-2xl p-4 border border-gray-300
           transition-transform duration-500 ease-in-out ${
             Boolean(success) === true
               ? "translate-y-50 opacity-100"
               : "-translate-y-96 opacity-0"
           }`}
        >
          <IoCheckmarkDoneCircle size={50} color="#22c55e" />
          <p className="text-green-500 mt-1">Profile updated successfully!</p>
          <p className="text-sm mt-1">You will be redirected soon</p>
        </div>
      </div>
    </>
  );
}
