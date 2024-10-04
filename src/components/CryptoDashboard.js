import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CryptoBlock = ({ symbol, price, changePercent24Hr }) => (
  <div className="terminal-block">
    <p className="terminal-text">{symbol}</p>
    <p className="terminal-text">${parseFloat(price).toFixed(2)}</p>
    <p className="terminal-text">
      {parseFloat(changePercent24Hr) >= 0 ? '+' : ''}{parseFloat(changePercent24Hr).toFixed(2)}%
    </p>
  </div>
);

const CryptoDashboard = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coincap.io/v2/assets?limit=100');
        setCryptoData(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
        setError('Failed to fetch crypto data. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  if (isLoading) return <div className="terminal-text blink">LOADING...</div>;
  if (error) return <div className="terminal-text">ERROR: {error}</div>;

  return (
    <div className="terminal-app">
      <header className="terminal-header">
        <h1 className="terminal-title">TROOPYCRYPTO TERMINAL</h1>
      </header>
      <main className="terminal-main">
        <div className="terminal-container">
          <h2 className="terminal-title-2">TOP 100 CRYPTOCURRENCIES</h2>
          <div className="terminal-grid">
            {cryptoData.map((crypto) => (
              <CryptoBlock
                key={crypto.id}
                symbol={crypto.symbol}
                price={crypto.priceUsd}
                changePercent24Hr={crypto.changePercent24Hr}
              />
            ))}
          </div>
        </div>
      </main>
      <footer className="terminal-footer">
        <p>&copy; 2024 TROOPYCRYPTO. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  );
};

export default CryptoDashboard;