import React from 'react'
import { Bot, ChevronDown } from 'lucide-react'

const Header = ({ 
  availableModels, 
  selectedModel, 
  showModelDropdown, 
  setShowModelDropdown, 
  setSelectedModel 
}) => {
  return (
    <div className="bg-slate-800 text-white p-6 border-b border-slate-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/gemini_logo.svg" alt="Mini AI Fiesta" className="w-8 h-8" />
          <div>
            <h1 className="text-xl font-semibold">AI Fiesta Mini</h1>
            <p className="text-slate-300 text-sm">AI Chat Interface</p>
          </div>
        </div>
        
        {/* Model Selector */}
        <div className="relative model-dropdown">
          <button
            onClick={() => setShowModelDropdown(!showModelDropdown)}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-md transition-colors border border-slate-600"
          >
            <Bot className="w-4 h-4" />
            <span className="text-sm font-medium">
              {availableModels.find(m => m.id === selectedModel)?.name || 'Select Model'}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showModelDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showModelDropdown && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
              <div className="p-2">
                {availableModels.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      setSelectedModel(model.id)
                      setShowModelDropdown(false)
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedModel === model.id
                        ? 'bg-primary-100 text-primary-800'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="font-medium">{model.name}</div>
                    <div className="text-xs opacity-70">{model.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
