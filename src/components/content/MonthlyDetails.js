import classes from "./MonthlyDetails.module.css";
import Card from "../UI/Card";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const MonthlyDetails = () => {
	const selectedMonth = useSelector((state) => state.months.selectedMonth);
	const filteredMonthExpenses = selectedMonth.expenses.slice(1);
	const filteredMonthIncome = selectedMonth.income.slice(1);
	const [hasIncome, setHasIncome] = useState(false);
	const [hasExpense, setHasExpense] = useState(false);

	useEffect(() => {
		if (filteredMonthExpenses.length > 0) setHasExpense(true);
		if (filteredMonthIncome.length > 0) setHasIncome(true);
	}, [selectedMonth, filteredMonthExpenses.length, filteredMonthIncome.length]);

	const uniqueIncomeDates = [];
	const uniqueExpenseDates = [];

	filteredMonthIncome.filter((el) => {
		const isDuplicate = uniqueIncomeDates.includes(el.incomeDate);
		if (!isDuplicate) {
			uniqueIncomeDates.push(el.incomeDate);
			return true;
		}
		return false;
	});
	filteredMonthExpenses.filter((el) => {
		const isDuplicate = uniqueExpenseDates.includes(el.expenseDate);
		if (!isDuplicate) {
			uniqueExpenseDates.push(el.expenseDate);
			return true;
		}
		return false;
	});

	const filteredUniqueIncomeDates = [];
	const filteredUniqueExpenseDates = [];

	uniqueIncomeDates.forEach((date) => {
		filteredUniqueIncomeDates.push({
			date: date,
			income: filteredMonthIncome.filter((el) => el.incomeDate === date),
		});
	});
	uniqueExpenseDates.forEach((date) => {
		filteredUniqueExpenseDates.push({
			date: date,
			expense: filteredMonthExpenses.filter((el) => el.expenseDate === date),
		});
	});

	const generateKey = () => {
		return Math.random();
	};

	return (
		<Card>
			{!hasExpense && !hasIncome && (
				<div className={classes.detailsMessage}>
					No details for income or expenses.
				</div>
			)}
			{hasIncome && (
				<div className={classes.h2Wrapper}>
					<h2 className={classes.h2}>Income</h2>
				</div>
			)}
			<ul>
				{filteredUniqueIncomeDates.map((el, i) => (
					<Card key={i + generateKey()}>
						<h2 className={classes.h2Date}>{el.date}</h2>
						<li className={classes.detailLi}>
							{el.income.map((element, index) => (
								<div key={index + generateKey()} className={classes.pWrapper}>
									<p className={classes.detailP}>{element.incomeTime}</p> You
									added an income of{" "}
									<p className={classes.detailP}>
										{element.incomeAmount.toLocaleString()}{" "}
									</p>
									din. <br />
								</div>
							))}
						</li>
					</Card>
				))}
			</ul>
			{hasExpense && (
				<div className={classes.h2Wrapper}>
					<h2 className={classes.h2}>Expenses</h2>
				</div>
			)}
			<ul>
				{filteredUniqueExpenseDates.map((el, i) => (
					<Card key={i + generateKey()}>
						<h2 className={classes.h2Date}>{el.date}</h2>
						<li className={classes.detailLi}>
							{el.expense.map((element, index) => (
								<div key={index + generateKey()} className={classes.pWrapper}>
									<p className={classes.detailP}>{element.expenseTime}</p> You
									added an expense:{" "}
									<p className={classes.detailP}>{element.expenseName} </p>
									with a cost of{" "}
									<p className={classes.detailP}>
										{element.expensePrice.toLocaleString()}
									</p>{" "}
									din.
									<br />
								</div>
							))}
						</li>
					</Card>
				))}
			</ul>
		</Card>
	);
};

export default MonthlyDetails;
