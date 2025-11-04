// src/components/home/HomePage.jsx
import React from 'react';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import HowItWorks from './HowItWorks';
import TrustSection from './TrustSection';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <TrustSection />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Lifeline Crisis System
              </h3>
              <p className="text-gray-400 mt-2">
                Blockchain-powered emergency response coordination
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">
                How It Works
              </a>
              <a href="#trust" className="text-gray-400 hover:text-white transition-colors">
                Technology
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400">
              Built on BlockDAG Testnet • Secure • Decentralized • Open Source
            </p>
            <p className="text-gray-500 text-sm mt-2">
              © 2024 Lifeline Crisis System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;