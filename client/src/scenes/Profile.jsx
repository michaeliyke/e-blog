import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../util/Tools";
import { PopUpPassword } from "../components/PopUpPassword";
import { AllUserPosts } from "../components/AllUserPosts";

export function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toggleVerifyDelete, setToggleVerifyDelete] = useState(false);
  const [error, setError] = useState(null);

  const { slug } = useParams();

  let url = "http://127.0.0.1:3000/users/profile";
  if (slug) url = `http://127.0.0.1:3000/users/info/?slug=${slug}`;

  const navigate = useNavigate();

  useEffect(
    function cb() {
      request
        .get(url)
        .then((res) => {
          if (!res.statusText == "OK")
            throw new Error("Failed to fetch profile data");
          return res.data;
        })
        .then((data) => {
          if (data.user == null) data.user = data;
          //   console.dir(data);
          setProfile(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error message:", error);
          setError(error);
          setLoading(false);
        });
    },
    [url]
  );

  const verifyDeleteAccount = () => {
    setToggleVerifyDelete(!toggleVerifyDelete);
  };

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
        {profile ? (
          <div className="bg-white relative shadow-lg rounded-lg p-8">
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-16">
              {/* Profile image */}
              <img
                src={
                  profile.user.profilePicture.medium || "/default-avatar.png"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white"
              />
            </div>
            {/* Edit profile button */}
            {Boolean(slug) === false && (
              <div className="absolute top-6 right-6 flex flex-col gap-4">
                <button
                  onClick={() => navigate("/profile/settings")}
                  className=" bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none active:bg-blue-400"
                >
                  Edit profile
                </button>
                <button
                  onClick={verifyDeleteAccount}
                  className=" bg-red-700 hover:bg-red-800 active:bg-red-400 text-white px-4 py-2 rounded-md  focus:outline-none"
                >
                  Delete account
                </button>
              </div>
            )}

            {/* User info */}
            <div className="flex items-center flex-col my-14">
              <h2 className="text-2xl font-semibold">
                {profile.user.firstname} {profile.user.lastname}
              </h2>
              {profile.user.email ? (
                <p className="text-gray-600">{profile.user.email}</p>
              ) : null}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No profile data found.</p>
        )}
        <div className="w-full rounded-lg mt-4 flex justify-center">
          <AllUserPosts />
        </div>
      </div>
      <PopUpPassword
        visible={toggleVerifyDelete}
        toggle={setToggleVerifyDelete}
      />
    </>
  );
}
