import classes from "./Balance.module.css";
import Card from "../UI/Card";
import MonthlyDetails from "./MonthlyDetails";
import ResetButton from "./ResetButton";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Grid = () => {
	const selectedMonth = useSelector((state) => state.months.selectedMonth);
	const [showMore, setShowMore] = useState(false);
	const [hasBalance, setHasBalance] = useState(false);

	const total = (income, expense) => {
		return (income - expense).toLocaleString();
	};

	useEffect(() => {
		setShowMore(false);
	}, [selectedMonth]);

	const onShowMore = () => {
		setShowMore(!showMore);
	};

	let showMoreOrLess = !showMore
		? `Show more details for ${selectedMonth.name}`
		: `Show less details for ${selectedMonth.name}`;

	const currentYear = new Date().getFullYear();

	useEffect(() => {
		if (
			selectedMonth.income.length === 1 &&
			selectedMonth.expenses.length === 1
		) {
			setHasBalance(false);
		} else setHasBalance(true);
	}, [selectedMonth]);

	const currentDate = new Date();
	const currentMonth = currentDate.toLocaleString("default", {
		month: "long",
	});

	return (
		<Fragment>
			<Card>
				<section>
					<div className={classes.header}>
						<h1 className={classes.h1Year}>{currentYear}.</h1>
						<ResetButton />
					</div>

					<h1 className={classes.h1}>{selectedMonth.name}</h1>
					{!hasBalance && (
						<Fragment>
							<div className={classes.detailsMessage}>
								You have no income or expenses for this month.
							</div>
							{selectedMonth.name === currentMonth && (
								<div className={classes.navLinkWrapper}>
									<NavLink className={classes.navLink} to="/income&expenses">
										Click here to add to your balance
									</NavLink>
								</div>
							)}
						</Fragment>
					)}
					{hasBalance && (
						<div className={classes.wrapper}>
							<div className={classes.box}>
								<h3 className={classes.h3}>Income</h3>
							</div>
							<div className={classes.box}>
								<h3 className={classes.h3}>Expenses</h3>
							</div>
							<div className={classes.box}>
								<h3 className={classes.h3}>Total</h3>
							</div>
							<div className={classes.box}>
								<p className={classes.currencyAmount}>
									{selectedMonth.totalIncome.toLocaleString()}{" "}
								</p>
								<p className={classes.currency}>din.</p>
							</div>
							<div className={classes.box}>
								<p className={classes.currencyAmount}>
									{selectedMonth.totalExpenses.toLocaleString()}{" "}
								</p>
								<p className={classes.currency}>din.</p>
							</div>
							<div className={classes.box}>
								<p className={classes.currencyAmount}>
									{total(
										selectedMonth.totalIncome,
										selectedMonth.totalExpenses
									)}{" "}
								</p>
								<p className={classes.currency}>din.</p>
							</div>
						</div>
					)}
				</section>
			</Card>
			{showMore && <MonthlyDetails />}
			<button onClick={onShowMore} className={classes.button}>
				{showMoreOrLess}
			</button>
		</Fragment>
	);
};

export default Grid;
