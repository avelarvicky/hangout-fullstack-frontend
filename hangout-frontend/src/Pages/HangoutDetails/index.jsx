import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function HangoutDetailsPage() {
	const { hangoutId } = useParams();
	const [hangout, setHangout] = useState(null);

	const navigate = useNavigate();

	const getHangout = () => {
		axios
			.get(`${API_URL}/api/hangouts/${hangoutId}`)
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
		axios
			.delete(`${API_URL}/api/hangouts/${hangoutId}`)
			.then(() => {
				navigate("/hangouts");
			})
			.catch((error) => {
				console.log(error);
			});
	};


	return (
		<div>
			{hangout && (
				<div>
					<h1>{hangout.title}</h1>
					<p>{hangout.description}</p>
					<p>{hangout.location}</p>
					<p>{hangout.date}</p>
				</div>
			)}

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
