import React from 'react'
import { Send, Loader2, Copy, Trash2 } from 'lucide-react'

const InputArea = ({ 
  inputMessage, 
  setInputMessage, 
  sendMessage, 
  handleKeyPress, 
  isLoading, 
  copyLastResponse, 
  copyAllAiMessages,
  clearChat 
}) => {
  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <div className="flex gap-3">
        <div className="flex-1">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message here..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          />
        </div>
        <button
          onClick={sendMessage}
          disabled={isLoading || !inputMessage.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          Send
        </button>
      </div>
      
      {/* Action Buttons */}
      <div className="flex gap-2 mt-3 justify-center">
        <button
          onClick={copyLastResponse}
          className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors border border-gray-200"
        >
          <Copy className="w-3 h-3" />
          Copy Last
        </button>
        <button
          onClick={copyAllAiMessages}
          className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors border border-gray-200"
        >
          <Copy className="w-3 h-3" />
          Copy All
        </button>
        <button
          onClick={clearChat}
          className="text-sm text-gray-600 hover:text-red-600 flex items-center gap-1 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors border border-gray-200"
        >
          <Trash2 className="w-3 h-3" />
          Clear
        </button>
      </div>
    </div>
  )
}

export default InputArea
