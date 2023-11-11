import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,Cell } from 'recharts';
import styles from './PriceForecast.module.css'; // Your CSS styles

const PriceForecast = () => {
  const [priceData, setPriceData] = useState([
    { name: 'Iron', price: 120.43*0.7 }, // Updated base price
    { name: 'Chromium', price: 1198.22*0.18 }, // Updated base price
    { name: 'Nickel', price: 18264.04*0.08 }, // Updated base price
    { name: 'Cost', price: 0   },
    { name: 'StainlessSteel', price: 2000   },
  ]);

  const fetchPrices = async () => {
    const newPriceData = await getLatestPricesFromAPI();
    setPriceData(newPriceData);
    const costData = newPriceData.find(item => item.name === 'Cost');
    const stainlessSteelData = newPriceData.find(item => item.name === 'StainlessSteel');
    if (costData && stainlessSteelData && costData.price > stainlessSteelData.price) {
      //alert('Cost is greater than the price of Stainless Steel');
    }
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      fetchPrices();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.priceForecast}>
      <h2>Real-Time Price Monitor</h2>
      <BarChart width={600} height={300} data={priceData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Bar dataKey="price" fill="#8884d8">
    {
      priceData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={entry.name === 'Cost' ? '#ff0000' : entry.name === 'StainlessSteel' ? '#006400' :'#8884d8'} />
      ))
    }
  </Bar>
</BarChart>


    </div>
  );
};

const getLatestPricesFromAPI = async () => {
  // Calculate fluctuated prices for each metal
  const ironPrice = fluctuatePrice(120.43 * 0.7);
  const chromiumPrice = fluctuatePrice(1198.22 * 0.18);
  const nickelPrice = fluctuatePrice(18264.04 * 0.08);
  const StainlessSteel=fluctuatePrice(2000);
  // Calculate the total cost for stainless steel
  const totalCostPerTonStainlessSteel = ironPrice + chromiumPrice + nickelPrice;
  return [
    { name: 'Iron', price: ironPrice },
    { name: 'Chromium', price: chromiumPrice },
    { name: 'Nickel', price: nickelPrice },
    { name: 'Cost', price: totalCostPerTonStainlessSteel },
    { name: 'StainlessSteel', price: StainlessSteel },
  ];
};


// Function to fluctuate the price by ±10%
function fluctuatePrice(basePrice) {
  const fluctuation = basePrice * 0.1; // 10% of the base price
  const change = Math.random() * fluctuation * 2 - fluctuation; // Random change between -fluctuation and +fluctuation
  return basePrice + change; // New price
}

export default PriceForecast;
