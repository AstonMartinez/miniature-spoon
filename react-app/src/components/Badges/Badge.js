import "./Badges.css";

const Badge = ({ badgeInfo }) => {
  return (
    <div className="badge-wrapper">
      <div className="badge-title">
        <h4>{badgeInfo.title}</h4>
      </div>
      <div className="badge-image-holder">
        <img
          className="badge-image"
          style={{ height: badgeInfo.height, width: badgeInfo.width }}
          src={badgeInfo.url}
          alt="badge"
        />
      </div>
      <div className="badge-description">
        <p>{badgeInfo.description}</p>
      </div>
    </div>
  );
};

export default Badge;
