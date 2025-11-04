// src/components/home/TrustSection.jsx
import React from 'react';

const TrustSection = () => {
  const trustPoints = [
    {
      metric: '100%',
      label: 'Uptime Guarantee',
      description: 'Decentralized architecture ensures continuous availability',
      icon: '🔄'
    },
    {
      metric: 'Zero',
      label: 'Data Breaches',
      description: 'Blockchain encryption protects all sensitive information',
      icon: '🔒'
    },
    {
      metric: 'Instant',
      label: 'Crisis Alerts',
      description: 'Real-time notifications across the network',
      icon: '🚨'
    },
    {
      metric: '24/7',
      label: 'Global Access',
      description: 'Accessible from anywhere with internet connection',
      icon: '🌍'
    }
  ];

  const technologies = [
    { name: 'BlockDAG Blockchain', logo: '⛓️', description: 'High-throughput decentralized ledger' },
    { name: 'MetaMask Integration', logo: '🦊', description: 'Secure wallet connectivity' },
    { name: 'Smart Contracts', logo: '📄', description: 'Automated crisis management logic' },
    { name: 'IPFS Storage', logo: '🗄️', description: 'Distributed file storage' }
  ];

  return (
    <section id="trust" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Built on Trust & Technology
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our crisis management system leverages cutting-edge blockchain technology to ensure reliability and security when it matters most.
          </p>
        </div>

        {/* Trust Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustPoints.map((point, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-blue-400/50 transition-all duration-500 transform hover:-translate-y-2">
                <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {point.icon}
                </div>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                  {point.metric}
                </div>
                <div className="text-lg font-semibold text-white mb-2">
                  {point.label}
                </div>
                <div className="text-gray-300 text-sm">
                  {point.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Stack */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-center mb-8 text-white">
            Powered by Advanced Technology
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-6 border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300">
                  <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {tech.logo}
                  </div>
                  <h4 className="font-bold text-white mb-2">
                    {tech.name}
                  </h4>
                  <p className="text-gray-300 text-sm">
                    {tech.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Badges */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap justify-center gap-6 bg-black/30 rounded-2xl p-6 border border-white/10">
            <div className="flex items-center space-x-2">
              <span className="text-green-400 text-xl">✓</span>
              <span className="text-white">End-to-End Encryption</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400 text-xl">✓</span>
              <span className="text-white">Immutable Audit Trail</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400 text-xl">✓</span>
              <span className="text-white">Multi-Signature Verification</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-400 text-xl">✓</span>
              <span className="text-white">Zero Knowledge Proofs</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;