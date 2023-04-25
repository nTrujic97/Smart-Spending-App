import classes from "./Balance.module.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import { getData, sendData } from "../../store/monthData-actions";
import { useNavigate } from "react-router-dom";
import { initialMonthsData } from "../../store/monthData-actions";

const ResetButton = () => {
	const currentYear = new Date().getFullYear();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userId = useSelector((state) => state.auth.userId);

	const onReset = () => {
		confirmAlert({
			title: "Confirm reset",
			message: `Are you sure you want to reset your balance for ${currentYear}?`,
			buttons: [
				{
					label: "Yes",
					onClick: async () => {
						await dispatch(sendData(userId, initialMonthsData));
						await dispatch(getData(userId));
						navigate("/income&expenses");
					},
				},
				{
					label: "No",
				},
			],
		});
	};

	return (
		<button onClick={onReset} className={classes.resetButton}>
			Reset balance
		</button>
	);
};

export default ResetButton;
