// livelinedag/src/components/crisis/CrisisDashboard.js
import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../../context/Web3Context';

const CrisisDashboard = () => {
  const { contract } = useWeb3();
  const [crises, setCrises] = useState([]);
  const [loading, setLoading] = useState(true);

  const emergencyTypes = [
    'Natural Disaster',
    'Medical Emergency', 
    'Security Threat',
    'Infrastructure Failure',
    'Other'
  ];

  useEffect(() => {
    if (contract) {
      loadCrises();
    }
  }, [contract]);

  const loadCrises = async () => {
    if (!contract) return;
    
    try {
      setLoading(true);
      // For demo - in real app you'd fetch actual crisis data
      setCrises([]); // Empty for now
    } catch (error) {
      console.error('Error loading crises:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Crisis Dashboard</h2>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading crises...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Crisis Dashboard</h2>
        <button
          onClick={loadCrises}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Refresh
        </button>
      </div>

      {crises.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No crises declared yet. Be the first to declare an emergency.
        </div>
      ) : (
        <div className="space-y-4">
          {/* Crisis items would be mapped here */}
        </div>
      )}
    </div>
  );
};

export default CrisisDashboard;