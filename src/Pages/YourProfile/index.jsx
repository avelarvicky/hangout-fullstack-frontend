import { useState, useEffect } from "react";

import axios from "axios";

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
			<p>Welcome, {userData && userData.name}</p>
		</div>
	);
}

export default YourProfilePage;
