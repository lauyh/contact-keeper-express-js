import React, { useReducer } from "react";
import axios from "axios";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	CONTACT_ERROR
} from "../types";

export const ContactState = (props) => {
	const initialState = {
		contacts: [],
		current: null,
		filtered: null,
	};

	const [state, dispatch] = useReducer(contactReducer, initialState);

	// Add Contact
	const addContact = async(contact)=>{
		const config = {
			headers:{
				"Content-Type": "application/json"
			}
			
		}
		try {
			const res = await axios.post("/api/contacts", contact, config);
			dispatch({type: ADD_CONTACT, payload: res.data});
		} catch (error) {
			dispatch({type: CONTACT_ERROR, payload: error.response.message})
		}
		
	}

	// Delete Contact
	const deleteContact =(id)=>{
		dispatch({type: DELETE_CONTACT, payload: id});
	}

	// set current contact
	const setCurrent =(contact)=>{
		dispatch({type: SET_CURRENT, payload: contact});
	}

	// Clear current  contact
	const clearCurrent =(id)=>{
		dispatch({type: CLEAR_CURRENT});
	}
	// Update contact
	const updateContact =(contact)=>{
		dispatch({type: UPDATE_CONTACT, payload: contact});
	}

	// Filter contact
	const filterContacts = text => {
		dispatch({type: FILTER_CONTACTS, payload: text})
	}
	// Clear filter
	const clearFilter =(id)=>{
		dispatch({type: CLEAR_FILTER});
	}
	return (
		<ContactContext.Provider value={{ 
			contacts: state.contacts,
			current: state.current,
			filtered: state.filtered,
			addContact,
			deleteContact,
			clearCurrent,
			setCurrent,
			updateContact,
			filterContacts,
			clearFilter,
		}}>
			{props.children}
		</ContactContext.Provider>
	);
};


export default ContactState;