// src/components/home/HowItWorks.jsx
import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      title: 'Connect Wallet',
      description: 'Connect your MetaMask wallet to the BlockDAG testnet network to access the crisis management system.',
      icon: '🔗',
      color: 'border-blue-500 bg-blue-50'
    },
    {
      step: 2,
      title: 'Register Identity',
      description: 'Create your digital identity on the blockchain with verified credentials for emergency response.',
      icon: '🆔',
      color: 'border-green-500 bg-green-50'
    },
    {
      step: 3,
      title: 'Monitor Crises',
      description: 'Access real-time crisis dashboard with live updates and verified emergency declarations.',
      icon: '📊',
      color: 'border-purple-500 bg-purple-50'
    },
    {
      step: 4,
      title: 'Coordinate Response',
      description: 'Collaborate with other responders using secure, blockchain-verified communication channels.',
      icon: '🤝',
      color: 'border-orange-500 bg-orange-50'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              In 4 Simple Steps
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our blockchain-powered crisis management system makes emergency response coordination simple and secure.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className={`relative bg-white rounded-2xl p-8 border-2 ${step.color} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group`}>
                  {/* Step number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {step.step}
                  </div>
                  
                  {/* Icon */}
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200">
            <h4 className="font-bold text-blue-900 mb-3 flex items-center">
              <span className="text-blue-600 mr-2">⚡</span>
              Instant Deployment
            </h4>
            <p className="text-blue-800 text-sm">
              No complex setup required. Connect your wallet and start managing crises immediately.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-6 border border-purple-200">
            <h4 className="font-bold text-purple-900 mb-3 flex items-center">
              <span className="text-purple-600 mr-2">🛡️</span>
              Military-Grade Security
            </h4>
            <p className="text-purple-800 text-sm">
              All data is encrypted and stored on the immutable BlockDAG blockchain.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;