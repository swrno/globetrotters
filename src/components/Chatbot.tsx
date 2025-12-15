"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, User, CheckCircle } from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

import '../app/chatbot.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestions?: string[];
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const getTimestamp = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const sendMessage = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = { 
      role: 'user', 
      content: text,
      timestamp: getTimestamp()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: messages.map(m => ({ role: m.role, content: m.content })).concat({ role: 'user', content: userMessage.content }) }),
      });

      const data = await response.json();
      
      if (data.response) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.response,
          timestamp: getTimestamp(),
          suggestions: data.suggestions
        }]);

        if (data.bookingSuccess) {
          setShowSuccess(true);
        }
      } else {
         setMessages(prev => [...prev, { 
           role: 'assistant', 
           content: "Sorry, I encountered an error.",
           timestamp: getTimestamp()
         }]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Sorry, something went wrong.",
        timestamp: getTimestamp()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const renderContent = (content: string) => {
    const rawMarkup = marked.parse(content) as string;
    
    // 1. Wrap tables in a scrollable div
    let processedMarkup = rawMarkup
      .replace(/<table>/g, '<div class="overflow-x-auto my-2"><table>')
      .replace(/<\/table>/g, '</table></div>');

    // 2. Group consecutive images into a horizontal scroller
    
    // Step 1: Unwrap <p> tags that contain images. 
    // We'll be aggressive: if a P tag contains an image, we unwrap it. 
    processedMarkup = processedMarkup.replace(/<p>(\s*<img[^>]+>[\s\S]*?)<\/p>/gi, '$1');

    // Step 2: Iteratively merge images separated by <br>, commas, whitespace, or empty <p> tags
    // This regex looks for: <img ...> [separators] <img ...>
    // Separators can be: whitespace, <br>, comma, empty <p></p>
    const mergeRegex = /(<img[^>]+>)(?:\s*<br\s*\/?>|\s*,\s*|\s*<p>\s*<\/p>\s*|\s+)+(<img[^>]+>)/gi;
    
    // We loop a few times to ensure we catch chains of images like img1, img2, img3
    let previousMarkup = '';
    let loopCount = 0;
    while (processedMarkup !== previousMarkup && loopCount < 5) {
      previousMarkup = processedMarkup;
      processedMarkup = processedMarkup.replace(mergeRegex, '$1$2');
      loopCount++;
    }

    // Step 3: Group consecutive images (2 or more) into a scroller div
    processedMarkup = processedMarkup.replace(/((?:<img[^>]+>){2,})/gi, (match) => {
      return `<div class="image-scroller">${match}</div>`;
    });

    const sanitizedMarkup = DOMPurify.sanitize(processedMarkup, {
      ADD_TAGS: ['img', 'div'],
      ADD_ATTR: ['src', 'alt', 'title', 'width', 'height', 'style', 'class'],
    });
    return { __html: sanitizedMarkup };
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-gray-50 rounded-lg shadow-2xl w-80 sm:w-[600px] h-[500px] sm:h-[600px] flex flex-col mb-4 overflow-hidden border border-gray-200 transition-all duration-300 ease-in-out relative">
          
          {/* Success Overlay */}
          {showSuccess && (
            <div className="booking-success-overlay">
              <CheckCircle className="success-icon" />
              <div className="success-text">Booking Confirmed!</div>
            </div>
          )}

          {/* Header */}
          <div className="bg-[#1a1f2e] p-4 flex justify-between items-center text-white rounded-t-lg">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-semibold text-base text-white">Globetrotters Assistant</h3>
              </div>
            </div>
            <button onClick={toggleChat} className="hover:bg-white/10 p-1 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-white">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-20">
                <div className="bg-[#1a1f2e] w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Bot size={24} className="text-white" />
                </div>
                <p>Good day. How may I assist you with your inquiry?</p>
              </div>
            )}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className="flex-shrink-0 mt-1">
                  {msg.role === 'assistant' ? (
                    <div className="bg-[#1a1f2e] p-2 rounded-lg">
                      <Bot size={16} className="text-white" />
                    </div>
                  ) : (
                    <div className="bg-[#1a1f2e] p-2 rounded-lg">
                      <User size={16} className="text-white" />
                    </div>
                  )}
                </div>

                {/* Message Bubble */}
                <div className="flex flex-col max-w-[80%]">
                  <div
                    className={`p-3 text-sm border ${
                      msg.role === 'user'
                        ? 'bg-[#1a1f2e] border-[#1a1f2e] text-white rounded-2xl rounded-tr-none'
                        : 'bg-white border-gray-200 text-gray-800 rounded-sm shadow-sm'
                    }`}
                  >
                    <div 
                      className="chatbot-content"
                      dangerouslySetInnerHTML={renderContent(msg.content)} 
                    />
                  </div>
                  
                  {/* Suggestions */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-2 flex flex-wrap">
                      {msg.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="suggestion-btn"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className={`text-[10px] text-gray-400 mt-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="bg-[#1a1f2e] p-2 rounded-lg h-fit">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-white border border-gray-200 p-3 rounded-sm shadow-sm">
                  <Loader2 className="animate-spin text-gray-400" size={16} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter your message..."
                className="flex-1 border border-gray-300 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-[#1a1f2e] transition-all placeholder-gray-400 font-mono"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
                className="bg-[#1a1f2e] hover:bg-[#2a3142] text-white px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <Send size={16} />
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={toggleChat}
        className={`${
          isOpen ? 'scale-0' : 'scale-100'
        } bg-[#1a1f2e] hover:bg-[#2a3142] text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center`}
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
}
