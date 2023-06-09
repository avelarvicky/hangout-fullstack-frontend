import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../Services/auth.service";
import { AuthContext } from "../../Context/auth.context";

import firebase from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
/* import {
	signInWithPopup,
	GoogleAuthProvider,
	GithubAuthProvider,
} from "firebase/auth"; */

import "../Login/login.css";

const auth = firebase.auth();

function LoginPage() {
	const [user] = useAuthState(auth);
	const [thisUser, setThisUser] = useState(null);
	console.log(user);

	const handleSocialAuth = () => {
		if (thisUser) {
			const requestBody = {
				email: thisUser.email,
				password: thisUser.uid,
				name: thisUser.displayName,
			};

			authService
				.signup(requestBody)
				.then((response) => {
					storeToken(response.data.authToken);
					// authenticate the User
					authenticateUser();

					navigate("/");
				})
				.catch((error) => {
					const errorDescription = error.response.data.message;
					setErrorMessage(errorDescription);
				});
		}
	};

	useEffect(() => {
		handleSocialAuth();
	}, [thisUser]);

	const signInWithGoogle = async () => {
		const provider = new GoogleAuthProvider();
		await signInWithPopup(auth, provider);

		setThisUser(user);
	};

	const signInWithGithub = () => {
		const provider = new GithubAuthProvider();
		signInWithPopup(auth, provider);
	};

	// Write State
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(undefined);

	const navigate = useNavigate();

	const { storeToken, authenticateUser } = useContext(AuthContext);

	// Handle Functions the handle the change of
	const handlePassword = (e) => setPassword(e.target.value);
	const handleEmail = (e) => setEmail(e.target.value);

	// Handle Submit of the form
	const handleLoginSubmit = (e) => {
		e.preventDefault();

		const requestBody = { email, password };

		authService
			.login(requestBody)
			.then((response) => {
				storeToken(response.data.authToken);
				// authenticate the User
				authenticateUser();

				navigate("/");
			})
			.catch((error) => {
				const errorDescription = error.response.data.message;
				setErrorMessage(errorDescription);
			});
	};

	return (
		<div className="login-page">
			<form onSubmit={handleLoginSubmit} className="form">
				<div className="form-title">
					<h1>Login</h1>
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

				<button type="submit" className="login-btn">
					Login
				</button>

				<div className="form-section">
					<p>Don't have an account yet?</p>
					<button className="signup-btn">
						<Link to={"/signup"} style={{ textDecoration: 'none', color: "black"}} >Sign Up</Link>
					</button>
				</div>
			</form>

			{/* <button onClick={signInWithGoogle}> Sign in with Google </button>
			<button onClick={signInWithGithub}> Sign in with Github </button> */}
			{/* <div>
				<button onClick={() => auth.signOut()}> Logout </button>
			</div> */}

			{/* {user ? <p>You are logged in</p> : <p>You are logged out</p>}
			 */}
			{errorMessage && <p className="error-message">{errorMessage}</p>}
		</div>
	);
}

export default LoginPage;
