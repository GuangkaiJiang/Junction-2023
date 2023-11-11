import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import styles from './PriceForecast.module.css'; // Your CSS styles

const PriceForecast = () => {
  const [priceData, setPriceData] = useState([
    { name: 'Iron', price: 0 },
    { name: 'Chromium', price: 0 },
    { name: 'Nickel', price: 0 },
  ]);

  // Function to fetch the latest prices and update state
  const fetchPrices = async () => {
    // Replace with your actual API call
    const newPriceData = await getLatestPricesFromAPI();
    setPriceData(newPriceData);
  };

  useEffect(() => {
    // Set up a timer to fetch the price data every X seconds
    const interval = setInterval(() => {
      fetchPrices();
    }, 5000); // Adjust the interval as needed

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Render the bar chart with the price data
  return (
    <div className={styles.priceForecast}>
      <h2>Real-Time Price Monitor</h2>
      <BarChart width={600} height={300} data={priceData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="price" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

// Mock function to simulate API call - replace this with your real API call
const getLatestPricesFromAPI = async () => {
  // Simulate network request delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Simulate price data - replace this with actual data from your API
  return [
    { name: 'Iron', price: Math.random() * 100 },
    { name: 'Chromium', price: Math.random() * 100 },
    { name: 'Nickel', price: Math.random() * 100 },
  ];
};

export default PriceForecast;
