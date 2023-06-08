import { useState, useEffect } from "react";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import EditProfilePage from "../EditProfile";

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
				console.log(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		getUserData();
	}, []);

	return (
		<div>
			<h1>Welcome, {userData && userData.name}</h1>

			<Link to={"/userprofile/edit"}>Edit Profile</Link>
		</div>
	);
}

export default YourProfilePage;
