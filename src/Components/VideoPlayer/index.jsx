import videoSource from "../../../image/hangin, HangOut..mp4";
import { useEffect, useRef } from "react";

function VideoPlayer() {
	const videoRef = useRef(null);

	useEffect(() => {
		const video = videoRef.current;

		const handleEnded = () => {
			// Pause the video when it ends
			video.pause();
		};

		// Add event listener for 'ended' event
		video.addEventListener("ended", handleEnded);

		// Clean up event listener on component unmount
		return () => {
			video.removeEventListener("ended", handleEnded);
		};
	}, []);

	return (
		<video ref={videoRef} autoPlay playsInline muted>
			<source src={videoSource} type="video/mp4" />
		</video>
	);
}

export default VideoPlayer;
