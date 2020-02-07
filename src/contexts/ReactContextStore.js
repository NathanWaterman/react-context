import React, { createContext, useState, useEffect, useReducer } from 'react';
import { stockInfo, stockLogo, stockNews, stockChart } from "../api/marketData";

//set up context and context consumer
export const UserContext = createContext();
export const Consumer = UserContext.Consumer;

//reducer
export const UPDATE_SEARCH = "UPDATE_SEARCH";
export const SET_LOGIN = "SET_LOGIN";

export const reducer = (state, action) =>{
    switch(action.type){
        case UPDATE_SEARCH:
            return {
                ...state,
                searchTerm: action.payload
            }
            default:
                return state
    }
}

//set up context provider
export const Provider = ({children}) => {

    const [searchTerm, setSearchTerm] = useState('ba');
    const [stockImg, setStockImg] = useState("");
    const [quoteData, setQuoteData] = useState("");
    const [newsData, setNewsData] = useState([]);
    const [chartData, setChartData] = useState([]);


    //load stock data from API
    const loadStockData = () => {
        //load stock info
        stockInfo(searchTerm, 'pk_7922aebf3fde43d69bdc26b11d7bf57e')
            .then(res => {
                setQuoteData(res.data);
            })
            .catch(err => {
                return err;
            });
        //load stock logo img
        stockLogo(searchTerm, 'pk_7922aebf3fde43d69bdc26b11d7bf57e')
            .then(res => {
                setStockImg(res.data.url);
            })
            .catch(err => err);
        //load stock news
        stockNews('ba', 'pk_7922aebf3fde43d69bdc26b11d7bf57e')
            .then(res => {
                setNewsData(res.data);
            })
            .catch(err => err);
        //load stock chart range data
        stockChart(searchTerm,'pk_7922aebf3fde43d69bdc26b11d7bf57e')
            .then(res => {
                setChartData(res.data);
            })
            .catch(err => err);
    };

    


    const initialState = {
        searchTerm,
        setSearchTerm,
        stockImg,
        setStockImg,
        quoteData,
        setQuoteData,
        newsData,
        setNewsData,
        chartData,
        setChartData
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        loadStockData();
        console.log(newsData);
    }, [state]);


    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    );
};