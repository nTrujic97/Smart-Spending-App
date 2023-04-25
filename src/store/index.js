import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import monthsSlice from "./month-slice";

const store = configureStore({
	reducer: { auth: authSlice.reducer, months: monthsSlice.reducer },
});
export default store;
