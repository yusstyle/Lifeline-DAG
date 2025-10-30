// livelinedag/src/components/crisis/EmergencyDeclare.js
import React, { useState } from 'react';
import { useWeb3 } from '../../context/Web3Context';

const EmergencyDeclare = () => {
  const { contract, account } = useWeb3();
  const [formData, setFormData] = useState({
    emergencyType: '0',
    location: '',
    encryptedData: '',
    dataHash: '',
    initialResponders: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const emergencyTypes = [
    { value: '0', label: 'Natural Disaster' },
    { value: '1', label: 'Medical Emergency' },
    { value: '2', label: 'Security Threat' },
    { value: '3', label: 'Infrastructure Failure' },
    { value: '4', label: 'Other' }
  ];

  const handleDeclareEmergency = async (e) => {
    e.preventDefault();
    if (!contract) {
      setMessage('Contract not connected');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Convert comma-separated addresses to array
      const responders = formData.initialResponders
        .split(',')
        .map(addr => addr.trim())
        .filter(addr => addr !== '');

      const tx = await contract.declareEmergency(
        parseInt(formData.emergencyType),
        formData.location,
        formData.encryptedData,
        formData.dataHash,
        responders
      );
      
      const receipt = await tx.wait();
      setMessage('✅ Emergency declared successfully! Crisis ID created.');
      setFormData({
        emergencyType: '0',
        location: '',
        encryptedData: '',
        dataHash: '',
        initialResponders: ''
      });
    } catch (error) {
      console.error('Emergency declaration error:', error);
      setMessage('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Declare Emergency</h2>
      
      <form onSubmit={handleDeclareEmergency} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Emergency Type
          </label>
          <select
            name="emergencyType"
            value={formData.emergencyType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {emergencyTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="GPS coordinates or address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Encrypted Data
          </label>
          <textarea
            name="encryptedData"
            value={formData.encryptedData}
            onChange={handleChange}
            placeholder="Encrypted emergency data"
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data Hash
          </label>
          <input
            type="text"
            name="dataHash"
            value={formData.dataHash}
            onChange={handleChange}
            placeholder="SHA-256 hash of the data"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Initial Responders (comma-separated addresses)
          </label>
          <input
            type="text"
            name="initialResponders"
            value={formData.initialResponders}
            onChange={handleChange}
            placeholder="0x123..., 0x456..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Declaring Emergency...' : 'Declare Emergency'}
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded-md ${
          message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default EmergencyDeclare;