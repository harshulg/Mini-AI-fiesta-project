import React from 'react'
import { User, Bot, Loader2, Copy, Check } from 'lucide-react'

const MessageList = ({ 
  messages, 
  isLoading, 
  availableModels, 
  copiedMessages, 
  copyMessage, 
  messagesEndRef 
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`flex items-start gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.sender === 'user' 
                ? 'bg-blue-500 text-white' 
                : message.isError 
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-600'
            }`}>
              {message.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg break-words relative group ${
              message.sender === 'user' 
                ? 'bg-blue-600 text-white ml-auto' 
                : message.isError 
                  ? 'bg-red-50 border border-red-200 text-red-800 mr-auto'
                  : 'bg-gray-100 border border-gray-200 text-gray-800 mr-auto'
            }`}>
              <p className="text-sm leading-relaxed pr-8">{message.text}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </p>
                <div className="flex items-center gap-2">
                  {message.model && (
                    <p className="text-xs opacity-50 bg-white/20 px-2 py-0.5 rounded">
                      {availableModels.find(m => m.id === message.model)?.name || message.model}
                    </p>
                  )}
                  {message.sender === 'ai' && (
                    <button
                      onClick={() => copyMessage(message.id, message.text)}
                      className={`opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/20 ${
                        copiedMessages.has(message.id) ? 'opacity-100 text-green-600' : 'text-gray-500'
                      }`}
                      title="Copy message"
                    >
                      {copiedMessages.has(message.id) ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="flex justify-start">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg break-words bg-gray-100 border border-gray-200 text-gray-800 mr-auto">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">AI is thinking...</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList
