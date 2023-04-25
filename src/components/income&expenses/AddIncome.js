import classes from "./AddIncome.module.css";
import dollar from "../../images/dollar2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useRef, useState } from "react";
import { monthsActions } from "../../store/month-slice";
import { sendData } from "../../store/monthData-actions";

const AddIncome = () => {
	const [isAdded, setIsAdded] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const enteredIncomeInputRef = useRef();
	const monthDate = new Date().getDate();
	const dispatch = useDispatch();
	const selectedMonth = useSelector((state) => state.months.selectedMonth);
	const months = useSelector((state) => state.months.months.monthsData);
	const userId = useSelector((state) => state.auth.userId);

	const onAdding = () => {
		setIsAdded(true);
		setTimeout(() => {
			setIsAdded(false);
		}, 4000);
	};

	const onError = () => {
		setHasError(true);
		setTimeout(() => {
			setHasError(false);
		}, 4000);
	};

	const onSubmitHandler = (event) => {
		event.preventDefault();
		const enteredIncome = enteredIncomeInputRef.current.value;

		if (enteredIncome > 0) {
			dispatch(
				monthsActions.onAddIncome({
					incomeDate: `${new Date().getDate()}.${
						new Date().getMonth() + 1
					}.${new Date().getFullYear()}`,
					incomeAmount: +enteredIncome,
					incomeTime:
						new Date().getHours() +
						":" +
						(new Date().getMinutes() < 10 ? "0" : "") +
						new Date().getMinutes(),
				})
			);
			setDidSubmit(true);
			onAdding();
		} else onError(true);
		enteredIncomeInputRef.current.value = "";
	};

	const sendMonthsData = () => {
		if (didSubmit) {
			dispatch(sendData(userId, months));
			setDidSubmit(false);
		}
	};
	sendMonthsData();

	return (
		<Fragment>
			<h1 className={classes.h1}>
				Add income and expense for {selectedMonth.name} {monthDate}.{" "}
			</h1>
			<div className={classes.wrapper}>
				<form onSubmit={onSubmitHandler} className={classes.form}>
					<p>
						<label className={classes.label}>Income</label>
						<input
							ref={enteredIncomeInputRef}
							className={classes.input}
							type="number"
							name="income"
							id="income"
						/>
					</p>
					{hasError && <p className={classes.errorMessage}>Invalid income!</p>}
					{isAdded && (
						<p className={classes.successMessage}>Income added Successfully!</p>
					)}
					<p>
						<button className={classes.button}>Add income</button>
					</p>
				</form>
			</div>
			<div className={classes.dollar2}>
				{" "}
				<img src={dollar} alt="" />
			</div>
		</Fragment>
	);
};

export default AddIncome;
