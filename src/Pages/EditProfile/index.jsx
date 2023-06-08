import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProfilePage() {
	const storedToken = localStorage.getItem("authToken");

	const [bio, setBio] = useState("");
	const [profileImg, setProfileImg] = useState("");

    const [userData, setUserData] = useState(null);

	const navigate = useNavigate();

    const handleUpload = async (e) => {
		try {
			//formData === enctype=multipart/formdata
			const uploadData = new FormData();

			//add the file to the formData
			uploadData.append("image", e.target.files[0]);
			const response = await axios.post(
				`${import.meta.env.VITE_APP_API_URL}/api/upload`,
				uploadData
			);
			setProfileImg(response.data.fileUrl);
		} catch (error) {
			console.log(error);
		}
	};

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

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();

			const requestBody = {
				bio,
				profileImg,
			};

			console.log(requestBody);

			const response = await axios.post(
				`${import.meta.env.VITE_APP_API_URL}/auth/userprofile/edit`,
				{
					headers: { Authorization: `Bearer ${storedToken}` },
				},
				requestBody
			);

			setBio(!response.data.bio ? "" : response.data.bio);
			setProfileImg(
				!response.data.profileImg ? "" : response.data.profileImg
			);

			navigate("/userprofile");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h1>Welcome, {userData && userData.name}</h1>

			<form onSubmit={handleSubmit}>
				<textarea
					name="bio"
					value={bio}
					onChange={(e) => setBio(e.target.value)}
				/>

				<label htmlFor="image">
					<input type="file" onChange={(e) => handleUpload(e)} />
				</label>

				<button type="submit">Post HangOut</button>
			</form>
		</div>
	);
}

export default EditProfilePage;
