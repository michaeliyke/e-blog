import { Header } from "../components/Header";
import { LeftSide } from "../components/LeftSide";
import { RightSide } from "../components/RightSide";
import { CreateAPost } from "../components/CreateAPost";

export const CreatePost = () => {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="flex gap-4 p-2 justify-center">
        <LeftSide />
        <CreateAPost />
        <RightSide />
      </div>
      <footer></footer>
    </div>
  );
};
