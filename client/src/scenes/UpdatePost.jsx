import { UpdateAPost } from "../components/UpdateAPost";
import { Header } from "../components/Header";

export const UpdatePost = () => {
  return (
    <div className="w-full h-screen bg-white flex flex-col">
      <Header />
      <div className="border-2 flex-1">
        <UpdateAPost />
      </div>
      <footer></footer>
    </div>
  );
};
