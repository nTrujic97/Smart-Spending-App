import piechart from "../../images/piechart.jpg";
import dollar from "../../images/dollar.jpg";
import classes from "./Welcome.module.css";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
	return (
		<Fragment>
			<h1 className={classes.h1}>Welcome!</h1>
			<div className={classes.images}>
				<img alt="dollar img" className={classes.dollarimg} src={dollar} />
				<img alt="piechart img" className={classes.img} src={piechart} />
				<img alt="dollar img" className={classes.dollarimg} src={dollar} />
			</div>

			<section className={classes.content}>
				<div>
					<h2>Spend smart with this exciting new app!</h2>
					<p>Track your financial statistics.</p>
					<p>Keep track of your monthly income and expenses.</p>
					<p>Set your financial goals and achieve financial godhood!</p>
					<Link to="./signup" className={classes.link}>
						Click here to Sign up!{" "}
					</Link>
				</div>
			</section>
		</Fragment>
	);
};

export default Welcome;
