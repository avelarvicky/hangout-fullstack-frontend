import { useState, useEffect } from "react";

import { Link, useParams, useNavigate } from "react-router-dom";
import hangoutsService from "../../Services/hangout.service";

import "./styles.css"

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
		<div className="comment">
			<div>
			{comment && (
				<div>
					<p>{comment.content}</p>
				</div>
			)}
			</div>

			<div>
			<Link to={`/hangouts/${hangoutId}/comments/edit/${commentId}`}>
				<button>Edit Comment</button>
			</Link>

            <button onClick={deleteComment}>Delete Comment</button>
			</div>

			
		</div>
	);
}

export default CommentDetails;
