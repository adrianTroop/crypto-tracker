import React from 'react';

const CryptoCard = ({ name, symbol, price, changePercent24Hr }) => (
  <div className="bg-white shadow-md rounded-lg p-4 m-2">
    <h2 className="text-xl font-bold">{name} ({symbol})</h2>
    <p className="text-2xl">${parseFloat(price).toFixed(2)}</p>
    <p className={`${parseFloat(changePercent24Hr) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
      {parseFloat(changePercent24Hr).toFixed(2)}%
    </p>
  </div>
);

export default CryptoCard;