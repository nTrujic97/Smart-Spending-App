import Card from "../UI/Card";
import classes from "./AddExpense.module.css";
import AddIncome from "./AddIncome";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useRef, useState } from "react";
import { monthsActions } from "../../store/month-slice";
import { sendData } from "../../store/monthData-actions";

const AddExpense = () => {
	const [isAdded, setIsAdded] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const enteredExpenseInputRef = useRef();
	const enteredExpensePriceInputRef = useRef();
	const dispatch = useDispatch();
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
		const enteredExpense = enteredExpenseInputRef.current.value;
		const enteredExpensePrice = enteredExpensePriceInputRef.current.value;

		if (
			enteredExpense.length > 2 &&
			enteredExpense !== Number &&
			enteredExpensePrice > 0
		) {
			dispatch(
				monthsActions.onAddExpense({
					expenseDate: `${new Date().getDate()}.${
						new Date().getMonth() + 1
					}.${new Date().getFullYear()}`,
					expenseName: enteredExpense,
					expensePrice: +enteredExpensePrice,
					expenseTime:
						new Date().getHours() +
						":" +
						(new Date().getMinutes() < 10 ? "0" : "") +
						new Date().getMinutes(),
				})
			);
			setDidSubmit(true);
			onAdding(true);
		} else onError(true);
		enteredExpenseInputRef.current.value = "";
		enteredExpensePriceInputRef.current.value = "";
	};

	const sendMonthsData = () => {
		if (didSubmit) {
			dispatch(sendData(userId, months));
			setDidSubmit(false);
		}
	};
	sendMonthsData();

	useEffect(() => {
		const currentDate = new Date();
		const currentMonth = currentDate.toLocaleString("default", {
			month: "long",
		});
		dispatch(monthsActions.getCurrentDate(currentMonth.toString()));
	}, [dispatch]);

	return (
		<Fragment>
			<Card>
				<AddIncome />
				<div className={classes.wrapper}>
					<form onSubmit={onSubmitHandler} className={classes.form}>
						<p>
							<label className={classes.label}>Expense</label>
							<input
								ref={enteredExpenseInputRef}
								className={classes.input}
								type="text"
								name="expense"
								id="expense"
							/>
						</p>
						<p>
							<label className={classes.label}>Price</label>
							<input
								className={classes.input}
								type="number"
								name="price"
								id="price"
								ref={enteredExpensePriceInputRef}
							/>
						</p>
						{hasError && (
							<p className={classes.errorMessage}>Invalid expense!</p>
						)}
						{isAdded && (
							<p className={classes.successMessage}>
								Expense added successfully!
							</p>
						)}
						<p>
							<button className={classes.button}>Add expense</button>
						</p>
					</form>
				</div>
			</Card>
		</Fragment>
	);
};

export default AddExpense;
