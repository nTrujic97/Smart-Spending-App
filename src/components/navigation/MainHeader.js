import classes from "./MainHeader.module.css";
import piggy from "../../images/piggy.jpg";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";

const MainHeader = () => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onClickHandler = (event) => {
		event.preventDefault();
		dispatch(authActions.onLogout());
		navigate("/");
	};
	return (
		<header className={classes.header}>
			<div className={classes.logo}>
				<img className={classes.img} alt="piggy bank" src={piggy} />
				<h1 className={classes.logoText}>Smart Spending</h1>
			</div>
			<nav className={classes.nav}>
				<ul>
					{isAuthenticated && (
						<li>
							<NavLink
								className={(navData) =>
									navData.isActive ? classes.active : ""
								}
								to="/balance"
							>
								Balance
							</NavLink>
						</li>
					)}
					{isAuthenticated && (
						<li>
							<NavLink
								className={(navData) =>
									navData.isActive ? classes.active : ""
								}
								to="/income&expenses"
							>
								Income&Expenses
							</NavLink>
						</li>
					)}
					{!isAuthenticated && (
						<li>
							<NavLink
								className={(navData) =>
									navData.isActive ? classes.active : ""
								}
								to="/"
							>
								Home
							</NavLink>
						</li>
					)}
					{!isAuthenticated && (
						<li>
							<NavLink
								className={(navData) =>
									navData.isActive ? classes.active : ""
								}
								to="/signup"
							>
								Sign Up
							</NavLink>
						</li>
					)}

					{!isAuthenticated && (
						<li>
							<NavLink
								className={(navData) =>
									navData.isActive ? classes.active : ""
								}
								to="/login"
							>
								Login
							</NavLink>
						</li>
					)}
					{isAuthenticated && (
						<li>
							<NavLink onClick={onClickHandler} to="/">
								Logout
							</NavLink>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default MainHeader;
