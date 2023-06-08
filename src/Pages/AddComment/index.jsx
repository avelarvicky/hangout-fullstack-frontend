import { useState, useContext } from "react";
import { AuthContext } from "../../Context/auth.context";

import hangoutsService from "../../Services/hangout.service";
import { useParams } from "react-router-dom";

function AddComment(props) {
	const { hangoutId } = useParams();
	const [content, setContent] = useState("");

	const { user } = useContext(AuthContext);

	const handleSubmit = (e) => {
		e.preventDefault();

		const requestBody = { content };

		hangoutsService
			.createComment(hangoutId, requestBody, user._id)
			.then(() => {
				setContent("");
				props.refreshHangout();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>Add Comment</label>

				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>

				<button type="submit">Post</button>
			</form>
		</div>
	);
}

export default AddComment;
