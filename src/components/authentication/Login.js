import Card from "../UI/Card";
import classes from "./AuthStyles.module.css";
import piggy from "../../images/piggy2.jpg";
import LoadingSpinner from "../UI/LoadingSpinner";
import { authActions } from "../../store/auth-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Fragment, useRef, useState } from "react";
import { getData } from "../../store/monthData-actions";

const Login = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const onSubmitHandler = async (event) => {
		event.preventDefault();
		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		setIsLoading(true);

		try {
			const response = await fetch(
				"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBVNuBEeeYnVFbwF9sL9ppYdg_FrVLJjII",
				{
					method: "POST",
					body: JSON.stringify({
						email: enteredEmail,
						password: enteredPassword,
						returnSecureToken: true,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			setIsLoading(false);
			if (response.ok) {
				const data = await response.json();
				dispatch(authActions.getUserId(data.localId));
				dispatch(authActions.onLogin(data.idToken));
				await dispatch(getData(data.localId));
				navigate("/balance");
			} else {
				const errorMessage = "Login Failed!";
				throw new Error(errorMessage);
			}
		} catch (error) {
			console.log(error);
		}
		setHasError(true);
	};

	const toSignUp = () => {
		navigate("/signup");
	};

	return (
		<Fragment>
			<Card>
				<div className={classes.wrapper}>
					<form onSubmit={onSubmitHandler} className={classes.form}>
						<p>
							<label className={classes.label}>E-Mail</label>
							<input
								ref={emailInputRef}
								className={classes.input}
								type="text"
								name="email"
								id="email"
							/>
						</p>
						<p>
							<label className={classes.label}>Password</label>
							<input
								ref={passwordInputRef}
								className={classes.input}
								type="password"
								name="password"
								id="password"
							/>
						</p>
						{hasError && (
							<div className={classes.errorMessage}>
								{" "}
								<p>Login failed!</p>
							</div>
						)}
						{isLoading && <LoadingSpinner />}

						<div className={classes.buttonContainer}>
							<button className={classes.button}>Login</button>
							<button onClick={toSignUp} className={classes.button2}>
								Create new account
							</button>
						</div>
					</form>
				</div>
			</Card>
			<div className={classes.loginPiggy}>
				{" "}
				<img src={piggy} alt="" />
			</div>
		</Fragment>
	);
};

export default Login;
