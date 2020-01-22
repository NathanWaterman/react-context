import React, { useReducer, useContext, useState, useEffect } from 'react'
import { stockInfo, stockLogo, stockNews, stockChart } from "../api/marketData";
import { Provider, Consumer } from '../contexts/ReactContextStore';
import SearchBar from '../components/search/SearchBar';
import StockNews from '../components/news/StockNews';
import StockQuote from '../components/quote/StockQuote';
import StockChart from '../components/chart/StockChart';
import ErrorUI from "./Error";


import { reducer, initialState } from '../reducers/AppReducers';


const App = () => {

	const [state, dispatch] = useReducer(reducer, initialState);

	console.log(state);

	const [newsData, setNewsData] = useState([]);
	const [chartData, setChartData] = useState([]);
	const [searchTerm, setSearchTerm] = useState(state.searchedTerm);
	const [stockImg, setStockImg] = useState("");
	const [quoteData, setQuoteData] = useState("");
	const [isLoading, setLoading] = useState(true);
	const [isError, setError] = useState(false);

	const removeErr = updateErr => {
		setError(updateErr);
	}

	//load stock data from API
	const loadStockData = () => {
		//load stock info
		stockInfo(searchTerm, window.ACCESS_TOKEN)
			.then(res => {
				setQuoteData(res.data);
				setError(false);
			})
			.catch(err => {
				setError(true);
				return err;
			});
		//load stock logo img
		stockLogo(searchTerm, window.ACCESS_TOKEN)
			.then(res => {
				setStockImg(res.data.url);
			})
			.catch(err => err);
		//load stock news
		stockNews(searchTerm, window.ACCESS_TOKEN)
			.then(res => {
				setNewsData(res.data);
			})
			.catch(err => err);
		//load stock chart range data
		stockChart(searchTerm, window.ACCESS_TOKEN)
			.then(res => {
				setChartData(res.data);
				setLoading(false);
			})
			.catch(err => err);
	};

	//TODO - Async problems with rendering updated state search from store
	//componentWillReceiveProps React hook equivalent - based on awaiting state to update
	// if left empty [] will render componentDidUpdate
	useEffect(() => {
		setSearchTerm(state.searchedTerm);
		loadStockData();
	}, [state, searchTerm, setSearchTerm]);

	if (isLoading) {
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
	else if (!isLoading) {
		return (
			<div className="ui main-view">
				<Provider value={{ state, dispatch }}>
					<div className="ui stackable one column grid">
						<div className="row">
							<div className="column">
								{isError ? <ErrorUI removeErr={removeErr} /> : ''}
								<div className="sixteen wide column">
									<SearchBar />
								</div>
							</div>
						</div>
					</div>
					<div className="ui stackable two column grid">
						<div className="row">
							<div className="column">
								<div className="row">
									<div className="column">
										<StockQuote
											quoteData={quoteData}
											stockImg={stockImg}
										/>
									</div>
									<div className="column">
										<div className="news-container ui fluid card">
											{newsData.length !== 0 ? <StockNews data={newsData} title={quoteData.companyName} /> : <h3 className="no-news">There is no Available News</h3>}
										</div>
									</div>
								</div>
							</div>
							<div className="column">
								<div className="row">
									<div className="column">
										<div className="chart-container ui fluid card">
											{chartData.length !== 0 ? <StockChart data={chartData} title={quoteData.companyName} /> : <h3 className="no-chart">There is no Available Stock Chart</h3>}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Provider>
			</div>
		);
	}
}
export default App;



// const App = () => {

// 	const [newsData, setNewsData] = useState([]);
// 	const [chartData, setChartData] = useState([]);
// 	const [searchTerm, setSearchTerm] = useState("ba");
// 	const [stockImg, setStockImg] = useState("");
// 	const [quoteData, setQuoteData] = useState("");
// 	const [isLoading, setLoading] = useState(true);
// 	const [isError, setError] = useState(false);


// 	//enter stock symbol and submit query
// 	const onTermSubmit = async term => {
// 		//on submit match symbol or companyName
// 		//EX: "symbol":"FB","companyName":"Facebook"
// 		await setSearchTerm(term);
// 		loadStockData();
// 	};

// 	const removeErr = updateErr => {
// 		setError(updateErr);
// 	}

// 	//load stock data from API
// 	const loadStockData = () => {
// 		//load stock info
// 		stockInfo(searchTerm, window.ACCESS_TOKEN)
// 			.then(res => {
// 				setQuoteData(res.data);
// 				setError(false);
// 			})
// 			.catch(err => {
// 				setError(true);
// 				return err;
// 			});
// 		//load stock logo img
// 		stockLogo(searchTerm, window.ACCESS_TOKEN)
// 			.then(res => {
// 				setStockImg(res.data.url);
// 			})
// 			.catch(err => err);
// 		//load stock news
// 		stockNews(searchTerm, window.ACCESS_TOKEN)
// 			.then(res => {
// 				setNewsData(res.data);
// 			})
// 			.catch(err => err);
// 		//load stock chart range data
// 		stockChart(searchTerm, window.ACCESS_TOKEN)
// 			.then(res => {
// 				setChartData(res.data);
// 				setLoading(false);
// 			})
// 			.catch(err => err);
// 	};

//     useEffect(() => {
//         loadStockData();
//     }, [searchTerm]);


// 	if (isLoading) {
// 		return (
// 			<div>
// 				<div className="ui segment loading-view">
// 					<div className="ui active dimmer">
// 						<div className="ui massive text loader">Loading</div>
// 					</div>
// 					<p></p>
// 					<p></p>
// 					<p></p>
// 				</div>
// 			</div>
// 		);
// 	}
// 	else if (!isLoading) {
// 		return (
// 			<div className="ui main-view">
// 				<div className="ui stackable one column grid">
// 					<div className="row">
// 						<div className="column">
// 							{isError ? <ErrorUI removeErr={removeErr} /> : ''}
// 							<div className="sixteen wide column">
// 								<SearchBar searchTerm={onTermSubmit} />
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 				<div className="ui stackable two column grid">
// 					<div className="row">
// 						<div className="column">
// 							<div className="row">
// 								<div className="column">
// 									<StockQuote
// 										quoteData={quoteData}
// 										stockImg={stockImg}
// 									/>
// 								</div>
// 								<div className="column">
// 									<div className="news-container ui fluid card">
// 										{newsData.length !== 0 ? <StockNews data={newsData} title={quoteData.companyName} /> : <h3 className="no-news">There is no Available News</h3>}
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 						<div className="column">
// 							<div className="row">
// 								<div className="column">
// 									<div className="chart-container ui fluid card">
// 										{chartData.length !== 0 ? <StockChart data={chartData} title={quoteData.companyName} /> : <h3 className="no-chart">There is no Available Stock Chart</h3>}
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		);
// 	}
// }
// export default App;
