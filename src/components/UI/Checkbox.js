import classes from "./Checkbox.module.css";

const Checkbox = (props) => {
	return (
		<label className={classes.switch}>
			<input onClick={props.onClick} type="checkbox" />
			<span className={`${classes.slider} ${classes.round}`}></span>
		</label>
	);
};

export default Checkbox;
