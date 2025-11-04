// src/components/dashboard/AccessControl.jsx
import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../../context/Web3Context';
import { formatTimestamp, parseBigNumber } from '../../utils/blockchain';

const AccessControl = () => {
  const { contract, account } = useWeb3();
  const [loading, setLoading] = useState(false);
  const [accessLogs, setAccessLogs] = useState([]);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [grantForm, setGrantForm] = useState({
    crisisId: '',
    userAddress: '',
    duration: '3600' // 1 hour in seconds
  });

  useEffect(() => {
    const fetchAccessData = async () => {
      if (!contract) return;

      try {
        setLoading(true);
        
        // Check emergency mode
        const mode = await contract.emergencyMode();
        setEmergencyMode(mode);

        // Fetch user's access logs (simplified - in real app you'd paginate)
        const crisisCount = await contract.crisisCount();
        const count = parseBigNumber(crisisCount);
        
        const logs = [];
        for (let crisisId = 0; crisisId < Math.min(count, 10); crisisId++) {
          try {
            // Check if user has access to this crisis
            const hasAccess = await contract.canAccessCrisis(crisisId, account);
            if (hasAccess) {
              logs.push({
                crisisId,
                hasAccess: true,
                grantedAt: Date.now() / 1000, // Simplified - you'd get from contract
                expiresAt: (Date.now() / 1000) + 3600 // Simplified
              });
            }
          } catch (error) {
            console.error(`Error checking access for crisis ${crisisId}:`, error);
          }
        }
        
        setAccessLogs(logs);
      } catch (error) {
        console.error('Error fetching access data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessData();
  }, [contract, account]);

  const handleGrantAccess = async (e) => {
    e.preventDefault();
    if (!contract) return;

    try {
      setLoading(true);
      // Note: This function would need to be implemented in your contract
      // For now, we'll simulate the behavior
      alert('Access control functions need to be implemented in the smart contract');
      
      // Reset form
      setGrantForm({
        crisisId: '',
        userAddress: '',
        duration: '3600'
      });
    } catch (error) {
      console.error('Error granting access:', error);
      alert('Failed to grant access. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmergencyAccess = async (crisisId) => {
    if (!contract) return;

    try {
      setLoading(true);
      const tx = await contract.emergencyAccess(crisisId);
      await tx.wait();
      alert('Emergency access granted! Break-glass protocol activated.');
    } catch (error) {
      console.error('Error requesting emergency access:', error);
      alert('Failed to request emergency access. You may not have sufficient permissions.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setGrantForm({
      ...grantForm,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🔐</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Access Control</h2>
              <p className="text-gray-600 mt-1">
                Manage permissions and emergency access to crisis data
              </p>
            </div>
          </div>
          
          <div className={`px-4 py-2 rounded-lg font-medium ${
            emergencyMode 
              ? 'bg-red-100 text-red-800 border border-red-200' 
              : 'bg-green-100 text-green-800 border border-green-200'
          }`}>
            {emergencyMode ? '🚨 Emergency Mode Active' : '✅ Normal Mode'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grant Access Form */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Grant Access</h3>
          
          <form onSubmit={handleGrantAccess} className="space-y-4">
            <div>
              <label htmlFor="crisisId" className="block text-sm font-medium text-gray-700 mb-2">
                Crisis ID
              </label>
              <input
                type="number"
                id="crisisId"
                name="crisisId"
                value={grantForm.crisisId}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                placeholder="Enter crisis ID number"
              />
            </div>
            
            <div>
              <label htmlFor="userAddress" className="block text-sm font-medium text-gray-700 mb-2">
                User Wallet Address
              </label>
              <input
                type="text"
                id="userAddress"
                name="userAddress"
                value={grantForm.userAddress}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 font-mono text-sm"
                placeholder="0x742d35Cc... (42 character address)"
              />
            </div>
            
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                Access Duration
              </label>
              <select
                id="duration"
                name="duration"
                value={grantForm.duration}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
              >
                <option value="900">15 minutes</option>
                <option value="1800">30 minutes</option>
                <option value="3600">1 hour</option>
                <option value="7200">2 hours</option>
                <option value="14400">4 hours</option>
                <option value="86400">24 hours</option>
              </select>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Granting Access...' : 'Grant Access'}
            </button>
          </form>
        </div>

        {/* Emergency Access */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Emergency Access</h3>
          
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-2xl">🚨</span>
                <div>
                  <h4 className="font-semibold text-red-800">Break-Glass Protocol</h4>
                  <p className="text-red-700 text-sm">
                    Immediate access to any crisis without normal permissions
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label htmlFor="emergencyCrisisId" className="block text-sm font-medium text-red-700 mb-2">
                    Crisis ID for Emergency Access
                  </label>
                  <input
                    type="number"
                    id="emergencyCrisisId"
                    min="0"
                    className="w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 bg-white"
                    placeholder="Enter crisis ID"
                  />
                </div>
                
                <button
                  onClick={() => {
                    const crisisId = document.getElementById('emergencyCrisisId').value;
                    if (crisisId) handleEmergencyAccess(crisisId);
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>🚨</span>
                  <span>Activate Emergency Access</span>
                </button>
              </div>
              
              <div className="mt-3 pt-3 border-t border-red-200">
                <p className="text-xs text-red-600">
                  ⚠️ This action is logged and requires post-event justification. 
                  Use only in true emergencies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Access Logs */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Your Access Permissions</h3>
        
        {accessLogs.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <p className="text-gray-600">
              You don't have access to any crisis data yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {accessLogs.map((log, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Crisis #{log.crisisId}</h4>
                    <p className="text-sm text-gray-500">
                      Access granted until {formatTimestamp(log.expiresAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Active
                  </span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* System Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
          <span className="text-blue-600 mr-2">ℹ️</span>
          Access Control Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <p className="font-medium">Normal Access:</p>
            <p>Granted by authorized personnel for specific crises with time limits</p>
          </div>
          <div>
            <p className="font-medium">Emergency Access:</p>
            <p>Immediate access for verified responders in critical situations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessControl;