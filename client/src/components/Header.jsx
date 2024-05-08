import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between my-4">
      <Link to="/">
        <h1>ToDay</h1>
      </Link>
      <div className="flex gap-4">
        <Link to="/logout">Logout</Link>
        <Link to="/register">
          <h1>Start for free</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
