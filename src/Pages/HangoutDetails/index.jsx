import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/auth.context";
import { Link, useParams, useNavigate } from "react-router-dom";

import hangoutsService from "../../Services/hangout.service";
import AddComment from "../AddComment";

import { StyledSection } from "../../Components/Styles/Section.styled";

import "./styles.css";

function HangoutDetailsPage() {
	const { hangoutId } = useParams();
	const [hangout, setHangout] = useState(null);
	const [comments, setComments] = useState([]);
	/* const [confirmations, setConfirmations] = useState([]); */
	const { user } = useContext(AuthContext);

	console.log(user);
	const navigate = useNavigate();

	const getHangout = () => {
		hangoutsService
			.getHangout(hangoutId)
			.then((response) => {
				const oneHangout = response.data;
				setHangout(oneHangout);
				console.log(hangout);
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
		<div className="details">
			{hangout && (
				<StyledSection>
					<div>
						<div className="details">
							<h1>{hangout.title}</h1>
							<p>{hangout.description}</p>
							<p>{hangout.location}</p>
							<p>{hangout.date}</p>
						</div>
						<div className="details">
							<img src={hangout.image} style={{ width: 200 }} />
						</div>

						<div className="details">
							{comments &&
								comments.map((comment) => {
									return (
										<div key={comment._id}>
											<h3>Comments</h3>
											<p>{comment.content}</p>
											<div>
											{comment.author == user._id && (
												<Link
													to={`/hangouts/${hangoutId}/comments/${comment._id}`} style={{textDecoration: 0}}
												>
													<button className="signup-btn" style={{height: 15, marginBottom: 20}}>View Comment Details</button>
												</Link>
											)}
											</div>
										</div>
									);
								})}
							<AddComment refreshHangout={refreshHangout} />
							<div className="options">
								{hangout && hangout.user._id == user._id && (
									<>
										<Link to={`/hangouts/edit/${hangoutId}`} style={{textDecoration: 0}}>
											<button className="signup-btn" >Edit HangOut</button>
										</Link>
										<button onClick={deleteHangout} className="signup-btn">
											Delete HangOut
										</button>
									</>
								)}
							</div>
						</div>
					</div>
				</StyledSection>
			)}
			<Link to="/hangouts" style={{ textDecoration: 0, marginBottom: 5}}>
				<button className="login-btn">Back to HangOuts</button>
			</Link>
		</div>
	);
}

export default HangoutDetailsPage;
