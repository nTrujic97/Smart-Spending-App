import classes from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
	return (
		<div className={classes.spinnerContainer}>
			<div className={classes.loadingSpinner}></div>
		</div>
	);
}
