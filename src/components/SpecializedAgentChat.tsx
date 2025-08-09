'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/types';
import { AgentAction } from '@/types/agent';
import { NgamumuleAgent } from '@/lib/agent';
import { personalAssistantConfig, educationTutorConfig, agentPersonas } from '@/lib/specialized-agents';
import { 
  Send, 
  Bot, 
  User, 
  Calendar,
  CheckSquare,
  DollarSign,
  BookOpen,
  Calculator,
  GraduationCap,
  BarChart3,
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface SpecializedAgentChatProps {
  className?: string;
}

type AgentType = 'personal' | 'education';

export function SpecializedAgentChat({ className }: SpecializedAgentChatProps) {
  const [activeAgent, setActiveAgent] = useState<AgentType>('personal');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [actions, setActions] = useState<AgentAction[]>([]);
  const [showActions, setShowActions] = useState(true);
  
  const personalAgentRef = useRef<NgamumuleAgent | null>(null);
  const educationAgentRef = useRef<NgamumuleAgent | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    personalAgentRef.current = new NgamumuleAgent(personalAssistantConfig);
    educationAgentRef.current = new NgamumuleAgent(educationTutorConfig);
    
    // Set initial greeting
    setMessages([getInitialMessage('personal')]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, actions]);

  const getInitialMessage = (agentType: AgentType): ChatMessage => {
    const persona = agentType === 'personal' ? agentPersonas.personalAssistant : agentPersonas.educationTutor;
    return {
      id: '1',
      role: 'assistant',
      content: persona.greeting,
      timestamp: new Date(),
    };
  };

  const getCurrentAgent = () => {
    return activeAgent === 'personal' ? personalAgentRef.current : educationAgentRef.current;
  };

  const switchAgent = (agentType: AgentType) => {
    if (agentType === activeAgent) return;
    
    setActiveAgent(agentType);
    setMessages([getInitialMessage(agentType)]);
    setActions([]);
    setInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const agent = getCurrentAgent();
    if (!agent) return;

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
      const responses = await agent.processMessage(input);
      setMessages(prev => [...prev, ...responses]);
      setActions(agent.getActions());
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

  const getQuickActions = () => {
    if (activeAgent === 'personal') {
      return [
        { text: "Schedule a meeting for tomorrow", icon: Calendar },
        { text: "Add 'buy groceries' to my tasks", icon: CheckSquare },
        { text: "How much did I spend this month?", icon: DollarSign },
        { text: "Check my calendar for Friday", icon: Calendar }
      ];
    } else {
      return [
        { text: "Help me solve: 2x + 8 = 20", icon: Calculator },
        { text: "Create a study plan for calculus", icon: BookOpen },
        { text: "Test my Spanish vocabulary", icon: GraduationCap },
        { text: "Explain photosynthesis", icon: BookOpen }
      ];
    }
  };

  const getActionIcon = (actionType: string, toolName?: string) => {
    if (actionType === 'thought') return <MessageSquare className="w-3 h-3" />;
    if (actionType === 'response') return <Bot className="w-3 h-3" />;
    
    // Personal Assistant tool icons
    if (toolName === 'calendar_manager') return <Calendar className="w-3 h-3" />;
    if (toolName === 'task_manager') return <CheckSquare className="w-3 h-3" />;
    if (toolName === 'finance_tracker') return <DollarSign className="w-3 h-3" />;
    
    // Education tool icons
    if (toolName === 'math_tutor') return <Calculator className="w-3 h-3" />;
    if (toolName === 'study_planner') return <BookOpen className="w-3 h-3" />;
    if (toolName === 'knowledge_assessment') return <BarChart3 className="w-3 h-3" />;
    if (toolName === 'language_learning') return <GraduationCap className="w-3 h-3" />;
    
    return <Sparkles className="w-3 h-3" />;
  };

  const getActionColor = (actionType: string) => {
    switch (actionType) {
      case 'thought': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'tool_use': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'response': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className={cn('flex flex-col h-full', className)}>
      {/* Agent Switcher Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => switchAgent('personal')}
            className={cn(
              'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all',
              activeAgent === 'personal'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
            )}
          >
            <Calendar className="w-4 h-4" />
            <span className="font-medium">Personal Assistant</span>
          </button>
          
          <button
            onClick={() => switchAgent('education')}
            className={cn(
              'flex items-center space-x-2 px-4 py-2 rounded-lg transition-all',
              activeAgent === 'education'
                ? 'bg-purple-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200'
            )}
          >
            <GraduationCap className="w-4 h-4" />
            <span className="font-medium">Education Tutor</span>
          </button>
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
                <div className={cn(
                  'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                  activeAgent === 'personal' ? 'bg-blue-600' : 'bg-purple-600'
                )}>
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={cn(
                  'max-w-xs lg:max-w-md px-4 py-2 rounded-lg whitespace-pre-wrap',
                  message.role === 'user'
                    ? activeAgent === 'personal' 
                      ? 'bg-blue-600 text-white'
                      : 'bg-purple-600 text-white'
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
              <div className={cn(
                'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                activeAgent === 'personal' ? 'bg-blue-600' : 'bg-purple-600'
              )}>
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-gray-600">
                    {activeAgent === 'personal' ? 'Assistant' : 'Tutor'} is thinking...
                  </span>
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
            placeholder={
              activeAgent === 'personal' 
                ? "Ask me to manage tasks, schedule, finances..."
                : "Ask me to teach, solve problems, create study plans..."
            }
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={cn(
              'px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
              activeAgent === 'personal'
                ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500'
            )}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mt-2">
          {getQuickActions().map((action, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setInput(action.text)}
              className={cn(
                'flex items-center space-x-1 px-2 py-1 text-xs rounded border transition-colors',
                activeAgent === 'personal'
                  ? 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700'
                  : 'bg-purple-50 hover:bg-purple-100 border-purple-200 text-purple-700'
              )}
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
