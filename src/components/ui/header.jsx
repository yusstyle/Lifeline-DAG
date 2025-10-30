// livelinedag/src/components/ui/Header.js
import React from 'react';
import { useWeb3 } from '../../context/Web3Context';

const Header = () => {
  const { account, isConnected, connectWallet, isLoading } = useWeb3();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">LifelineDAG</h1>
        <div>
          {!isConnected ? (
            <button
              onClick={connectWallet}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              {isLoading ? 'Connecting...' : 'Connect Wallet'}
            </button>
          ) : (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
              Connected: {account.substring(0, 6)}...{account.substring(account.length - 4)}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;