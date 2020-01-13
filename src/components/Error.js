import React, { Component, useState, useEffect } from "react";

//REACT HOOK
const ErrorUI = (props) =>{

    const [closeErr, setCloseErr] = useState(false);

    const ErrClose = () => {
        props.removeErr(closeErr);
    };

    return (
        <div className="ui error message">
            <i onClick={ErrClose} className="close icon"></i>
            <div className="header">
                There were some errors with your submission
            </div>
            <ul className="list">
                <li>You have entered the wrong Stock Quote Symbol.</li>
            </ul>
        </div>
    )

}
export default ErrorUI;