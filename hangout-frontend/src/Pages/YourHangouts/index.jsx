import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import AddHangout from "../AddHangout";
import hangoutsService from "../../Services/hangout.service";

import { StyledSection } from "../../Components/Styles/Section.styled";
import { StyledDiv } from "../../Components/Styles/Post.styled";

import './styles.css'

// steps to do:
// 1) get the hangouts - get request to backend via axios
// 2) store the hangouts in the state
// 3) map through the elements of hangouts array that is in the state

function YourHangouts() {
	const [yourHangouts, setYourHangouts] = useState([]);
    
	// function that gets hangouts via axios
	const getYourHangouts = () => {
        hangoutsService.getAllHangouts()
        .then((response) => setYourHangouts(response.data))
        /* console.log(`teste`, response.data) */
        .catch((error) => console.log(error));
	};
    
	// setting a side-effect after initial rendering of component that is calling getYourHangouts function
	useEffect(() => {
        getYourHangouts();
	}, []);

    // functions for format styling
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
		<section>
            <AddHangout refreshHangouts={getYourHangouts} />
			{yourHangouts.map((hangout) => {
                return (
					<StyledSection key={hangout._id}>
						<div>
							<h3>{hangout.title}</h3>
							<p>{slicedDescription(hangout)}</p>
						</div>
						<StyledDiv>
							<div className="post-info"><p>{hangout.location}</p></div>
							<div className="post-info"><p>{formatDate(hangout.date)}</p></div>
						</StyledDiv>
						<div>
							<Link to={`/hangouts/${hangout._id}`}>
								<button>View HangOut Details</button>
							</Link>
						</div>
					</StyledSection>
				);
			})}
		</section>
	);
}

export default YourHangouts;
