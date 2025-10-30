// livelinedag/src/components/crisis/IdentityRegister.js
import React, { useState } from 'react';
import { useWeb3 } from '../../context/Web3Context';

const IdentityRegister = () => {
  const { contract, account } = useWeb3();
  const [formData, setFormData] = useState({
    did: '',
    sector: '0',
    metadataURI: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const sectors = [
    { value: '0', label: 'Healthcare' },
    { value: '1', label: 'Security' },
    { value: '2', label: 'Government' },
    { value: '3', label: 'NGO' },
    { value: '4', label: 'Volunteer' }
  ];

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!contract) {
      setMessage('Contract not connected');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const tx = await contract.registerIdentity(
        formData.did,
        parseInt(formData.sector),
        formData.metadataURI
      );
      
      await tx.wait();
      setMessage('✅ Identity registered successfully!');
      setFormData({ did: '', sector: '0', metadataURI: '' });
    } catch (error) {
      console.error('Registration error:', error);
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
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Register Identity</h2>
      
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Decentralized ID (DID)
          </label>
          <input
            type="text"
            name="did"
            value={formData.did}
            onChange={handleChange}
            placeholder="did:example:123456"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sector
          </label>
          <select
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sectors.map(sector => (
              <option key={sector.value} value={sector.value}>
                {sector.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Metadata URI
          </label>
          <input
            type="text"
            name="metadataURI"
            value={formData.metadataURI}
            onChange={handleChange}
            placeholder="ipfs://... or https://..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Registering...' : 'Register Identity'}
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

export default IdentityRegister;