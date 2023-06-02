import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// import pages

// Pass the API_URL
const API_URL = "http://localhost:5005";

// steps to do:
// 1) get the hangouts - get request to backend via axios
// 2) store the hangouts in the state
// 3) map through the elements of hangouts array that is in the state

function YourHangouts() {
	const [yourHangouts, setYourHangouts] = useState([]);

	// function that gets hangouts via axios
	const getYourHangouts = () => {
		axios
			.get(`${API_URL}/api/hangouts`)
			.then((response) => setYourHangouts(response.data))
			.catch((error) => console.log(error));
	};

	// setting a side-effect after initial rendering of component that is calling getYourHangouts function
	useEffect(() => {
		getYourHangouts();
	}, []);

	const slicedDescription = (hangout) => {
		if (hangout.description.length > 20) {
			return hangout.description.slice(0, 20) + "...";
		} else {
			return hangout.description;
		}
	};

	const getDaySuffix = (day) => {
		if (day >= 11 && day <= 13) {
			return "th";
		}

		if (day > 31) {
			return ""; // Exclude suffix for year
		}

		switch (day % 10) {
			case 1:
				return "st";
			case 2:
				return "nd";
			case 3:
				return "rd";
			default:
				return "th";
		}
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const options = { month: "long", day: "numeric", year: "numeric" };
		const formattedDate = date.toLocaleDateString(undefined, options);

		const day = date.getDate();
		const suffix = getDaySuffix(day);

		const formattedDay = day + (suffix !== "" ? suffix : "");

		return formattedDate.replace(/\b(\d+)\b/, formattedDay);
	};

	return (
		<div>
			{yourHangouts.map((hangout) => {
				return (
					<div key={hangout._id}>
						<h3>{hangout.title}</h3>
						<p>{slicedDescription(hangout)}</p>
						<p>{hangout.location}</p>
						<p>{formatDate(hangout.date)}</p>
						<Link to={`/hangouts/${hangout._id}`}>
							<button>View HangOut Details</button>
						</Link>
					</div>
				);
			})}
		</div>
	);
}

export default YourHangouts;
