import React from 'react'

const Loader = () => {
    return (
        <div>
            <div className="ui segment loading-view">
                <div className="ui active dimmer">
                    <div className="ui massive text loader">Loading</div>
                </div>
                <p></p>
                <p></p>
                <p></p>
            </div>
        </div>
    );
}

export default Loader;