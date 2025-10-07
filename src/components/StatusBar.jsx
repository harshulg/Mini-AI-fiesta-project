import React from 'react'
import { Wifi, WifiOff } from 'lucide-react'

const StatusBar = ({ serverStatus, selectedModel, availableModels }) => {
  return (
    <div className={`px-4 py-2 text-center text-sm font-medium border-b ${
      serverStatus === 'connected' ? 'bg-green-50 text-green-700 border-green-200' :
      serverStatus === 'error' ? 'bg-red-50 text-red-700 border-red-200' :
      'bg-yellow-50 text-yellow-700 border-yellow-200'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {serverStatus === 'connected' ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
          {serverStatus === 'connected' ? 'Connected to AI Server' :
           serverStatus === 'error' ? 'Server Error' :
           'Checking connection...'}
        </div>
        <div className="text-xs opacity-70">
          Model: {availableModels.find(m => m.id === selectedModel)?.name}
        </div>
      </div>
    </div>
  )
}

export default StatusBar
