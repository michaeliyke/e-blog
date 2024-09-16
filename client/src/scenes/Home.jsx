import { Header } from "../components/Header";
import { LeftSide } from "../components/LeftSide";
import { RightSide } from "../components/RightSide";
import { MiddleSide } from "../components/MiddleSide";

export const Home = () => {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="flex gap-4 py-4 px-8 justify-center">
        <LeftSide />
        <MiddleSide />
        <RightSide />
      </div>
      <footer></footer>
    </div>
  );
};
