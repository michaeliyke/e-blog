import { TrendingCard } from "./TrendingCard";
import { TrendingTagsCard } from "./TrendingTagsCard";

export const RightSide = () => {
  return (
    <div className="space-y-5 hidden xl:block">
      <TrendingCard />
      <TrendingTagsCard />
    </div>
  );
};
