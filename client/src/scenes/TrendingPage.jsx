import { Header } from "../components/Header";
import { NavDock } from "../components/NavDock";
import { Trending } from "../components/Post/Trending";
import { RightSide } from "../components/RightSide";

export const TrendingPage = () => {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="grid grid-cols-1 justify-evenly sm:grid-cols-[100%] md:grid-cols-[20%_70%] lg:grid-cols-[18%_60%_18%] gap-5 p-5">
        <div className="hidden sm:hidden md:block bg-slate-50">
          <NavDock />
        </div>

        {/* post container */}
        <div className="p-8 bg-[#ecfde2] rounded-lg z-10">
          <Trending />
        </div>

        {/* right container */}
        <div className=" hidden lg:block">
          <RightSide />
        </div>
      </div>
      <footer></footer>
    </div>
    // <div className="w-full h-full">
    //   <Header />
    //   <div className="flex py-4 p-0 sm:px-4 justify-center">
    //     <LeftSide />
    //     <Treanding />
    //     <RightSide />
    //   </div>
    //   <footer></footer>
    // </div>
  );
};
