import { Header } from "../components/Header";
import { CreateAPost } from "../components/CreateAPost";

export const CreatePost = () => {
  return (
    <div className="w-full h-screen bg-white flex flex-col">
      <Header />
      <div className="border-2 flex-1">
        <CreateAPost />
      </div>
      <footer></footer>
    </div>
  );
};
