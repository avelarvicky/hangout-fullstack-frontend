import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../Context/auth.context";

import "./styles.css";
import "../Button/button.css";

function NavBar() {
	const [isHovered, setIsHovered] = useState(false);
	const [text, setText] = useState("");
	const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
	const navigate = useNavigate();

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

	const handleLogout = () => {
		logOutUser();
		navigate("/");
	};

	return (
		<nav className="navbar">
			<div className="left">
				<h1 className="logo">HangOut</h1>
				<Link to="/" style={{ textDecoration: 'none' }}>
					<button
						className={`btn ${isHovered ? "hovered" : ""}`}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						style={{ textDecoration: 'none' }}
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
			</div>

			{/* NON-MVP */}
			{isLoggedIn ? (
				<div className="navbar-loggedin">
					<div>
						<Link to="/explore" style={{ textDecoration: 'none' }}>
							<button className="btn">
								<p>Explore</p>
							</button>
						</Link>
					</div>
					<div>
						<Link to="/hangouts" style={{ textDecoration: 'none' }}>
							<button className="btn">
								<p>Friends' HangOuts</p>
							</button>
						</Link>
					</div>
					<div>
						<Link to="/hangouts/create" style={{ textDecoration: 'none' }}>
							<button className="btn">
								<p>New HangOut</p>
							</button>
						</Link>
					</div>
					<div>
						<Link to={`/userprofile`} style={{ textDecoration: 'none' }}>
							<button className="btn">
								<p>View Profile</p>
							</button>
						</Link>
					</div>
					<div>
						<button onClick={handleLogout} className="btn logout">
							Logout
						</button>
						{/* <p>{user && user.name}</p> */}
					</div>
				</div>
			) : (
				<div className="navbar-loggedin">
					<div>
					<Link to="/signup" style={{ textDecoration: 'none' }}>
						<button className="btn">Sign Up</button>
					</Link>

					</div>
					<div>
					<Link to="/login" style={{ textDecoration: 'none' }}>
						<button className="btn">Login</button>
					</Link>

					</div>
				</div>
			)}
		</nav>
	);
}

export default NavBar;
