import classes from "./NotFound.module.css";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<Fragment>
			<div className={classes.notFound}>Page not found!</div>

			<div className={classes.linkWrapper}>
				<Link className={classes.notFoundLink} to="/">
					go to to Home page
				</Link>
			</div>
		</Fragment>
	);
};

export default NotFound;
