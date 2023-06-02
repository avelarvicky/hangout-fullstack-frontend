import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

// steps:
// 1 - grab route params (hangoutId)
// 2 - call axios to get specific info of a hangout
// 3 - create a form
// 4 - handle changes of inputs content
// 5 - handle submit

import React from "react";

function EditHangoutPage() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [location, setLocation] = useState("");
	const [date, setDate] = useState(new Date());

	const { hangoutId } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`${API_URL}/api/hangouts/${hangoutId}`)
			.then((response) => {
				const oneHangout = response.data;
				setTitle(oneHangout.title);
				setDescription(oneHangout.description);
				setLocation(oneHangout.location);
				setDate(oneHangout.date);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [hangoutId]);

	const handleFormSubmit = (e) => {
		e.preventDefault();

		const requestBody = { title, description, location, date };

		axios
			.put(`${API_URL}/api/hangouts/${hangoutId}`, requestBody)
			.then((response) => {
				navigate(`/hangouts/${hangoutId}`).catch((error) => {
					console.log(error);
				});
			});
	};

	return (
		<div>
			<h3>Edit the Project</h3>

			<form onSubmit={handleFormSubmit}>
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
				<textarea
					type="date"
					name="date"
					value={date}
					onChange={(e) => setDate(e.target.value)}
				/>

				<button type="submit">Edit HangOut</button>
			</form>
		</div>
	);
}

export default EditHangoutPage;
