import MainHeader from "./components/navigation/MainHeader";
import Calendar from "./components/calendar/Calendar";
import Login from "./components/authentication/Login";
import SignUp from "./components/authentication/SignUp";
import AddExpense from "./components/income&expenses/AddExpense";
import NotFound from "./components/pages/NotFound";
import Protected from "./components/pages/Protected";
import Welcome from "./components/pages/Home";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	return (
		<BrowserRouter>
			<MainHeader />
			<main>
				<Routes>
					<Route path="/" element={<Welcome />} />
					<Route
						path="/balance"
						element={
							<Protected isAuthenticated={isAuthenticated}>
								<Calendar />
							</Protected>
						}
					/>
					<Route
						path="/income&expenses"
						element={
							<Protected isAuthenticated={isAuthenticated}>
								<AddExpense />
							</Protected>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
