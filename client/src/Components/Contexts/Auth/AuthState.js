import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import axios from "axios";
import setAuthToken from "../../Utils/setAuthToken";

import {
	REGISTER_SUCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    CLEAR_ERRORS,
} from "../types";

export const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        error: null,
        user: null,
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	// Load User
    const loadUser = async() => {
        if(localStorage.token){
            // console.log("set token")
            setAuthToken(localStorage.token)
        }
        try{
            const res = await axios.get('/api/auth');
            dispatch({type: USER_LOADED, payload: res.data});
        }catch(err){
            dispatch({type: AUTH_ERROR})
        }
    }

    // Register User
    const register = async (formData) => {
        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        }
  
        try {
            const res = await axios.post("/api/users", formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            loadUser();
        }catch (err){
            dispatch({
                type: LOGIN_FAILED,
                payload: err.response.data.message
            })
        }
    }

    // Login User
    const login = async (formData) => {
        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        }

        try {
            const res = await axios.post("/api/auth", formData, config);
            dispatch({
                type: REGISTER_SUCESS,
                payload: res.data
            })
            loadUser();
        }catch (err){
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.message
            })
        }
    }

    // Logout
    const logout = () => {
        dispatch({ type: LOGOUT})
    }

    // Clear Errors
    const clearErrors = () => {
        dispatch({type: CLEAR_ERRORS})
    }


	return (
		<AuthContext.Provider value={{ 
            token: state.token,
            error: state.error,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            register,
            login,
            logout,
            clearErrors,
            loadUser,
		}}>
			{props.children}
		</AuthContext.Provider>
	);
};


export default AuthState;