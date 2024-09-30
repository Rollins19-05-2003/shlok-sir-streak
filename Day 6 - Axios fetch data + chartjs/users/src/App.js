import DisplayData from './components/DisplayData';
import FetchData from './components/FetchData';

function App() {
  return (
    <div >
      <h1 className='text-2xl text-center font-bold mt-5'> 🧠Fetched Data from API using axios</h1>
      <FetchData/>
      <DisplayData/>
    </div>
  );
}

export default App;
