// src/components/dashboard/CrisisList.jsx
import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../../context/Web3Context';
import { formatTimestamp, getEmergencyType, parseBigNumber } from '../../utils/blockchain';

const CrisisList = () => {
  const { contract } = useWeb3();
  const [crises, setCrises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCrisis, setSelectedCrisis] = useState(null);

  useEffect(() => {
    const fetchCrises = async () => {
      if (!contract) return;

      try {
        setLoading(true);
        const crisisCount = await contract.crisisCount();
        const count = parseBigNumber(crisisCount);
        
        const crisesData = [];
        for (let i = 0; i < count; i++) {
          try {
            const crisis = await contract.crises(i);
            crisesData.push({
              id: i,
              emergencyType: Number(crisis.emergencyType),
              location: crisis.location,
              encryptedData: crisis.encryptedData,
              dataHash: crisis.dataHash,
              declaredBy: crisis.declaredBy,
              timestamp: crisis.timestamp,
              verified: crisis.verified,
              verificationCount: parseBigNumber(crisis.verificationCount)
            });
          } catch (error) {
            console.error(`Error fetching crisis ${i}:`, error);
          }
        }
        
        setCrises(crisesData.sort((a, b) => b.timestamp - a.timestamp));
      } catch (error) {
        console.error('Error fetching crises:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrises();
  }, [contract]);

  const getEmergencyColor = (type) => {
    const colors = {
      0: 'bg-blue-100 text-blue-800 border-blue-200', // Natural Disaster
      1: 'bg-red-100 text-red-800 border-red-200',   // Medical Emergency
      2: 'bg-orange-100 text-orange-800 border-orange-200', // Security Threat
      3: 'bg-yellow-100 text-yellow-800 border-yellow-200', // Infrastructure
      4: 'bg-green-100 text-green-800 border-green-200'     // Environmental
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
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
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Active Crises</h2>
            <p className="text-gray-600 mt-1">Monitor and manage emergency situations</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
            <span className="text-blue-700 font-medium">{crises.length} Crisis{crises.length !== 1 ? 'es' : ''}</span>
          </div>
        </div>
      </div>

      {/* Crises Grid */}
      {crises.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📋</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Crises</h3>
          <p className="text-gray-600 mb-6">
            There are currently no active emergency situations reported.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {crises.map((crisis) => (
            <div
              key={crisis.id}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedCrisis(crisis)}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getEmergencyColor(crisis.emergencyType)}`}>
                    {getEmergencyType(crisis.emergencyType)}
                  </div>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                    crisis.verified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    <span>{crisis.verified ? '✅' : '⏳'}</span>
                    <span>{crisis.verified ? 'Verified' : 'Pending'}</span>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  #{crisis.id}
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 text-lg mb-2">
                {crisis.location || 'Unknown Location'}
              </h3>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Declared By:</span>
                  <span className="font-mono text-gray-900">
                    {crisis.declaredBy.slice(0, 8)}...{crisis.declaredBy.slice(-6)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="text-gray-900">{formatTimestamp(crisis.timestamp)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Verifications:</span>
                  <span className="text-gray-900">{crisis.verificationCount}</span>
                </div>
              </div>

              {crisis.dataHash && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 font-mono break-all">
                    Hash: {crisis.dataHash}
                  </p>
                </div>
              )}

              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200">
                  View Details
                </button>
                {!crisis.verified && (
                  <button className="bg-green-50 hover:bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors duration-200">
                    Verify
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Crisis Detail Modal */}
      {selectedCrisis && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Crisis Details</h3>
              <button
                onClick={() => setSelectedCrisis(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Emergency Type</label>
                  <div className={`px-3 py-2 rounded-lg text-sm font-medium ${getEmergencyColor(selectedCrisis.emergencyType)}`}>
                    {getEmergencyType(selectedCrisis.emergencyType)}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                  <div className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    selectedCrisis.verified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {selectedCrisis.verified ? '✅ Verified' : '⏳ Pending Verification'}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Location</label>
                <div className="text-lg text-gray-900 bg-gray-50 p-3 rounded-lg">
                  {selectedCrisis.location || 'Not specified'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Declared By</label>
                <div className="text-gray-900 bg-gray-50 p-3 rounded-lg font-mono">
                  {selectedCrisis.declaredBy}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Declaration Time</label>
                  <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {formatTimestamp(selectedCrisis.timestamp)}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Verification Count</label>
                  <div className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {selectedCrisis.verificationCount}
                  </div>
                </div>
              </div>

              {selectedCrisis.encryptedData && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Encrypted Data</label>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap break-all">
                      {selectedCrisis.encryptedData}
                    </pre>
                  </div>
                </div>
              )}

              {selectedCrisis.dataHash && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Data Hash</label>
                  <div className="bg-gray-50 p-3 rounded-lg font-mono text-sm">
                    {selectedCrisis.dataHash}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setSelectedCrisis(null)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Close
                </button>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Request Access
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrisisList;