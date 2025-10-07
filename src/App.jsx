import React from 'react'
import { useChat } from './hooks/useChat'
import Header from './components/Header'
import StatusBar from './components/StatusBar'
import MessageList from './components/MessageList'
import InputArea from './components/InputArea'

function App() {
  const {
    // State
    messages,
    inputMessage,
    isLoading,
    serverStatus,
    selectedModel,
    showModelDropdown,
    copiedMessages,
    availableModels,
    messagesEndRef,
    
    // Setters
    setInputMessage,
    setSelectedModel,
    setShowModelDropdown,
    
    // Functions
    sendMessage,
    handleKeyPress,
    copyMessage,
    copyLastResponse,
    copyAllAiMessages,
    clearChat
  } = useChat()

  return (
    <div className="min-h-screen bg-gray-600 flex items-center justify-center">
      <div className="w-full max-w-none bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden flex flex-col h-[100vh] ">
        
        <Header className="fixed top-0 left-0 w-full z-50 bg-white shadow"
          availableModels={availableModels}
          selectedModel={selectedModel}
          showModelDropdown={showModelDropdown}
          setShowModelDropdown={setShowModelDropdown}
          setSelectedModel={setSelectedModel}
        />

        <StatusBar
          serverStatus={serverStatus}
          selectedModel={selectedModel}
          availableModels={availableModels}
        />

        <MessageList
          messages={messages}
          isLoading={isLoading}
          availableModels={availableModels}
          copiedMessages={copiedMessages}
          copyMessage={copyMessage}
          messagesEndRef={messagesEndRef}
        />

        <InputArea
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          sendMessage={sendMessage}
          handleKeyPress={handleKeyPress}
          isLoading={isLoading}
          copyLastResponse={copyLastResponse}
          copyAllAiMessages={copyAllAiMessages}
          clearChat={clearChat}
        />
        
      </div>
    </div>
  )
}

export default App