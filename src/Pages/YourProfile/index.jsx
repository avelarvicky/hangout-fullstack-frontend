import { useState, useEffect } from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import EditProfilePage from "../EditProfile";

import "./profile.css";

function YourProfilePage() {
	const storedToken = localStorage.getItem("authToken");

	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const getUserData = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_APP_API_URL}/auth/userprofile`,
					{
						headers: { Authorization: `Bearer ${storedToken}` },
					}
				);
				setUserData(response.data);
				console.log(userData);
			} catch (error) {
				console.log(error);
			}
		};
		getUserData();
	}, []);

	return (
		<div className="login-page">
			{userData && (
				<div>
					<div className="welcome">
						<h1>Welcome, {userData.name}.</h1>
					</div>
					<div className="form">
						<div>
							{userData.profileImg && (
								<div className="profile-image-container">
									<img
										src={userData.profileImg}
										alt="Profile Picture"
										className="profile-image"
									/>
								</div>
							)}
						</div>
						<div>
							<h6>{userData.name}</h6>
							<p>{userData.bio}</p>
							<Link
								to={"/userprofile/edit"}
								style={{ textDecoration: "none" }}
							>
								<button className="login-btn"> Edit Profile </button>
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default YourProfilePage;
