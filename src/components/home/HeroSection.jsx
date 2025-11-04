// src/components/home/HeroSection.jsx
import React from 'react';
import { useWeb3 } from '../../context/Web3Context';

const HeroSection = () => {
  const { account, isConnected, isBlockDAG, loading, connectWallet } = useWeb3();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center">
          {/* Main heading with animation */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            Lifeline
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Crisis System
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            Blockchain-powered emergency response coordination. 
            <span className="block text-blue-300 font-semibold mt-2">
              Secure • Transparent • Immediate
            </span>
          </p>

          {/* Connection status */}
          <div className="mb-8 animate-fade-in-up delay-400">
            {!isConnected ? (
              <div className="space-y-4">
                <button
                  onClick={connectWallet}
                  disabled={loading}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <span className="mr-3">🔗</span>
                      Connect MetaMask to BlockDAG
                      <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </>
                  )}
                </button>
                <p className="text-blue-300 text-sm">
                  Powered by BlockDAG Testnet • Secure & Decentralized
                </p>
              </div>
            ) : (
              <div className="inline-flex flex-col items-center space-y-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-fade-in">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${isBlockDAG ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></div>
                  <span className="text-white font-semibold">
                    {isBlockDAG ? 'Connected to BlockDAG' : 'Wrong Network'}
                  </span>
                </div>
                <div className="text-blue-200 font-mono text-sm bg-black/30 px-3 py-2 rounded-lg">
                  {account.slice(0, 8)}...{account.slice(-6)}
                </div>
                <p className="text-green-300 text-sm font-medium">
                  ✅ Ready to access crisis management dashboard
                </p>
              </div>
            )}
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in-up delay-600">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-blue-400/50 transition-all duration-300">
              <div className="text-2xl font-bold text-blue-400 mb-1">🚨</div>
              <div className="text-white font-semibold">Real-time Alerts</div>
              <div className="text-blue-300 text-sm">Instant emergency notifications</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-purple-400/50 transition-all duration-300">
              <div className="text-2xl font-bold text-purple-400 mb-1">🔒</div>
              <div className="text-white font-semibold">Blockchain Secured</div>
              <div className="text-purple-300 text-sm">Immutable crisis records</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-indigo-400/50 transition-all duration-300">
              <div className="text-2xl font-bold text-indigo-400 mb-1">🌐</div>
              <div className="text-white font-semibold">Decentralized</div>
              <div className="text-indigo-300 text-sm">No single point of failure</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;