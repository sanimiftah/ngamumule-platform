'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types';
import { AgentAction } from '@/types/agent';
import { NgamumuleAgent } from '@/lib/agent';
import { Send, Bot, User, Cpu, Search, Calculator, Cloud, Code, FileText, Zap } from 'lucide-react';

interface AgentChatInterfaceProps {
  className?: string;
}

export function AgentChatInterface({ className }: AgentChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: '🤖 Hello! I\'m Ngamumule Agent, an intelligent AI that can use tools to help you. I can:\n\n• 🔍 Search the web\n• 🧮 Perform calculations\n• 🌤️ Check weather\n• 💻 Execute code\n• 📁 Handle files\n\nTry asking me to "calculate 15 * 23" or "search for latest AI news"!',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [actions, setActions] = useState<AgentAction[]>([]);
  const [showActions, setShowActions] = useState(true);
  
  const agentRef = useRef<NgamumuleAgent | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    agentRef.current = new NgamumuleAgent();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, actions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !agentRef.current) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responses = await agentRef.current.processMessage(input);
      setMessages(prev => [...prev, ...responses]);
      setActions(agentRef.current.getActions());
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I encountered an error while processing your request. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getActionIcon = (actionType: string, toolName?: string) => {
    if (actionType === 'thought') return <Cpu className="w-3 h-3" />;
    if (actionType === 'response') return <Bot className="w-3 h-3" />;
    
    switch (toolName) {
      case 'web_search': return <Search className="w-3 h-3" />;
      case 'calculator': return <Calculator className="w-3 h-3" />;
      case 'get_weather': return <Cloud className="w-3 h-3" />;
      case 'execute_code': return <Code className="w-3 h-3" />;
      case 'file_operations': return <FileText className="w-3 h-3" />;
      default: return <Zap className="w-3 h-3" />;
    }
  };

  const getActionColor = (actionType: string) => {
    switch (actionType) {
      case 'thought': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'tool_use': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'response': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Header with Actions Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-blue-600" />
          <h3 className="font-medium text-gray-900">Ngamumule Agent</h3>
          {isLoading && <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>}
        </div>
        <button
          onClick={() => setShowActions(!showActions)}
          className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          {showActions ? 'Hide Actions' : 'Show Actions'}
        </button>
      </div>

      <div className="flex-1 flex">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-start space-x-3',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={cn(
                  'max-w-xs lg:max-w-md px-4 py-2 rounded-lg whitespace-pre-wrap',
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                )}
              >
                {message.content}
              </div>
              {message.role === 'user' && (
                <div className="flex-shrink-0 w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-gray-600">Agent is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Actions Panel */}
        {showActions && (
          <div className="w-80 border-l border-gray-200 bg-gray-50 overflow-y-auto">
            <div className="p-4">
              <h4 className="font-medium text-gray-900 mb-3">Agent Actions</h4>
              <div className="space-y-2">
                {actions.slice(-10).map((action, index) => (
                  <div
                    key={index}
                    className={cn(
                      'p-2 rounded border text-xs',
                      getActionColor(action.type)
                    )}
                  >
                    <div className="flex items-center space-x-1 mb-1">
                      {getActionIcon(action.type, action.tool)}
                      <span className="font-medium capitalize">
                        {action.type.replace('_', ' ')}
                        {action.tool && ` (${action.tool})`}
                      </span>
                    </div>
                    <div className="text-xs opacity-75">
                      {action.content}
                    </div>
                    {action.toolOutput && (
                      <div className="mt-1 text-xs opacity-60">
                        Output: {action.toolOutput.substring(0, 100)}...
                      </div>
                    )}
                  </div>
                ))}
                {actions.length === 0 && (
                  <div className="text-xs text-gray-500 text-center py-4">
                    No actions yet. Send a message to see the agent in action!
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 bg-white">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me to calculate, search, check weather, run code..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-2">
          {[
            { text: "Calculate 15 * 23", icon: Calculator },
            { text: "Weather in Tokyo", icon: Cloud },
            { text: "Search for AI news", icon: Search },
            { text: "Execute: console.log('Hello')", icon: Code }
          ].map((action, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setInput(action.text)}
              className="flex items-center space-x-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border text-gray-700 transition-colors"
            >
              <action.icon className="w-3 h-3" />
              <span>{action.text}</span>
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
