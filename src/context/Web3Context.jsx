// src/context/Web3Context.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { ethers } from 'ethers';

const Web3Context = createContext();

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [currentChain, setCurrentChain] = useState(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        setLoading(true);
        
        // Request account access
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        
        setAccount(accounts[0]);
        setIsConnected(true);
        
        // Get current network info
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        setCurrentChain(chainId);
        
        console.log('Connected to network:', chainId);
        
        // Set mock contract for demo
        setContract({ 
          mock: true,
          crisisCount: () => Promise.resolve(ethers.toBigInt(0)),
          identities: () => Promise.resolve(null)
        });
        
      } catch (error) {
        console.error('Error connecting wallet:', error);
        alert('Failed to connect wallet. Please make sure MetaMask is installed and unlocked.');
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please install MetaMask to use this application!');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setContract(null);
    setIsConnected(false);
    setCurrentChain(null);
  };

  // Listen for account and chain changes
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAccount(accounts[0]);
        }
      };

      const handleChainChanged = (chainId) => {
        console.log('Chain changed to:', chainId);
        setCurrentChain(chainId);
        // No reload needed - just update the chain
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  // Check initial connection
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({
            method: 'eth_accounts'
          });
          
          if (accounts.length > 0) {
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            setAccount(accounts[0]);
            setIsConnected(true);
            setCurrentChain(chainId);
            setContract({ 
              mock: true,
              crisisCount: () => Promise.resolve(ethers.toBigInt(0)),
              identities: () => Promise.resolve(null)
            });
          }
        } catch (error) {
          console.error('Error checking connection:', error);
        }
      }
    };

    checkConnection();
  }, []);

  const value = {
    account,
    contract,
    isConnected,
    currentChain, // Now returns the actual chain ID instead of boolean
    loading,
    connectWallet,
    disconnectWallet
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};