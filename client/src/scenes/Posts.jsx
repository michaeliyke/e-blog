import { Header } from "../components/Header";
import { ReadPost } from "../components/ReadPost";
import { useParams } from "react-router-dom";
import { Comments } from "../components/Comments";
import { useState } from "react";
import { PostLeftSide } from "../components/Post/PostLeftSide";

export function Posts() {
  const { post_title } = useParams();
  const [toggleBg, setToggleBg] = useState(false);

  const handleToggle = () => {
    // toggle reading mode
    setToggleBg((prev) => !prev);
  };

  return (
    <div className="w-full h-full">
      <div
        className={`fixed z-10 bg-black opacity-70 w-full h-screen ${
          toggleBg ? "block" : "hidden"
        }`}
      ></div>
      <Header />
      <div className="grid grid-cols-1 justify-evenly sm:grid-cols-[80%] md:grid-cols-[20%_70%] lg:grid-cols-[18%_60%_18%] gap-5 p-5">
        <div className="hidden sm:hidden md:block bg-slate-50">
          <PostLeftSide handleToggle={handleToggle} toggleBg={toggleBg} />
        </div>

        {/* post container */}
        <div className="p-8 bg-[#ecfde2] rounded-lg z-10">
          <ReadPost post_title={post_title}>
            <Comments />
          </ReadPost>
        </div>

        {/* right container */}
        <div className="border border-black hidden lg:block"></div>
      </div>
      <footer></footer>
    </div>
  );
}
