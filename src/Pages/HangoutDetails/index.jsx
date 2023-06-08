import { useState, useEffect } from "react";

import { Link, useParams, useNavigate } from "react-router-dom";

import hangoutsService from "../../Services/hangout.service";
import AddComment from "../AddComment";

function HangoutDetailsPage() {
	const { hangoutId } = useParams();
	const [hangout, setHangout] = useState(null);
	const [comments, setComments] = useState([]);
	/* const [confirmations, setConfirmations] = useState([]); */

	const navigate = useNavigate();

	const getHangout = () => {
		hangoutsService
			.getHangout(hangoutId)
			.then((response) => {
				const oneHangout = response.data;
				setHangout(oneHangout);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getHangout();
	}, []);

	const deleteHangout = () => {
		hangoutsService
			.deleteHangout(hangoutId)
			.then(() => {
				navigate("/hangouts");
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const getComments = () => {
		hangoutsService
			.getComments(hangoutId)
			.then((response) => {
				const comments = response.data;
				setComments(comments);
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		getComments();
	}, []);

	const refreshHangout = () => {
		getHangout();
		getComments();
	};

	/* const getConfirmations = () => {
		hangoutsService
		.getConfirmations(hangoutId)
		.then((response)=> {
			const confirmations = response.data;
			setConfirmations(confirmations);
		})
		.catch((error)=> console.log(error))
	} */

	return (
		<div>
			{hangout && (
				<div>
					<h1>{hangout.title}</h1>
					<p>{hangout.description}</p>
					<p>{hangout.location}</p>
					<p>{hangout.date}</p>

					{comments &&
						comments.map((comment) => {
							return (
								<div key={comment._id}>
									<p>{comment.content}</p>
									<Link
										to={`/hangouts/${hangoutId}/comments/${comment._id}`}
									>
										<button>View Comment Details</button>
									</Link>
								</div>
							);
						})}
				</div>
			)}

			<AddComment refreshHangout={refreshHangout} />

			<Link to={`/hangouts/edit/${hangoutId}`}>
				<button>Edit HangOut</button>
			</Link>

			<button onClick={deleteHangout}>Delete HangOut</button>

			<Link to="/hangouts">
				<button>Back to HangOuts</button>
			</Link>
		</div>
	);
}

export default HangoutDetailsPage;
