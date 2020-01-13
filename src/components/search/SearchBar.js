import React, { useState, useEffect, useContext, useReducer } from "react";
import UserContext, { Provider, Consumer } from '../ReactContextStore';
import { UPDATE_SEARCH } from '../AppReducers';
import "./search.css"

const SearchBar = () => {

	const { dispatch } = useContext(UserContext);

	console.log(UserContext);

	const [term, setTerm] = useState('');

	const onInputChange = async e => {
		await setTerm(e.target.value);
	};

	const onSearchSubmit = e => {
		e.preventDefault();
		dispatch({ type: UPDATE_SEARCH, searchedTerm: term });
	};

	return (
		<form onSubmit={onSearchSubmit} className="search-bar ui segment">
			<div className="ui large action input sixteen wide column">
				<input
					type="text"
					value={term}
					onChange={onInputChange}
					placeholder="Please Enter Stock Symbol..."
				/>
				<button className="ui button" type="submit"><span className="mobile-hidden">Find Stock Quote</span><i className="chart line icon"></i></button>
			</div>
		</form>
	);
	
}
export default SearchBar;


// REACT HOOK
// const SearchBar = ({ searchTerm }) => {

// 	const [term, setTerm] = useState('');

// 	const onInputChange = async e => {
// 		await setTerm(e.target.value);
// 	};

	// const onSearchSubmit = e => {
	// 	e.preventDefault();
	// 	searchTerm(term);
	// };

// 	return (
// 		<form onSubmit={onSearchSubmit} className="search-bar ui segment">
// 			<div className="ui large action input sixteen wide column">
// 				<input
// 					type="text"
// 					value={term}
// 					onChange={onInputChange}
// 					placeholder="Please Enter Stock Symbol..."
// 				/>
// 				<button className="ui button" type="submit"><span className="mobile-hidden">Find Stock Quote</span><i className="chart line icon"></i></button>
// 			</div>
// 		</form>
// 	);
// }
// export default SearchBar;