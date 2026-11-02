import _404 from "../assets/404.png";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Oops!!! That page took a wrong turn.</h2>
      <img src={_404} alt="404 illustration" />
      <div>
        <Link to="/" className="btn-primary">
          Home
          <i className="fa-solid fa-house" aria-hidden="true"></i>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
