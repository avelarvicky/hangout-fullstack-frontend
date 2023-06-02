import React from "react";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../Context/auth.context";


import "./styles.css";
import "../Button/button.css";

function NavBar() {
  const [isHovered, setIsHovered] = useState(false);
  const [text, setText] = useState("");
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const handleMouseEnter = () => {
    setIsHovered(true);

    const text = "home";

    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

    const text = "home";

    let currentIndex = text.length;

    const interval = setInterval(() => {
      if (currentIndex > 0) {
        setText(text.slice(0, currentIndex - 1));
        currentIndex--;
      } else {
        clearInterval(interval);
      }
    }, 100);
  };

  return (
    <nav className="navbar">
      <div className="navbar-standard">
        <Link to="/">
          <button
            className={`btn ${isHovered ? "hovered" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src="/images/home.png"
              style={{
                width: "20px",
                marginLeft: "3px",
                marginRight: "3px",
                flexDirection: "row",
              }}
              alt="Home"
            />
            <span className="btn-text">{text}</span>
          </button>
        </Link>

        {/* NON-MVP */}
        {isLoggedIn ? (
          <div>
            <div>
              <Link to="/explore">
                <button className="btn">
                  <p>Explore</p>
                </button>
              </Link>
            </div>
            <div className="navbar-loggedin">
              <Link to="/hangouts">
                <button className="btn">
                  <p>Your HangOuts</p>
                </button>
              </Link>
              <Link to="/hangouts/create">
                <button className="btn">
                  <p>New HangOut</p>
                </button>
              </Link>
              <button onClick={logOutUser}>Logout</button>
              <p>{user && user.name}</p>
            </div>
          </div>
        ) : (
          <div>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;