import styles from './Dashboard.module.css';
import { PieChart, Pie, Cell, Legend } from 'recharts';
import { AiOutlineCalendar } from 'react-icons/ai';
import PriceForecast from './PriceForecast';
import React, { useState, useEffect } from 'react';
import logo from './junctionlogo.png';

const pieData = [
    { name: 'Iron', value: 70, color: '#646464' },
    { name: 'Chromium', value: 18, color: '#8A99C7' },
    { name: 'Nickel', value: 8, color: '#B7B7CD' },
    { name: 'Molybdenum', value: 2, color: '#DAA520' },
    { name: 'Manganese', value: 1, color: '#9C7C38' },
    { name: 'Silicon', value: 0.5, color: '#C0C0C0' },
    { name: 'Carbon', value: 0.3, color: '#333333' },
  ];
  
const knownValueSum = pieData.reduce((acc, entry) => acc + entry.value, 0);
const otherValue = 100 - knownValueSum;
pieData.push({ name: 'Other', value: otherValue, color: '#AAAAAA' });

const DailyInsights = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      //alternative https://gnews.io/api/v4/search?q=Outokumpu&lang=en&country=finland&max=10&apikey=41f73ac9043fa5207d96b64789c76c12
      //const response = await fetch('https://newsapi.org/v2/everything?q=Outokumpu&from=2023-10-11&sortBy=publishedAt&apiKey=6f27cd6d9f34460cad2344f6bcf942be'); 
      const response = await fetch('https://gnews.io/api/v4/search?q=Outokumpu&country=finland&max=10&apikey=41f73ac9043fa5207d96b64789c76c12'); 
      //const response = await fetch('/api/news'); // Firebase Function
      //if (!response.ok) {
      //    console.error('Failed to fetch articles');
      //    return;
      //}
      const data = await response.json();
      setArticles(data.articles);
    };

    fetchArticles();
  }, []);

  return (
    <div>
      {articles.map((article, index) => (
        <div key={index}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
      ))}
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
      
        <div className={styles.dateSection}>
        <img src={logo} alt="Logo" style={{ height: '80px',width: '80px'  }} /> 
          <h1>12 November 2023 (Today)</h1>
          <AiOutlineCalendar size={24} />
        </div>
      </div>
<div className={styles.stainlessSteelComposition}>
        <h2>Stainless Steel Composition</h2>
        <PieChart width={730} height={250}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend layout="vertical" align="right" verticalAlign="middle" />
        </PieChart>
      </div>
        <div className={styles.priceForecast}>
          <PriceForecast />
        </div>
        <div className={styles.dailyInsights}>
        <h2>Daily Insights</h2>
        <DailyInsights />
      </div>
     
      <div className={styles.footer}>
        <div className={styles.pastQueries}>
          <h2>Past Queries</h2>
          {/* List Past Queries */}
        </div>
        <div className={styles.aiAssistant}>
          <h2>AI Assistant</h2>
          {/* AI Assistant Interaction Area */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
