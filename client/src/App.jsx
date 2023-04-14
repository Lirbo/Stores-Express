import { useState, useEffect } from 'react'
import './App.css'

function App() {
  
  const [stores, setStores] = useState([]);

  useEffect(()=>{
    loadStores();
  }, []);

  const loadStores = async () =>{
    try{
      let res = await fetch('http://localhost:3500/api/stores');
      let data = await res.json();
      setStores(data);
    }
    catch(error){
      console.error(error);
    }
  };

  return (
    <div className="App">
      {
        stores.map((store)=><div key={store.id}>
          <p>Store ID: {store.id}</p>
          <p>Store Name: {store.name}</p>
          <p>Store City: {store.city}</p>
        </div>)
      }
    </div>
  )
}

export default App
