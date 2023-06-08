import React from "react";
import "../HomePage/styles.css";
import VideoPlayer from "../../Components/VideoPlayer";

function HomePage() {
	return (
		<div className="home content">
			<div className="fade-in text-sobreposto">
				<div className="name">
					<h2 className="homepage-text hangin"> HangIn,</h2>
					<h1 className="homepage-text hangout">HangOut.</h1>
				</div>
				<div className="slogan">
					<h5 className="homepage-text phrase">Just beware of the HangOver...</h5>
				</div>
			</div>
      <VideoPlayer />
      <div className="overlay"> </div>
		</div>
	);
}

export default HomePage;
