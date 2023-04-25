import Balance from "../content/Balance";
import Card from "../UI/Card";
import classes from "./Calendar.module.css";
import { Fragment, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { monthsActions } from "../../store/month-slice";

const Calendar = () => {
	const dispatch = useDispatch();
	const months = useSelector((state) => state.months.months.monthsData);

	useEffect(() => {
		const currentDate = new Date();
		const currentMonth = currentDate.toLocaleString("default", {
			month: "long",
		});
		dispatch(monthsActions.getCurrentDate(currentMonth.toString()));
	}, [dispatch]);

	const onClickHandler = (event) => {
		const value = event.target.innerText;
		const [selectedMonth] = months.filter((month) => month.month === value);

		dispatch(monthsActions.onSelectMonth(selectedMonth));
		dispatch(monthsActions.setTotalExpenses());
		dispatch(monthsActions.setTotalIncome());
	};

	useEffect(() => {
		dispatch(monthsActions.setTotalExpenses());
		dispatch(monthsActions.setTotalIncome());
	}, [dispatch]);

	return (
		<Fragment>
			<section className={classes.calendar}>
				<Card>
					<nav className={classes.nav}>
						<ul>
							{months.map((date) => (
								<li
									className={classes.list}
									onClick={onClickHandler}
									key={date.month}
								>
									<NavLink
										className={(navData) =>
											navData.isActive ? classes.active : ""
										}
									>
										{date.month}
									</NavLink>
								</li>
							))}
						</ul>
					</nav>
				</Card>
			</section>
			<Balance />
		</Fragment>
	);
};

export default Calendar;
