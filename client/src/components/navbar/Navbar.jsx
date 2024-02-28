import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import './navbar.scss';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutNavbar = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="home-link">
          <Link className="link" to="/?cat=art"><h2>Home page</h2></Link>
        </div>
        {currentUser ? 
          <div className="greet">
            <span>Hello </span> 
            <span>{currentUser.username}</span> {" "}
            <span>{currentUser.usersurname}</span>
          </div>
          : null}
        {currentUser ? (
          <span onClick={logoutNavbar}>Logout</span>
        ) : (
          <Link className="link" to="/login">
            Login
          </Link>
        )}
        <span className="write">
          <Link className="link" to="/write">
            Write
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Navbar;