import achievements from "../../utils/achievements";
import Badge from "./Badge";
import "./Badges.css";

const AllBadges = () => {
  const allAchievements = Object.values(achievements);
  console.log(allAchievements);
  return (
    <div id="all-badges-wrapper">
      {allAchievements.map((badge) => (
        <Badge badgeInfo={badge} />
      ))}
    </div>
  );
};

export default AllBadges;
