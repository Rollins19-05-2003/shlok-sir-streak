import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [currPage, setCurrPage] = useState(1);

    useEffect(()=>{
        axios.get('https://dummyjson.com/products')
        .then(res => setProducts(res.data.products))
        .catch(err => console.log(err));
    }, [])

    const selectPage = (selectedPage) => {
      if (selectedPage >= 1 && selectedPage <= Math.ceil(products.length / 7) && selectedPage !== currPage) {
        setCurrPage(selectedPage)
      }
    }


  return (
      <div className="">
        {
          products.length > 0 && <div className="text-3xl font-bold flex flex-wrap">
            {
              products.slice((currPage-1)*7, currPage*7).map((product)=>{
                return <span key={product.id} className=' bg-slate-200 w-80 m-4 p-4 rounded-md'>
                  <img src={product.thumbnail} alt={product.brand} className=' cursor-pointer'></img>
                  <h3 className='text-xl text-center'>{product.title}</h3>
                </span>
              })
            }
          </div>
        }

        {
          products.length > 0 && <div className='text-2xl text-center font-bold'>
            <button className='bg-gray-300 px-3 py-2 rounded-md' onClick={()=>selectPage(currPage-1)}>Prev</button>
            {[...Array(Math.ceil(products.length / 7))].map((_, i) => {
              return <span key={i} className={currPage === i + 1 ? "bg-gray-400 px-3 py-2  mx-2 rounded-lg cursor-not-allowed" : "px-3 py-2 bg-slate-200 mx-2 rounded-lg cursor-pointer"} onClick={() => selectPage(i + 1)}>{i + 1}</span>
            })}
            <button className='bg-gray-300 px-3 py-2 rounded-md' onClick={()=>selectPage(currPage+1)}>Next</button>
          </div> 
        }

        {console.log(products)}
      </div>
  );
}

export default App;
