// src/hooks/useContract.js
import { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';

export const useContract = () => {
  const { contract, account } = useWeb3();
  const [userIdentity, setUserIdentity] = useState(null);
  const [crises, setCrises] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch user identity
  useEffect(() => {
    const fetchIdentity = async () => {
      if (contract && account) {
        try {
          const identity = await contract.identities(account);
          if (identity && identity.wallet !== '0x0000000000000000000000000000000000000000') {
            setUserIdentity(identity);
          } else {
            setUserIdentity(null);
          }
        } catch (error) {
          console.error('Error fetching identity:', error);
        }
      }
    };

    fetchIdentity();
  }, [contract, account]);

  // Fetch all crises
  const fetchCrises = async () => {
    if (!contract) return;

    try {
      setLoading(true);
      const crisisCount = await contract.crisisCount();
      const count = Number(crisisCount);
      
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
            verificationCount: Number(crisis.verificationCount)
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

  // Register identity
  const registerIdentity = async (did, sector, metadataURI) => {
    if (!contract) throw new Error('Contract not connected');

    const tx = await contract.registerIdentity(did, sector, metadataURI);
    const receipt = await tx.wait();
    
    // Refresh identity
    const identity = await contract.identities(account);
    setUserIdentity(identity);
    
    return receipt;
  };

  // Declare emergency
  const declareEmergency = async (emergencyType, location, encryptedData, dataHash, initialResponders) => {
    if (!contract) throw new Error('Contract not connected');

    const tx = await contract.declareEmergency(
      emergencyType,
      location,
      encryptedData,
      dataHash,
      initialResponders
    );
    const receipt = await tx.wait();
    
    // Refresh crises
    await fetchCrises();
    
    return receipt;
  };

  // Verify crisis
  const verifyCrisis = async (crisisId, signatures) => {
    if (!contract) throw new Error('Contract not connected');

    const tx = await contract.verifyCrisis(crisisId, signatures);
    const receipt = await tx.wait();
    
    // Refresh crises
    await fetchCrises();
    
    return receipt;
  };

  return {
    userIdentity,
    crises,
    loading,
    fetchCrises,
    registerIdentity,
    declareEmergency,
    verifyCrisis
  };
};