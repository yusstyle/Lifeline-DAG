// src/components/dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../../context/Web3Context';
import IdentityCard from './IdentityCard';
import CrisisList from './CrisisList';
import EmergencyDeclare from './EmergencyDeclare';
import AccessControl from './AccessControl';
import { formatAddress } from '../../utils/blockchain';

const Dashboard = () => {
  const { account, contract, currentChain, disconnectWallet } = useWeb3(); // Removed isBlockDAG
  const [activeTab, setActiveTab] = useState('overview');
  const [userIdentity, setUserIdentity] = useState(null);
  const [crisisCount, setCrisisCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      if (contract && account) {
        try {
          // Check if user has identity
          const identity = await contract.identities(account);
          if (identity && identity.wallet !== '0x0000000000000000000000000000000000000000') {
            setUserIdentity(identity);
          }

          // Get crisis count
          const count = await contract.crisisCount();
          setCrisisCount(Number(count));
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [contract, account]);

  const tabs = [
    { id: 'overview', name: '📊 Overview', icon: '📊' },
    { id: 'identity', name: '🆔 Identity', icon: '🆔' },
    { id: 'crises', name: '🚨 Crises', icon: '🚨' },
    { id: 'declare', name: '⚠️ Declare', icon: '⚠️' },
    { id: 'access', name: '🔐 Access', icon: '🔐' }
  ];

  // Get network name from chain ID
  const getNetworkName = (chainId) => {
    const networks = {
      '0x1': 'Ethereum Mainnet',
      '0xaa36a7': 'Sepolia Testnet',
      '0x89': 'Polygon Mainnet',
      '0x13881': 'Polygon Mumbai',
      '0x38': 'BSC Mainnet',
      '0x61': 'BSC Testnet',
      '0xa4b1': 'Arbitrum',
      '0x3e8': 'BlockDAG Testnet',
      '0x539': 'Localhost'
    };
    return networks[chainId] || `Chain ${chainId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                🚨
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Crisis Dashboard</h1>
                <p className="text-sm text-gray-500">Emergency Response System</p> {/* Removed BlockDAG */}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-1">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-700 text-sm font-medium">Connected</span>
                </div>
                <div className="text-green-600 text-xs font-mono">{formatAddress(account)}</div>
                <div className="text-green-500 text-xs mt-1">
                  {currentChain ? getNetworkName(currentChain) : 'Unknown Network'}
                </div>
              </div>
              
              <button
                onClick={disconnectWallet}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Total Crises</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{crisisCount}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🚨</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-green-600 text-sm font-medium">
                    +2 this week
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Identity Status</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {userIdentity ? (userIdentity.verified ? 'Verified' : 'Pending') : 'Not Registered'}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🆔</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-blue-600 text-sm font-medium">
                    {userIdentity ? 'Registered' : 'Register now'}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Network</p>
                    <p className="text-xl font-bold text-gray-900 mt-1">
                      {currentChain ? getNetworkName(currentChain) : 'Unknown'}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">⛓️</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-green-600 text-sm font-medium">
                    Connected & Secure
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('identity')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🆔</span>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Manage Identity</p>
                    <p className="text-sm text-gray-500">Register or update your identity</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('declare')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">⚠️</span>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Declare Emergency</p>
                    <p className="text-sm text-gray-500">Report a new crisis situation</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('crises')}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-200"
                >
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">📋</span>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">View Crises</p>
                    <p className="text-sm text-gray-500">Monitor active emergencies</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'identity' && <IdentityCard />}
        {activeTab === 'crises' && <CrisisList />}
        {activeTab === 'declare' && <EmergencyDeclare />}
        {activeTab === 'access' && <AccessControl />}
      </main>
    </div>
  );
};

export default Dashboard;