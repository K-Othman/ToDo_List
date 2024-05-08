import React from "react";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Clear any stored authentication data from local storage or cookies
    // Example: localStorage.removeItem("authToken");

    // Redirect the user to the login page
    history.push("/");
  };

  return (
    <div>
      <h2>Are you sure you want to logout?</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
