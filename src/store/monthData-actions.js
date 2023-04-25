import { monthsActions } from "./month-slice";

export const getData = (userId) => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(
				`https://smart-spending-app-48bae-default-rtdb.firebaseio.com/users/${userId}.json`
			);

			if (!response.ok) {
				throw new Error("Could not fetch data");
			}
			const data = await response.json();
			return data;
		};

		try {
			const monthsData = await fetchData();
			dispatch(monthsActions.setData(monthsData));
		} catch (error) {
			console.log(error);
		}
	};
};

export const sendData = (userId, initialMonthsData) => {
	return async (dispatch) => {
		const sendRequest = async () => {
			const response = await fetch(
				"https://smart-spending-app-48bae-default-rtdb.firebaseio.com/users.json",
				{
					method: "PATCH",
					body: JSON.stringify({
						[userId]: { monthsData: initialMonthsData },
					}),
				}
			);

			if (!response.ok) {
				throw new Error("Could not send data");
			}
		};

		try {
			await sendRequest();
		} catch (error) {
			console.log(error);
		}
	};
};

export const initialMonthsData = [
	{
		name: "January",
		month: "Jan",
		id: 1,
		totalIncome: 0,
		totalExpenses: 0,
		expenses: [{ expenseName: "", expensePrice: 0, expenseDate: "" }],
		income: [{ incomeAmount: 0, incomeDate: "" }],
	},
	{
		name: "February",
		month: "Feb",
		id: 2,
		totalIncome: 0,
		totalExpenses: 0,
		expenses: [{ expenseName: "", expensePrice: 0, expenseDate: "" }],
		income: [{ incomeAmount: 0, incomeDate: "" }],
	},
	{
		name: "March",
		month: "Mar",
		id: 3,
		totalIncome: 0,
		totalExpenses: 0,
		expenses: [{ expenseName: "", expensePrice: 0, expenseDate: "" }],
		income: [{ incomeAmount: 0, incomeDate: "" }],
	},
	{
		name: "April",
		month: "Apr",
		id: 4,
		totalIncome: 0,
		totalExpenses: 0,
		expenses: [{ expenseName: "", expensePrice: 0, expenseDate: "" }],
		income: [{ incomeAmount: 0, incomeDate: "" }],
	},
	{
		name: "May",
		month: "May",
		id: 5,
		totalIncome: 0,
		totalExpenses: 0,
		expenses: [{ expenseName: "", expensePrice: 0, expenseDate: "" }],
		income: [{ incomeAmount: 0, incomeDate: "" }],
	},
	{
		name: "Jun",
		month: "Jun",
		id: 6,
		totalIncome: 0,
		totalExpenses: 0,
		expenses: [{ expenseName: "", expensePrice: 0, expenseDate: "" }],
		income: [{ incomeAmount: 0, incomeDate: "" }],
	},
	{
		name: "July",
		month: "Jul",
		id: 7,
		totalIncome: 0,
		totalExpenses: 0,
		expenses: [{ expenseName: "", expensePrice: 0, expenseDate: "" }],
		income: [{ incomeAmount: 0, incomeDate: "" }],
	},
	{
		name: "August",
		month: "Aug",
		id: 8,
		totalIncome: 0,
		totalExpenses: 0,
		expenses: [{ expenseName: "", expensePrice: 0, expenseDate: "" }],
		income: [{ incomeAmount: 0, incomeDate: "" }],
	},
	{
		name: "September",
		month: "Sep",
		id: 9,
		totalIncome: 0,
		totalExpenses: 0,
		expenses: [{ expenseName: "", expensePrice: 0, expenseDate: "" }],
		income: [{ incomeAmount: 0, incomeDate: "" }],
	},
	{
		name: "October",
		month: "Oct",
		id: 10,
		totalIncome: 0,
		totalExpenses: 0,
		expenses: [{ expenseName: "", expensePrice: 0, expenseDate: "" }],
		income: [{ incomeAmount: 0, incomeDate: "" }],
	},
	{
		name: "November",
		month: "Nov",
		id: 11,
		totalIncome: 0,
		totalExpenses: 0,
		expenses: [{ expenseName: "", expensePrice: 0, expenseDate: "" }],
		income: [{ incomeAmount: 0, incomeDate: "" }],
	},
	{
		name: "December",
		month: "Dec",
		id: 12,
		totalIncome: 0,
		totalExpenses: 0,
		expenses: [{ expenseName: "", expensePrice: 0, expenseDate: "" }],
		income: [{ incomeAmount: 0, incomeDate: "" }],
	},
];
