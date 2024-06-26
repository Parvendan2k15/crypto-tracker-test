import React, {useState,useEffect} from 'react';
import './App.css';
import logo from './images/3.png';
import Coin from './Coin';
import axios from 'axios';
function App() {
   
  const [coins, setCoins]= useState([]);
  const [search, setSearch] = useState('');

useEffect(()=>{axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&locale=en'
).then(res => { 
  setCoins(res.data); 
 }).catch(error => console.log(error))
}, []);

const handleChange = e => {
  setSearch(e.target.value)
};

const filteredCoins = coins.filter(coin => 
  coin.name.toLowerCase().includes(search.toLowerCase())
  );


  return (
    
    <div className="coin-app">
      <div className='coin-search'>
        <img  className='coinflow-logo' src={logo} />
        
      <h1 className='coin-text'>COINFLOW</h1>
      
      <h2 className='coin-text-1'>Search your crypto</h2>
      <form>

        <input type="text" placeholder='Search' className='coin-input' onChange={handleChange}/>
      </form>
      </div >

      {filteredCoins.map(coin => {
        return <Coin 
          key={coin.id} 
          name={coin.name} 
          image={coin.image} 
          symbol={coin.symbol} 
          marketcap={coin.market_cap} 
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          volume={coin.total_volume}
          />;
        })}
    </div>
  );
}

export default App;