import { FaHeart, FaCopyright } from "react-icons/fa";
import { GrReactjs } from "react-icons/gr";

function Footer() {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div className="col-md-4 d-flex align-items-center">
        <span className="text-muted"><FaCopyright/> 2021 IMDB Inc.</span>
      </div>
      <p>Made with <FaHeart/> using <GrReactjs/></p>
    </footer>
  );
}

export default Footer;
