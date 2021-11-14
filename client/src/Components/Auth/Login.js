import React, {useState, useContext, useEffect} from 'react'
import { useHistory } from 'react-router-dom';

import AuthContext from '../Contexts/Auth/AuthContext';
import AlertContext from '../Contexts/Alert/alertContext';

export const Login = () => {
    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);
    const history = useHistory();

    const {setAlert} = alertContext;
    const {login, error,clearErrors, isAuthenticated} = authContext;
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    useEffect(() => {
        
        if(isAuthenticated){
            history.push("/");
        }
        
        if(error === 'User already exists'){
            setAlert(error, "danger");
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, history])

    const { email, password } = user;

    const onChange = (e) =>  setUser({...user, [e.target.name]: e.target.value});

    const onSubmit = (e) => {
        e.preventDefault();
        if(email === "" || password === ""){
            setAlert("please fill in all fill", "danger")
        }else{
            login({
                email,
                password
            })
        }
    }
    return (
        <div className="form-container">
            <h1>Account <span className="text-primary">Login</span></h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} onChange={onChange} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} required/>
                </div>
                <input type="submit"value="Login" className="btn btn-primary btn-block"/>
            </form>
        </div>
    )
}
