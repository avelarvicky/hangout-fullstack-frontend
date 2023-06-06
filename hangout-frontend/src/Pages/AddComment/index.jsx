import { useState } from "react";

import hangoutsService from "../../Services/hangout.service";
import { useParams } from "react-router-dom";

function AddComment() {
	const { hangoutId } = useParams();
	const [content, setContent] = useState("");

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();

			const requestBody = { content };

			await hangoutsService.createComment(hangoutId, requestBody);

			setContent("");
			/* props.refreshComments(); */
		} catch (error) {
			console.log(error);
		}
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
