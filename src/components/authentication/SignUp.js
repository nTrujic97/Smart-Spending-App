import Card from "../UI/Card";
import Checkbox from "../UI/Checkbox";
import classes from "./AuthStyles.module.css";
import piggy from "../../images/piggy2.jpg";
import LoadingSpinner from "../UI/LoadingSpinner";
import { Fragment, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import {
	getData,
	initialMonthsData,
	sendData,
} from "../../store/monthData-actions";

const SignUp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [passwordType, setPasswordType] = useState("password");
	const [showCheckbox, setShowCheckbox] = useState("show");
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const emailInputRef = useRef();
	const usernameInputRef = useRef();
	const passwordInputRef = useRef();

	const onSubmitHandler = async (event) => {
		event.preventDefault();
		const enteredEmail = emailInputRef.current.value;
		const enteredUsername = usernameInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		if (
			enteredEmail.includes("@") &&
			enteredUsername.trim().length >= 5 &&
			enteredPassword.trim().length >= 7
		) {
			setIsLoading(true);
			try {
				const response = await fetch(
					"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBVNuBEeeYnVFbwF9sL9ppYdg_FrVLJjII",
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
					await dispatch(sendData(data.localId, initialMonthsData));
					await dispatch(getData(data.localId));
					navigate("/balance");
				}
			} catch (error) {
				throw new Error("Sign up failed!");
			}
		}
		setHasError(true);
	};

	const toLogin = () => {
		navigate("/login");
	};

	const onShowPassword = () => {
		if (passwordType === "password") {
			setPasswordType("text");
		} else {
			setPasswordType("password");
		}
		if (showCheckbox === "show") {
			setShowCheckbox("hide");
		}
		if (showCheckbox === "hide") {
			setShowCheckbox("show");
		}
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
							<label className={classes.label}>Username</label>
							<input
								ref={usernameInputRef}
								className={classes.input}
								type="text"
								name="username"
								id="username"
							/>
						</p>

						<p>
							<label className={classes.label}>Password</label>
							<input
								ref={passwordInputRef}
								className={classes.input}
								type={passwordType}
								name="password"
								id="password"
							/>
							<Checkbox onClick={onShowPassword} />
							{showCheckbox}
						</p>
						<div className={classes.pValidWrapper}>
							<p className={classes.inputValidation}>
								password needs to be 7 or more characters long.
								<br /> username needs to be 5 or more characters long.
							</p>
						</div>

						{hasError && (
							<div className={classes.errorMessage}>
								{" "}
								<p>Sign up failed!</p>
							</div>
						)}
						{isLoading && <LoadingSpinner />}

						<div className={classes.buttonContainer}>
							<button className={classes.button}>Create Account</button>
							<button onClick={toLogin} className={classes.button2}>
								Login with existing account
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

export default SignUp;
