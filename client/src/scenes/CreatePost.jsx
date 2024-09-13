import { Header } from "../components/Header";
import { CreateAPost } from "../components/CreateAPost";

export const CreatePost = () => {
  return (
    <div className="w-full h-full">
      <Header />
      <div className=" ">
        <CreateAPost />
      </div>
      <footer></footer>
    </div>
  );
};
