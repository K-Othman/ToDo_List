import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="flex justify-between my-4 ">
      <Link to="/" className="font-bold text-lg ml-8">
        <h1>ToDay</h1>
      </Link>
      <div className="flex items-center gap-4 ">
        <button onClick={handleLogout}>Logout</button>
        <Link to="/register">
          <h1>Start for free</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
