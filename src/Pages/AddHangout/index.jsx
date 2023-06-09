import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import hangoutsService from "../../Services/hangout.service";

import "./styles.css"

// steps:
// 1) create a form;
// 2) connect the input values with state values;
// 3) when changing the input, create handle functions to handle change of inputs;
// 4) create functions that handles form submit;
// 5) inside this function, create a post request via axios

function AddHangout() {
	const [title, setTitle] = useState("New Hangout");
	const [description, setDescription] = useState("");
	const [location, setLocation] = useState("");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [image, setImage] = useState("");
	const [auth, setAuth] = useState("public");

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
			console.log(response.data.fileUrl);
			setImage(response.data.fileUrl);
		} catch (error) {
			console.log(error);
		}
	};

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();

			const requestBody = {
				title,
				description,
				location,
				date /* : `${date.slice(5, 7)}/${date.slice(-2)}/${date.slice(0, 4)}` */,
				time,
				image,
				auth,
			};

			console.log(requestBody);

			await hangoutsService.createHangout(requestBody);

			setTitle("New Hangout");
			setDescription("");
			setLocation("");
			setDate("");
			setImage("");
			setTime("");
			setAuth("public");

			navigate("/hangouts");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="login-page">
			<h3>Create a HangOut!</h3>

			<form onSubmit={handleSubmit} className="form wideform">
				<div className="form-section">
					<label>Title:</label>
					<input
						type="text"
						name="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>

				<div className="form-section">
					<label>Description:</label>
					<textarea
						type="text"
						name="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>

				<div className="form-section">
					<label>Location:</label>
					<textarea
						type="text"
						name="location"
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					/>
				</div>

				<div className="form-row">
					<label>Date:</label>
					<input
						type="date"
						name="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
					<label>Time:</label>
					<input
						type="time"
						name="time"
						value={time}
						onChange={(e) => setTime(e.target.value)}
					/>
				</div>

				<div className="form-section">
					<label htmlFor="image">
						Image:
						<input type="file" onChange={(e) => handleUpload(e)} />
					</label>
				</div>

				<div className="form-row">
					<div className="auth">
						<label>Public</label>
						<input
							type="radio"
							name="auth"
							value="public"
							checked={auth === "public"}
							onChange={(e) => setAuth(e.target.value)}
						/>
					</div>
					<div>
						<label>Private</label>
						<input
							type="radio"
							name="auth"
							value="private"
							checked={auth === "private"}
							onChange={(e) => setAuth(e.target.value)}
						/>
					</div>
				</div>

				<button type="submit">Post HangOut</button>
			</form>
		</div>
	);
}

export default AddHangout;
