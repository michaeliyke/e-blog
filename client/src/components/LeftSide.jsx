import { NavDock } from "./NavDock";
import { WelcomeSideMessage } from "./WelcomeSideMessage";

export const LeftSide = () => {
  return (
    <div className="space-y-5 mt-4">
      <WelcomeSideMessage />
      <NavDock />
    </div>
  );
};
