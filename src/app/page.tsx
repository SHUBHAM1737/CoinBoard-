export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">CoinBoard</h1>
          <p className="text-gray-600">Farcaster Tipping Mini App</p>
        </div>
        
        <div className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-2xl font-bold">💰</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Send Tips with USDC</h2>
          <p className="text-gray-600 text-sm">
            Seamlessly tip your favorite creators on Farcaster with USDC on Base
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">How it works:</h3>
            <ol className="text-sm text-gray-600 text-left space-y-1">
              <li>1. Share your frame on Farcaster</li>
              <li>2. Users click to send tips</li>
              <li>3. USDC sent directly on-chain</li>
            </ol>
          </div>
          
          <div className="text-sm text-gray-500">
            Frame endpoint: <code className="bg-gray-100 px-2 py-1 rounded">/api/frame</code>
          </div>
        </div>
      </div>
    </div>
  );
}
