import React from "react";
import "../Footer/footer.css";

function Footer() {
	return (
		<footer className="footer">
			<div>
				<h5 className="text-margin" style={{fontSize: '16px', marginTop: '3px'}}> About Us</h5>
				<p style={{fontSize: '13px'}}>Victoria Avelar, Renato Pais</p>
				<p style={{fontSize: '13px'}}>Web Developers</p>
				<p style={{fontSize: '11px'}}>&copy; 2023 Ironhack. All rights reserved.</p>
			</div>
		</footer>
	);
}

export default Footer;
