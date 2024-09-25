import { Header } from "../components/Header";
import { NavDock } from "../components/NavDock";
import { Trending } from "../components/Post/Trending";
import { RightSide } from "../components/RightSide";

export const TrendingPage = () => {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="grid grid-cols-1 justify-evenly sm:grid-cols-[100%] md:grid-cols-[20%_70%] lg:grid-cols-[18%_60%_18%] gap-5 p-5">
        <div className="hidden sm:hidden md:block py-4">
          <NavDock />
        </div>

        {/* post container */}
        <div className="px-8 rounded-lg z-10">
          <Trending />
        </div>

        {/* right container */}
        <div className="hidden lg:block">
          <RightSide />
        </div>
      </div>
      <footer></footer>
    </div>
  );
};
