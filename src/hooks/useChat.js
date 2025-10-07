import { useState, useEffect, useRef } from 'react'

export const useChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: " Hello! I'm your AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [serverStatus, setServerStatus] = useState('checking')
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash')
  const [showModelDropdown, setShowModelDropdown] = useState(false)
  const [copiedMessages, setCopiedMessages] = useState(new Set())
  const [availableModels, setAvailableModels] = useState([
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', description: 'Fast and versatile' },
    { id: 'moonshotai/Kimi-K2-Instruct-0905:groq', name: 'Kimi K2 Instruct', description: 'Hugging Face model' }
  ])
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    checkServerStatus()
    fetchAvailableModels()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showModelDropdown && !event.target.closest('.model-dropdown')) {
        setShowModelDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showModelDropdown])

  const fetchAvailableModels = async () => {
    try {
      const response = await fetch('/api/models')
      const data = await response.json()
      if (data.success) {
        setAvailableModels(data.models)
      }
    } catch (error) {
      console.error('Error fetching models:', error)
    }
  }

  const checkServerStatus = async () => {
    try {
      const response = await fetch('/api/health')
      const data = await response.json()
      setServerStatus(data.status === 'OK' ? 'connected' : 'error')
    } catch (error) {
      setServerStatus('disconnected')
    }
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: inputMessage,
          model: selectedModel
        })
      })

      const data = await response.json()

      if (data.success) {
        const aiMessage = {
          id: Date.now() + 1,
          text: data.response,
          sender: 'ai',
          timestamp: new Date(),
          model: data.model
        }
        setMessages(prev => [...prev, aiMessage])
        setServerStatus('connected')
      } else {
        throw new Error(data.error || 'Unknown error occurred')
      }
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error while processing your request. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
        isError: true
      }
      setMessages(prev => [...prev, errorMessage])
      setServerStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const copyMessage = async (messageId, messageText) => {
    try {
      await navigator.clipboard.writeText(messageText)
      setCopiedMessages(prev => new Set([...prev, messageId]))
      
      // Remove the copied state after 2 seconds
      setTimeout(() => {
        setCopiedMessages(prev => {
          const newSet = new Set(prev)
          newSet.delete(messageId)
          return newSet
        })
      }, 2000)
    } catch (error) {
      console.error('Failed to copy message:', error)
    }
  }

  const copyLastResponse = () => {
    const lastAiMessage = messages.filter(m => m.sender === 'ai').pop()
    if (lastAiMessage) {
      navigator.clipboard.writeText(lastAiMessage.text)
    }
  }

  const copyAllAiMessages = () => {
    const allAiMessages = messages.filter(m => m.sender === 'ai')
    const allText = allAiMessages.map(m => m.text).join('\n\n')
    navigator.clipboard.writeText(allText)
  }

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: " Hello! I'm your AI assistant. How can I help you today?",
        sender: 'ai',
        timestamp: new Date()
      }
    ])
  }

  return {
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
  }
}
