import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/auth.context";
import { Link } from "react-router-dom";

import axios from "axios";

import hangoutsService from "../../Services/hangout.service";

import { StyledSection } from "../../Components/Styles/Section.styled";
import "./styles.css";

import ConfirmPresence from "../ConfirmPresence";

// steps to do:
// 1) get the hangouts - get request to backend via axios
// 2) store the hangouts in the state
// 3) map through the elements of hangouts array that is in the state

function ExploreHangouts() {
	const [yourHangouts, setYourHangouts] = useState([]);
	const { user } = useContext(AuthContext);

	// function that gets hangouts via axios
	const getYourHangouts = () => {
		hangoutsService
			.getAllHangouts()
			.then((response) => {
				setYourHangouts(
					response.data.filter((hangout) => hangout.auth === "public")
				);
			})
			.catch((error) => console.log(error));
	};

	// setting a side-effect after initial rendering of component that is calling getYourHangouts function
	useEffect(() => {
		getYourHangouts();
	}, []);

	// functions for format styling
	const slicedDescription = (hangout) => {
		if (hangout.description.length > 100) {
			return hangout.description.slice(0, 100) + "...";
		} else {
			return hangout.description;
		}
	};

	const populatedUser = (hangout) => {
		return hangout.user.populate();
	};

	/* const getDaySuffix = (day) => {
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
	}; */

	/* const formatDate = (dateString) => {
		const date = new Date(dateString);
		const options = { month: "long", day: "numeric", year: "numeric" };
		const formattedDate = date.toLocaleDateString(undefined, options);

		const day = date.getDate();
		const suffix = getDaySuffix(day);

		const formattedDay = day + (suffix !== "" ? suffix : "");

		return formattedDate.replace(/\b(\d+)\b/, formattedDay);
	}; */

	const splitHangoutsIntoSections = (hangouts) => {
		const sections = [];
		for (let i = 0; i < hangouts.length; i += 2) {
			sections.push(hangouts.slice(i, i + 2));
		}
		return sections;
	};

	const hangoutSections = splitHangoutsIntoSections(yourHangouts);

	const handleConfimation = async (id) => {
		try {
			console.log(user);
			const response = await axios.post(
				`${import.meta.env.VITE_APP_API_URL}/api/${id}/confirmations/${
					user.name
				}`
			);
			getYourHangouts();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="explore-hangouts-container">
			<h1> Explore HangOuts </h1>
			{hangoutSections.map((section, index) => (
				<section className="section">
					<div className="group-section" key={index}>
						{section.map((hangout) => (
							<StyledSection key={hangout._id}>
								<div className="content">
									<button
										className="post-button button"
										onClick={() => handleConfimation(hangout._id)}
									>
										<img
											src="/images/confirm-button.png"
											style={{
												width: "20px",
												marginLeft: "-8px",
												marginRight: "-10px",
												marginTop: "0px",
												marginBottom: "0px",
												flexDirection: "row",
											}}
											alt="Confirm"
										/>
									</button>

									<div className="title-description">
										<div className="post-info-noborder">
											<h2 style={{ fontSize: 24, margin: 0 }}>
												{hangout.title}
											</h2>
										</div>
										<div className="post-info-noborder">
											<p>{slicedDescription(hangout)}</p>
										</div>
									</div>
									<div className="location">
										<div className="section-title">
											<h6>location</h6>
											<div className="post-info">
												<p>{hangout.location}</p>
											</div>
										</div>
									</div>
									{/* <StyledDiv> */}
									<div className="date-time">
										<div className="section-title">
											<h6>date</h6>
											<div className="post-info">
												<p>{hangout.date}</p>
											</div>
										</div>
										<div className="section-title">
											<h6>time</h6>
											<div className="post-info">
												<p>{hangout.time}</p>
											</div>
										</div>
									</div>
									{/* </StyledDiv> */}
									<div className="details-presence">
										<Link to={`/hangouts/${hangout._id}`}>
											<button className="post-button">
												View HangOut Details
											</button>
										</Link>
									</div>

									<div className="location">
										<div>
											Confirmed users you know!
											<p style={{color:'#ed4358'}}>{hangout.confirmations}</p>
										</div>
									</div>
									<div className="overlay"> </div>
								</div>
							</StyledSection>
						))}
					</div>
				</section>
			))}
		</div>
	);
}

export default ExploreHangouts;
