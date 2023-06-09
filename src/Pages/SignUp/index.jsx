import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import authService from "../../Services/auth.service";

import "../Login/login.css";

function SignUpPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [errorMessage, setErrorMessage] = useState(undefined);

	const navigate = useNavigate();

	// Handle Change of Inputs
	const handleEmail = (e) => setEmail(e.target.value);
	const handlePassword = (e) => setPassword(e.target.value);
	const handleName = (e) => setName(e.target.value);

	// Handle the Submission of the Form
	const handleSignupSubmit = (e) => {
		e.preventDefault();

		const requestBody = { name, email, password };

		authService
			.signup(requestBody)
			.then((response) => {
				navigate("/login");
			})
			.catch((error) => {
				const errorDescription = error.response.data.message;
				setErrorMessage(errorDescription);
			});

		// Call Axios to communicate with signup backend route.
	};

	return (
		<div className="login-page">
			<form onSubmit={handleSignupSubmit} className="form">
				<div className="title">
					<h1>Sign Up</h1>
				</div>

				<div className="form-section">
					<label>Email:</label>

					<div>
						<input
							type="email"
							name="email"
							value={email}
							onChange={handleEmail}
						/>
					</div>
				</div>

				<div className="form-section">
					<label>Password:</label>

					<div>
						<input
							type="password"
							name="password"
							value={password}
							onChange={handlePassword}
						/>
					</div>
				</div>

				<div className="form-section">
					<label>Name:</label>

					<div>
						<input
							type="text"
							name="name"
							value={name}
							onChange={handleName}
						/>
					</div>
				</div>

				<button type="submit" className="signup-btn" style={{ textDecoration: 'none', color: "black"}}>
					Sign Up
				</button>
        <br />
				<div className="form-section">
					<p>Already have account?</p>

					<button className="login-btn">
						<Link to={"/login"}> Login</Link>
					</button>
				</div>
			</form>

			{errorMessage && <p className="error-message">{errorMessage}</p>}
		</div>
	);
}

export default SignUpPage;
