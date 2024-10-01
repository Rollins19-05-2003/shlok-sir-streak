import React from 'react'
import {HiOutlineStar, HiStar} from "react-icons/hi2";

const CurrencyDropdown = ({title, currencies, currency, setCurrency, favorites, handleFavorite}) => {
    const isFavorites = (currency) => favorites.includes(currency);
  return (
    <div className=''>
      <lable className="font-semibold text-gray-700">{title}</lable>
      <div className=' mt-1 relative'>
        <select onChange={(e)=>{setCurrency(e.target.value)}} value={currency}
        className='bg-gray-200 p-4 rounded-md font-bold focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:outline-none'>
            {
                favorites.map((currency) => {
                return <option className="bg-gray-200" value={currency} key={currency}>{currency}</option>
                })
            }
          <hr />
            {
                currencies.filter((curr) => !favorites.includes(curr)).map((currency)=>{
                    return <option key={currency} value={currency}>{currency}</option>
                })
            }
        </select>

        <button onClick={() => handleFavorite(currency)} className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5"> 
            {isFavorites(currency) ? <HiStar/> : <HiOutlineStar />}
        </button>
      </div>
    </div>
  )
}

export default CurrencyDropdown
