import { useState } from "react";

import { useNavigate } from "react-router-dom";
import hangoutsService from "../../Services/hangout.service";

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

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();

			const requestBody = {
				title,
				description,
				location,
				date/* : `${date.slice(5, 7)}/${date.slice(-2)}/${date.slice(0, 4)}` */,
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
			setTime("");
			setImage("");
			setAuth("public");

			navigate("/hangouts");
		} catch (error) {
			console.log(error);
		}
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
					pattern="\m{2}-\d{2}-\y{4}"
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

				<label>Public</label>
				<input
					type="radio"
					name="auth"
					value="public"
					checked={auth === "public"}
					onChange={(e) => setAuth(e.target.value)}
				/>

				<label>Private</label>
				<input
					type="radio"
					name="auth"
					value="private"
					checked={auth === "private"}
					onChange={(e) => setAuth(e.target.value)}
				/>

				<button type="submit">Post HangOut</button>
			</form>
		</div>
	);
}

export default AddHangout;
