import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../util/Tools";
import { PublicUserPosts } from "../components/PublicUserPosts";
import { useSelector } from "react-redux";
import { NavDock } from "../components/NavDock";
import { RightSide } from "../components/RightSide";

export function UsersProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();
  const url = `http://127.0.0.1:3000/users/info?slug=${slug}`;
  const checkSlug = useSelector((state) => state.auth?.user?.href);

  if (checkSlug === slug) navigate("/profile");

  useEffect(
    function cb() {
      request
        .get(url)
        .then((res) => {
          if (!res.statusText == "OK") throw new Error("Failed to fetch data");
          return res.data;
        })
        .then((data) => {
          if (data.user == null) data.user = data;
          //   console.dir(data);
          setUser(data.user);
          console.log(data);
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

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">Error: {error.message}</div>
    );
  }

  return (
    <div className="w-full h-full">
      <Header />
      <div className="grid grid-cols-1 justify-evenly sm:grid-cols-[100%] md:grid-cols-[20%_70%] lg:grid-cols-[18%_60%_18%] gap-5 p-5">
        {/* Left sidebar */}
        <div className="hidden sm:hidden md:block py-4">
          <NavDock />
        </div>

        {/* Main content */}
        <div className="px-8 rounded-lg z-10">
          <div className="max-w-4xl mx-auto mt-14 p-5">
            <div className="bg-white relative shadow-lg rounded-lg p-8">
              <div className="absolute left-1/2 transform -translate-x-1/2 -top-16">
                {/* Profile image */}
                <img
                  src={user.profilePicture.medium || "/default-avatar.png"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white"
                />
              </div>

              {/* User info */}
              <div className="flex items-center flex-col my-14">
                <h2 className="text-2xl font-semibold">
                  {user.firstname} {user.lastname}
                </h2>
              </div>
            </div>
            <div className="w-full rounded-lg mt-4 flex flex-col items-center">
              <div className="flex w-full items-center">
                <hr className="w-full my-0.5 h-1 shadow bg-black" />

                <h4 className="text-lg font-poppins w-auto text-nowrap text-center mx-4">
                  See posts
                </h4>

                <hr className="w-full my-0.5 h-1 shadow bg-black" />
              </div>
              <PublicUserPosts id={user._id} />
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="hidden lg:block">
          <RightSide />
        </div>
      </div>
      <footer></footer>
    </div>
  );
}
