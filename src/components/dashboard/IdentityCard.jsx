// src/components/dashboard/IdentityCard.jsx
import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../../context/Web3Context';
import { formatTimestamp, getSector } from '../../utils/blockchain';

const IdentityCard = () => {
  const { account, contract } = useWeb3();
  const [identity, setIdentity] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [formData, setFormData] = useState({
    did: '',
    sector: '0',
    metadataURI: ''
  });

  useEffect(() => {
    const fetchIdentity = async () => {
      if (contract && account) {
        try {
          setLoading(true);
          const identityData = await contract.identities(account);
          
          if (identityData && identityData.wallet !== '0x0000000000000000000000000000000000000000') {
            setIdentity(identityData);
          }
        } catch (error) {
          console.error('Error fetching identity:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchIdentity();
  }, [contract, account]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!contract) return;

    try {
      setRegisterLoading(true);
      const tx = await contract.registerIdentity(
        formData.did,
        parseInt(formData.sector),
        formData.metadataURI
      );
      
      await tx.wait();
      
      // Refresh identity data
      const identityData = await contract.identities(account);
      setIdentity(identityData);
      
      // Reset form
      setFormData({
        did: '',
        sector: '0',
        metadataURI: ''
      });
      
      alert('Identity registered successfully!');
    } catch (error) {
      console.error('Error registering identity:', error);
      alert('Failed to register identity. Please try again.');
    } finally {
      setRegisterLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
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
      {/* Current Identity Status */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Digital Identity</h2>
        
        {identity ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Wallet Address</label>
                  <div className="text-lg font-mono text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {identity.wallet}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">DID</label>
                  <div className="text-lg text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {identity.did}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Sector</label>
                  <div className="text-lg text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {getSector(Number(identity.sector))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Verification Status</label>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    identity.verified 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {identity.verified ? '✅ Verified' : '⏳ Pending Verification'}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Registration Date</label>
                  <div className="text-lg text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {formatTimestamp(identity.registrationDate)}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Last Verified</label>
                  <div className="text-lg text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {identity.lastVerified > 0 ? formatTimestamp(identity.lastVerified) : 'Never'}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Metadata</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {identity.metadataURI || 'No metadata provided'}
                </pre>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🆔</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Identity Found</h3>
            <p className="text-gray-600 mb-6">
              Register your digital identity to participate in crisis management and emergency response coordination.
            </p>
          </div>
        )}
      </div>

      {/* Registration Form */}
      {!identity && (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Register New Identity</h3>
          
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="did" className="block text-sm font-medium text-gray-700 mb-2">
                  Decentralized Identifier (DID)
                </label>
                <input
                  type="text"
                  id="did"
                  name="did"
                  value={formData.did}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="did:example:123456"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Your unique decentralized identifier
                </p>
              </div>
              
              <div>
                <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-2">
                  Response Sector
                </label>
                <select
                  id="sector"
                  name="sector"
                  value={formData.sector}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                >
                  <option value="0">Healthcare</option>
                  <option value="1">Law Enforcement</option>
                  <option value="2">Fire Department</option>
                  <option value="3">Government</option>
                  <option value="4">NGO</option>
                  <option value="5">Volunteer</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="metadataURI" className="block text-sm font-medium text-gray-700 mb-2">
                Metadata URI (Optional)
              </label>
              <input
                type="text"
                id="metadataURI"
                name="metadataURI"
                value={formData.metadataURI}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="https://example.com/metadata.json"
              />
              <p className="text-sm text-gray-500 mt-1">
                URI pointing to additional identity metadata
              </p>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={registerLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {registerLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Registering...</span>
                  </div>
                ) : (
                  'Register Identity'
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default IdentityCard;