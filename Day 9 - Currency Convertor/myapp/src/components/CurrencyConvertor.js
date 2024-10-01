import React, { useEffect, useState } from 'react'
import CurrencyDropdown from './CurrencyDropdown'
import {HiArrowsRightLeft} from "react-icons/hi2";

const CurrencyConvertor = () => {
    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1);
    const [converting, setConverting] = useState(false);
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("INR");
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || ["INR", "USD"]);

    const fetchCurrencies = async () => {
        try {
          const res = await fetch("https://api.frankfurter.app/currencies");
          const data = await res.json();
    
          setCurrencies(Object.keys(data)); // converting object data to array
        } catch (error) {
          console.error("Error Fetching", error);
        }
    };

    const convertCurrency = async () => {
        if (!amount) return;
        setConverting(true);
        try {
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
          );
          const data = await res.json();
    
          setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
        } catch (error) {
          console.error("Error Fetching", error);
        } finally {
          setConverting(false);
        }
    };

    const swapCurrencies = () =>{
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    }

    const handleFavorite = (currency) =>{
        let updatedFavorites = [...favorites];
        if(favorites.includes(currency)){
            updatedFavorites = updatedFavorites.filter((curr) => curr !== currency);
        }else{
            updatedFavorites.push(currency);
        }

        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
    
    useEffect(() => {
    fetchCurrencies();
    }, []);

  return (
    <div className='bg-white p-5 rounded-lg shadow-md max-w-xl mx-auto my-10'>
        <h2 className='text-2xl font-semibold text-gray-700 text-center'>Currency Convertor</h2>
        <div className='flex justify-between gap-12 items-center mt-6'>
            <CurrencyDropdown title="From :" currencies={currencies} currency={fromCurrency} setCurrency={setFromCurrency} favorites={favorites} handleFavorite={handleFavorite}/>
            <div className='mt-4'>
                <button onClick={swapCurrencies} className='bg-gray-200 rounded-full p-2'>
                    <HiArrowsRightLeft className='text-2xl text-gray-700'/>
                </button>
            </div>
            <CurrencyDropdown title="To :" currencies={currencies} currency={toCurrency} setCurrency={setToCurrency} favorites={favorites} handleFavorite={handleFavorite}/>
        </div>

        <div className="mt-4">
            <label htmlFor="amount" className="block text-md font-medium text-gray-700">Amount:</label>
            <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"/>
        </div>

        <div className="flex justify-end mt-6">
        <button onClick={convertCurrency}
          className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          ${converting ? "animate-pulse" : ""}`}
        >
          Convert
        </button>

        </div>

        {convertedAmount && (
        <div className="mt-4 text-lg font-medium text-right text-green-600">
          Converted Amount: {convertedAmount}
        </div>
      )}
    </div>
  )
}

export default CurrencyConvertor