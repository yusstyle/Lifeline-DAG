// livelinedag/src/components/crisis/Dashboard.js
import React, { useState } from 'react';
import { useWeb3 } from '../../context/Web3Context';
import EmergencyDeclare from './EmergencyDeclare';
import IdentityRegister from './IdentityRegister';
import CrisisDashboard from './CrisisDashboard';
import AccessControl from './AccessControl';

const Dashboard = () => {
  const { isConnected, isLoading } = useWeb3();
  const [activeTab, setActiveTab] = useState('register');

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Checking wallet connection...</p>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to LifelineDAG
        </h2>
        <p className="text-gray-600 mb-8">
          Connect your wallet to access emergency response features
        </p>
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded max-w-md mx-auto">
          Please connect your wallet to continue
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="flex border-b">
          {[
            { id: 'register', label: 'Identity Registration' },
            { id: 'emergency', label: 'Declare Emergency' },
            { id: 'crises', label: 'Crisis Dashboard' },
            { id: 'access', label: 'Access Control' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        {activeTab === 'register' && <IdentityRegister />}
        {activeTab === 'emergency' && <EmergencyDeclare />}
        {activeTab === 'crises' && <CrisisDashboard />}
        {activeTab === 'access' && <AccessControl />}
      </div>
    </div>
  );
};

export default Dashboard;