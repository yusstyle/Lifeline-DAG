// src/components/home/FeaturesSection.jsx
import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      icon: '🆔',
      title: 'Digital Identity Registry',
      description: 'Secure blockchain-based identity verification for emergency responders and authorized personnel.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🚨',
      title: 'Crisis Declaration',
      description: 'Instant emergency declaration with encrypted data storage and multi-signature verification.',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: '🔐',
      title: 'Access Control',
      description: 'Granular permission system ensuring only authorized personnel access sensitive crisis data.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '📊',
      title: 'Real-time Dashboard',
      description: 'Live crisis monitoring with blockchain-verified data and coordination tools.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🔗',
      title: 'Blockchain Integrity',
      description: 'Immutable audit trail of all emergency responses and data access events.',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: '🌐',
      title: 'Multi-Agency Coordination',
      description: 'Seamless collaboration between different emergency response organizations.',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Crisis Management
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Features
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Built on BlockDAG blockchain technology for maximum security, transparency, and reliability in emergency situations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-2xl">{feature.icon}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  Blockchain Verified
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Emergency Response?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join the decentralized revolution in crisis management. Connect your wallet and start coordinating emergencies with blockchain security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-4 py-2">
                <span className="text-green-400">●</span>
                <span className="text-sm">Live on BlockDAG Testnet</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 rounded-lg px-4 py-2">
                <span className="text-yellow-400">●</span>
                <span className="text-sm">100% Decentralized</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;