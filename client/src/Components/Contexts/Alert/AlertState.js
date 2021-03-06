import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";

import {
	SET_ALERT, REMOVE_ALERT
} from "../types";

export const AlertState = (props) => {
	const initialState = [];

	const [state, dispatch] = useReducer(AlertReducer, initialState);

	// Set Alert
    const setAlert = (msg, type, timeout = 3500) => {
        const id =  uuidv4();
        dispatch({
            type: SET_ALERT,
            payload: {msg, type, id}
        });
        setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}), timeout)
    }

	return (
		<AlertContext.Provider value={{ 
            alerts: state,
            setAlert
		}}>
			{props.children}
		</AlertContext.Provider>
	);
};


export default AlertState;