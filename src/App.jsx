// src/App.jsx
import React, { useState } from 'react'

function App() {
  const [isConnected, setIsConnected] = useState(false)

  const connectWallet = () => {
    setIsConnected(true)
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
            🚑
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Lifeline<span className="text-red-600">DAG</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Decentralized Emergency Response Platform
          </p>
          <button
            onClick={connectWallet}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold"
          >
            🚀 Launch LifelineDAG
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">LifelineDAG</h1>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
            Connected
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h2>
          <p>Welcome to LifelineDAG! Your emergency response platform is ready.</p>
        </div>
      </main>
    </div>
  )
}

export default App