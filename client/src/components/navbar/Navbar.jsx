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
        <div className="navbar__home-link">
          <Link className="link" to="/?cat=art"><h2>Home page</h2></Link>
        </div>
        <div className="grid-wrap">
          {currentUser ? 
            <div className="navbar__greet">
              <span>Hello </span> 
              <span>{currentUser.username}</span> {" "}
              <span>{currentUser.usersurname}</span>
              <span>!</span>
            </div>
            : null}
          {currentUser ? (
            <>
              <div className="navbar__link">
                <div className="navbar__logout-btn" onClick={logoutNavbar}>Logout</div>
              </div>
              <div className="navbar__link navbar__write-btn">
                <Link to="/write">
                  Write post
                </Link>
              </div>
            </>
          ) : (
            <div className="navbar__link">
              <Link className="navbar__login-btn" to="/login">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;