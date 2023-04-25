import { createSlice } from "@reduxjs/toolkit";

const monthsSlice = createSlice({
	name: "months",
	initialState: {
		months: [],
		selectedMonth: {
			name: "",
			month: "",
			id: 0,
			totalIncome: 0,
			totalExpenses: 0,
			expenses: [],
			income: [],
		},
	},
	reducers: {
		onSelectMonth(state, action) {
			state.selectedMonth = action.payload;
		},

		getCurrentDate(state, action) {
			[state.selectedMonth] = state.months.monthsData.filter(
				(month) => month.name === action.payload
			);
		},

		onAddExpense(state, action) {
			state.selectedMonth.expenses = [
				...state.selectedMonth.expenses,
				action.payload,
			];
			state.months.monthsData[state.selectedMonth.id - 1] = state.selectedMonth;
		},

		onAddIncome(state, action) {
			state.selectedMonth.income = [
				...state.selectedMonth.income,
				action.payload,
			];
			state.months.monthsData[state.selectedMonth.id - 1] = state.selectedMonth;
		},

		setData(state, action) {
			state.months = action.payload;
		},

		setTotalExpenses(state) {
			let sum = 0;
			state.selectedMonth.expenses.forEach(
				(expense) => (sum += expense.expensePrice)
			);
			state.selectedMonth.totalExpenses = sum;
		},
		setTotalIncome(state) {
			let sum = 0;
			state.selectedMonth.income.forEach(
				(income) => (sum += income.incomeAmount)
			);
			state.selectedMonth.totalIncome = sum;
		},
	},
});

export const monthsActions = monthsSlice.actions;

export default monthsSlice;
