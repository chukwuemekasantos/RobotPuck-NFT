import { useState } from 'react';
import './App.css';
import NavBar from './NavBar';
import  MainMint from './MainMint';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [Connected, setConnected] = useState(false);

  return (
    <div className="App">
      <NavBar  />
      <MainMint />
    </div>
  );
}

export default App;
