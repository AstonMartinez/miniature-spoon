import "./Footers.css";

const LoggedInFooter = () => {
  return (
    <div className="footer-style-1">
      <div className="footer-1-inner">
        <div id="footer-1-left" className="one-third-footer"></div>
        <div id="footer-1-mid" className="one-third-footer">
          <img
            src="https://i.ibb.co/g7S0xLw/readinglogo-Photo-Room.png"
            alt="readinglogo"
            border="0"
            id="footer-logo"
          />
        </div>
        <div id="footer-1-right" className="one-third-footer"></div>
      </div>
    </div>
  );
};

export default LoggedInFooter;
