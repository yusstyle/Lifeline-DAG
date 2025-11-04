// src/App.jsx
import React from 'react';
import { Web3Provider } from './context/Web3Context';
import HomePage from './components/home/HomePage';
import Dashboard from './components/dashboard/Dashboard';
import { useWeb3 } from './context/Web3Context';
import './index.css';

const AppContent = () => {
  const { isConnected, account } = useWeb3(); // Remove isBlockDAG check

  // Show dashboard when connected to ANY network
  if (isConnected) {
    return <Dashboard />;
  }

  return <HomePage />;
};

function App() {
  return (
    <Web3Provider>
      <div className="App">
        <AppContent />
      </div>
    </Web3Provider>
  );
}

export default App;