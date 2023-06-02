import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

// steps:
// 1) create a form;
// 2) connect the input values with state values;
// 3) when changing the input, create handle functions to handle change of inputs;
// 4) create functions that handles form submit;
// 5) inside this function, create a post request via axios

function AddHangout() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [location, setLocation] = useState("");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [image, setImage] = useState("");
	const [auth, setAuth] = useState(false);
    

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();

		const requestBody = {
			title,
			description,
			location,
			date,
			time,
			image,
			auth,
		};

		axios
			.post(`${API_URL}/api/hangouts`, requestBody)
			.then((response) => {
				setTitle("");
				setDescription("");
				setLocation("");
				setDate("");
				setTime("");
				setImage("");
				setAuth(false);
				props.refreshHangouts();

				// !
				// redirect to the page with all hangouts
				navigate("/hangouts");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			<h3>Create a HangOut!</h3>

			<form onSubmit={handleSubmit}>
				<label>Title:</label>
				<input
					type="text"
					name="title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<label>Description:</label>
				<textarea
					type="text"
					name="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>

				<label>Location:</label>
				<textarea
					type="text"
					name="location"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
				/>

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

				<label>Images:</label>
				<input
					type="file"
					name="image"
					value={image}
					onChange={(e) => setImage(e.target.value)}
				/>

				<label>Public or Private:</label>
				<input
					type="checkbox"
                    name="checkbox"
                    checked={auth}
					onChange={(e) => setAuth(e.target.checked)}
				/>

				<button type="submit">Post HangOut</button>
			</form>
		</div>
	);
}

export default AddHangout;
