import React, { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import { stockInfo } from "../../api/marketData";
import './login.css';
import LoginError from "./LoginError";
import ValidUser from "../App";

//REACT HOOK
const Login = () => {

    const [login_TOKEN, SET_login_TOKEN] = useState('');
    const [loggedin, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState(false);

    const onInputChange = async e => {
        await SET_login_TOKEN(e.target.value);
    };

    const loginSubmit = e => {

        e.preventDefault();

        window.ACCESS_TOKEN = login_TOKEN;

        stockInfo("ba", window.ACCESS_TOKEN)
            .then(() => {
                setLoggedIn(true);
                setIsError(false);
            })
            .catch(err => {
                setIsError(true);
                console.log(err);
            });
    };

    const removeErr = updateErr => {
        setIsError(updateErr);
    }

    const isAuth = () => {
        if (loggedin) {
            return <Route component={ValidUser} />
        }
        else {
            return <div className="login-ui">
                <div className="column">
                    <h2 className="ui teal image header">
                        <div className="content"> Please Enter Authentication Token</div>
                    </h2>
                    <form className="ui large form" onSubmit={loginSubmit}>
                        <div className="ui stacked segment">
                            <div className="field">
                                <div className="ui left icon input">
                                    <i className="lock icon"></i>
                                    <input type="text" onChange={onInputChange} />
                                </div>
                            </div>
                            <button className="ui fluid large teal submit button" type="submit">Login</button>
                        </div>
                    </form>
                    {isError ? <LoginError removeErr={removeErr} /> : ''}
                </div>
            </div>
        }
    }

    return (
        <Router>
            <div>
                {isAuth()}
            </div>
        </Router>
    );

}
export default Login;