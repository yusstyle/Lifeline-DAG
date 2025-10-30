// livelinedag/src/components/LandingPage.jsx
import React from 'react';
import { useWeb3 } from '../context/Web3Context';

const LandingPage = () => {
  const { connectWallet, isLoading } = useWeb3();

  const features = [
    {
      icon: "🚨",
      title: "Emergency Declaration",
      description: "Quickly declare emergencies with encrypted data and location tracking"
    },
    {
      icon: "🔐",
      title: "Secure Access Control",
      description: "Break-glass emergency access with multi-signature verification"
    },
    {
      icon: "👥",
      title: "Verified Responders",
      description: "Identity verification for healthcare, security, and government sectors"
    },
    {
      icon: "📊",
      title: "Real-time Dashboard",
      description: "Monitor crises with live updates and verification status"
    }
  ];

  const sectors = [
    { name: "Healthcare", color: "bg-red-100 text-red-800" },
    { name: "Security", color: "bg-blue-100 text-blue-800" },
    { name: "Government", color: "bg-green-100 text-green-800" },
    { name: "NGO", color: "bg-purple-100 text-purple-800" },
    { name: "Volunteer", color: "bg-orange-100 text-orange-800" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
            🚑
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Lifeline<span className="text-red-600">DAG</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Decentralized Emergency Response Platform
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto">
            A blockchain-powered crisis management system that enables secure, verifiable 
            emergency response coordination with break-glass access controls.
          </p>
          
          <button
            onClick={connectWallet}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Connecting...
              </span>
            ) : (
              "🚀 Launch LifelineDAG"
            )}
          </button>

          <div className="mt-8 text-sm text-gray-500">
            Connect your wallet to access emergency response features
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why LifelineDAG?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Register Identity</h3>
                <p className="text-gray-600">
                  Verified organizations and responders register with decentralized identities (DIDs) 
                  and sector-specific credentials.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Declare Emergency</h3>
                <p className="text-gray-600">
                  Authorized users declare emergencies with encrypted data, location information, 
                  and assign initial responders.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Multi-Signature Verification</h3>
                <p className="text-gray-600">
                  Crises require verification from multiple trusted parties to ensure legitimacy 
                  and prevent false alarms.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Emergency Access</h3>
                <p className="text-gray-600">
                  Break-glass protocols allow immediate access to critical data during genuine 
                  emergencies with proper audit trails.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Sectors */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Trusted by Emergency Sectors
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            LifelineDAG serves verified organizations across critical response sectors
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {sectors.map((sector, index) => (
              <span
                key={index}
                className={`px-4 py-2 rounded-full font-medium ${sector.color}`}
              >
                {sector.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Save Lives?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join the decentralized emergency response network and be prepared for when seconds matter.
          </p>
          <button
            onClick={connectWallet}
            disabled={isLoading}
            className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
          >
            {isLoading ? "Connecting..." : "🚀 Get Started Now"}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-red-500 rounded-full"></div>
            <span className="text-xl font-bold">LifelineDAG</span>
          </div>
          <p className="text-gray-400 mb-4">
            Decentralized Emergency Response Platform
          </p>
          <p className="text-gray-500 text-sm">
            Built with ❤️ for safer communities
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;