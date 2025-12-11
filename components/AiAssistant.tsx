import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Cpu, Loader2, AlertTriangle } from 'lucide-react';
import { ChatMessage } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'model',
      text: "你好！我是你的系統架構助手。目前 AI 模組正在進行依賴庫維護，暫時無法連接到 Google Gemini。",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    // Simulated Response for Maintenance Mode
    setTimeout(() => {
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "⚠️ **System Alert**: AI Service is currently offline for dependency updates (npm build fix). Please check the Dashboard for real-time system status.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, modelMsg]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl z-50 flex items-center justify-center transition-colors ${isOpen ? 'bg-slate-700 text-slate-400' : 'bg-gradient-to-r from-orange-600 to-red-600 text-white'}`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-[380px] h-[550px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-orange-500/20 p-1.5 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-sm">System Architect AI</h3>
                  <p className="text-xs text-orange-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse"></span>
                    Maintenance Mode
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin bg-slate-900/95">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                    }`}
                  >
                    {msg.text.split('\n').map((line, i) => (
                      <p key={i} className={i > 0 ? "mt-1" : ""}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 rounded-2xl rounded-bl-none px-4 py-3 border border-slate-700">
                    <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-slate-950 border-t border-slate-800">
              <div className="flex items-center gap-2 bg-slate-900 rounded-full border border-slate-700 px-4 py-2 focus-within:border-orange-500 transition-colors">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="AI is under maintenance..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !inputText.trim()}
                  className="p-1.5 rounded-full bg-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-500 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiAssistant;