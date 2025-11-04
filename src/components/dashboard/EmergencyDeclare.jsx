// src/components/dashboard/EmergencyDeclare.jsx
import React, { useState } from 'react';
import { useWeb3 } from '../../context/Web3Context';

const EmergencyDeclare = () => {
  const { contract, account } = useWeb3();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    emergencyType: '0',
    location: '',
    encryptedData: '',
    dataHash: '',
    initialResponders: ''
  });

  const emergencyTypes = [
    { value: '0', label: 'Natural Disaster', description: 'Earthquakes, floods, hurricanes, etc.' },
    { value: '1', label: 'Medical Emergency', description: 'Pandemics, mass casualties, medical crises' },
    { value: '2', label: 'Security Threat', description: 'Terrorism, civil unrest, security breaches' },
    { value: '3', label: 'Infrastructure Failure', description: 'Power outages, communication failures' },
    { value: '4', label: 'Environmental Hazard', description: 'Chemical spills, radiation, pollution' }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDeclareEmergency = async (e) => {
    e.preventDefault();
    if (!contract || !account) return;

    try {
      setLoading(true);
      
      // Parse initial responders
      const responders = formData.initialResponders
        .split(',')
        .map(addr => addr.trim())
        .filter(addr => addr.startsWith('0x') && addr.length === 42);

      const tx = await contract.declareEmergency(
        parseInt(formData.emergencyType),
        formData.location,
        formData.encryptedData,
        formData.dataHash,
        responders
      );
      
      await tx.wait();
      
      // Reset form
      setFormData({
        emergencyType: '0',
        location: '',
        encryptedData: '',
        dataHash: '',
        initialResponders: ''
      });
      
      alert('Emergency declared successfully! The crisis has been logged on the blockchain.');
    } catch (error) {
      console.error('Error declaring emergency:', error);
      alert('Failed to declare emergency. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  const selectedEmergency = emergencyTypes.find(type => type.value === formData.emergencyType);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🚨</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Declare Emergency</h2>
            <p className="text-gray-600 mt-1">
              Report a new crisis situation. This will create an immutable record on the blockchain.
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Form */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <form onSubmit={handleDeclareEmergency} className="space-y-8">
          {/* Emergency Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Emergency Type *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {emergencyTypes.map((type) => (
                <label
                  key={type.value}
                  className={`relative flex cursor-pointer rounded-xl border-2 p-4 focus:outline-none transition-all duration-200 ${
                    formData.emergencyType === type.value
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="emergencyType"
                    value={type.value}
                    checked={formData.emergencyType === type.value}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{type.label}</div>
                        <div className="text-gray-500 text-xs mt-1">{type.description}</div>
                      </div>
                    </div>
                    <div className={`shrink-0 text-white ${
                      formData.emergencyType === type.value ? 'text-red-600' : 'text-gray-400'
                    }`}>
                      {formData.emergencyType === type.value ? '●' : '○'}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
              placeholder="Enter precise location coordinates or address"
            />
          </div>

          {/* Encrypted Data */}
          <div>
            <label htmlFor="encryptedData" className="block text-sm font-medium text-gray-700 mb-2">
              Encrypted Emergency Data
            </label>
            <textarea
              id="encryptedData"
              name="encryptedData"
              value={formData.encryptedData}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
              placeholder="Enter encrypted emergency details, victim information, or sensitive data..."
            />
            <p className="text-sm text-gray-500 mt-1">
              This data will be stored encrypted on the blockchain for authorized access only.
            </p>
          </div>

          {/* Data Hash */}
          <div>
            <label htmlFor="dataHash" className="block text-sm font-medium text-gray-700 mb-2">
              Data Integrity Hash *
            </label>
            <input
              type="text"
              id="dataHash"
              name="dataHash"
              value={formData.dataHash}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 font-mono text-sm"
              placeholder="Enter SHA-256 hash of emergency data"
            />
            <p className="text-sm text-gray-500 mt-1">
              Cryptographic hash to ensure data integrity and prevent tampering.
            </p>
          </div>

          {/* Initial Responders */}
          <div>
            <label htmlFor="initialResponders" className="block text-sm font-medium text-gray-700 mb-2">
              Initial Responders (Optional)
            </label>
            <input
              type="text"
              id="initialResponders"
              name="initialResponders"
              value={formData.initialResponders}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200 font-mono text-sm"
              placeholder="0x742... , 0x893... , 0xabc... (comma separated wallet addresses)"
            />
            <p className="text-sm text-gray-500 mt-1">
              Wallet addresses of emergency responders who should have immediate access.
            </p>
          </div>

          {/* Summary Card */}
          {selectedEmergency && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h4 className="font-semibold text-red-800 mb-3">Emergency Declaration Summary</h4>
              <div className="space-y-2 text-sm text-red-700">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-medium">{selectedEmergency.label}</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="font-medium">{formData.location || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Encrypted Data:</span>
                  <span className="font-medium">{formData.encryptedData ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Initial Responders:</span>
                  <span className="font-medium">
                    {formData.initialResponders 
                      ? formData.initialResponders.split(',').filter(addr => addr.trim()).length 
                      : 0
                    } addresses
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-red-200">
                <p className="text-xs text-red-600">
                  ⚠️ This declaration will create an immutable record on the BlockDAG blockchain. 
                  Ensure all information is accurate before proceeding.
                </p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading || !formData.location || !formData.dataHash}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Declaring Emergency...</span>
                </>
              ) : (
                <>
                  <span>🚨</span>
                  <span>Declare Emergency</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmergencyDeclare;