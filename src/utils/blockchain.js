// src/utils/blockchain.js
import { ethers } from 'ethers';

// Format address for display
export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Format timestamp to readable date
export const formatTimestamp = (timestamp) => {
  if (!timestamp) return 'N/A';
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleString();
};

// Emergency type mapping
export const EMERGENCY_TYPES = {
  0: 'Natural Disaster',
  1: 'Medical Emergency', 
  2: 'Security Threat',
  3: 'Infrastructure Failure',
  4: 'Environmental Hazard'
};

// Sector mapping
export const SECTORS = {
  0: 'Healthcare',
  1: 'Law Enforcement',
  2: 'Fire Department',
  3: 'Government',
  4: 'NGO',
  5: 'Volunteer'
};

// Check if transaction was successful
export const isTransactionSuccess = (receipt) => {
  return receipt && receipt.status === 1;
};

// Convert BigNumber to number
export const parseBigNumber = (bigNumber) => {
  if (!bigNumber) return 0;
  return Number(ethers.formatUnits(bigNumber, 0));
};

// Get readable emergency type
export const getEmergencyType = (typeId) => {
  return EMERGENCY_TYPES[typeId] || 'Unknown Emergency';
};

// Get readable sector
export const getSector = (sectorId) => {
  return SECTORS[sectorId] || 'Unknown Sector';
};