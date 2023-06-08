import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import axios from "axios";

function EditProfilePage() {
	const storedToken = localStorage.getItem("authToken");

    const { user } = useContext(AuthContext);

	const [bio, setBio] = useState("");
	const [profileImg, setProfileImg] = useState("");

	const navigate = useNavigate();

    /* const handleUpload = async (e) => {
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
	}; */

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();

			const response = await axios.post(
                `${import.meta.env.VITE_APP_API_URL}/auth/userprofile/edit`,
                {
                    bio: bio,
                    profileImg: profileImg
                },
				{
					headers: { Authorization: `Bearer ${storedToken}` },
				},
			);

            console.log(response.data)

			navigate("/userprofile");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h1>Welcome,</h1>

			<form onSubmit={handleSubmit}>
				<textarea
					name="bio"
					value={bio}
					onChange={(e) => setBio(e.target.value)}
				/>

				{/* <label htmlFor="image">
					<input type="file" onChange={(e) => handleUpload(e)} />
				</label> */}

				<button type="submit">Save Changes</button>
			</form>
		</div>
	);
}

export default EditProfilePage;
