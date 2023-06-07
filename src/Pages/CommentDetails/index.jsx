import { useState, useEffect } from "react";

import { Link, useParams, useNavigate } from "react-router-dom";
import hangoutsService from "../../Services/hangout.service";

function CommentDetails() {
	const [comment, setComment] = useState(null);

	const { hangoutId, commentId } = useParams();

    const navigate = useNavigate();

	const getComment = () => {
		hangoutsService
			.getComment(hangoutId, commentId)
			.then((response) => {
				const oneComment = response.data;
				setComment(oneComment);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getComment();
	}, []);

	const deleteComment = () => {
		hangoutsService
			.deleteComment(hangoutId, commentId)
			.then(() => {
				navigate(`/hangouts/${hangoutId}`);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<div>
			{comment && (
				<div>
					<p>{comment.content}</p>
				</div>
			)}

			<Link to={`/hangouts/${hangoutId}/comments/edit/${commentId}`}>
				<button>Edit Comment</button>
			</Link>

            <button onClick={deleteComment}>Delete Comment</button>

			<Link to={`/hangouts/${hangoutId}`}>
				<button>Back to HangOut</button>
			</Link>
		</div>
	);
}

export default CommentDetails;
