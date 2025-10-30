// livelinedag/src/components/crisis/AccessControl.js
import React, { useState } from 'react';
import { useWeb3 } from '../../context/Web3Context';

const AccessControl = () => {
  const { contract, account } = useWeb3();
  const [crisisId, setCrisisId] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const checkAccess = async () => {
    if (!contract || !crisisId || !userAddress) return;

    try {
      setLoading(true);
      // For demo - in real app you'd call the contract
      setMessage(`Access check would be performed for crisis ${crisisId} and user ${userAddress}`);
    } catch (error) {
      console.error('Access check error:', error);
      setMessage('Error checking access: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Control</h2>
      
      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Check Access Permissions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Crisis ID
              </label>
              <input
                type="number"
                value={crisisId}
                onChange={(e) => setCrisisId(e.target.value)}
                placeholder="Enter crisis ID"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User Address
              </label>
              <input
                type="text"
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
                placeholder="0x..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={checkAccess}
            disabled={loading || !crisisId || !userAddress}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Access
          </button>
        </div>

        <div className="border border-green-200 rounded-lg p-4 bg-green-50">
          <h3 className="text-lg font-semibold mb-2 text-green-800">Your Access Status</h3>
          <div className="text-sm text-green-700">
            <p><strong>Connected Wallet:</strong> {account}</p>
            <p><strong>Status:</strong> Connected and Ready</p>
          </div>
        </div>

        {message && (
          <div className="p-4 rounded-md bg-blue-100 text-blue-800 border border-blue-200">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessControl;