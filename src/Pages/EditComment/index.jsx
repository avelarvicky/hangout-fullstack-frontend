import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import hangoutsService from "../../Services/hangout.service";

import './styles.css'

// steps:
// 1 - grab route params (hangoutId)
// 2 - call axios to get specific info of a hangout
// 3 - create a form
// 4 - handle changes of inputs content
// 5 - handle submit

function EditComment() {
	const [content, setContent] = useState("");

	const { hangoutId, commentId } = useParams();

	const navigate = useNavigate();

	useEffect(() => {
		hangoutsService
			.getComment(hangoutId, commentId)
			.then((response) => {
				const oneComment = response.data;

				setContent(oneComment.content);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [commentId]);

	const handleFormSubmit = (e) => {
		e.preventDefault();

		const requestBody = {
			content
		};

		hangoutsService
			.updateComment(hangoutId, commentId, requestBody)
			.then(() => {
				navigate(`/hangouts/${hangoutId}`);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div className="comment">
			<h3>Edit the Comment</h3>

			<form onSubmit={handleFormSubmit}>
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>

				<button type="submit">Edit Comment</button>
			</form>
		</div>
	);
}

export default EditComment;
