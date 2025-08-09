'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, BookOpen, Globe, MessageCircle, Target, Trophy, Clock } from 'lucide-react';
import { languageLearningTutorConfig, languageLearningQuickActions, languageLearningPrompts } from '@/lib/language-learning-config';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: Array<{
    type: 'thought' | 'tool_use' | 'response';
    content: string;
    tool?: string;
    toolInput?: Record<string, unknown>;
    toolOutput?: string;
  }>;
}

interface LearningSession {
  language: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  wordsLearned: number;
  sessionsCompleted: number;
  streak: number;
}

export function LanguageLearningChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('spanish');
  const [learningLevel, setLearningLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [showActions, setShowActions] = useState(false);
  const [session, setSession] = useState<LearningSession>({
    language: 'spanish',
    level: 'beginner',
    wordsLearned: 47,
    sessionsCompleted: 8,
    streak: 5
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const languages = [
    { code: 'spanish', name: 'Spanish', flag: '🇪🇸', category: 'major' },
    { code: 'french', name: 'French', flag: '🇫🇷', category: 'major' },
    { code: 'german', name: 'German', flag: '🇩🇪', category: 'major' },
    { code: 'italian', name: 'Italian', flag: '🇮🇹', category: 'major' },
    { code: 'portuguese', name: 'Portuguese', flag: '🇵🇹', category: 'major' },
    { code: 'chinese', name: 'Chinese', flag: '🇨🇳', category: 'major' },
    { code: 'japanese', name: 'Japanese', flag: '🇯🇵', category: 'major' },
    { code: 'korean', name: 'Korean', flag: '🇰🇷', category: 'major' },
    { code: 'indonesian', name: 'Indonesian (Bahasa)', flag: '🇮🇩', category: 'indonesian' },
    { code: 'sundanese', name: 'Sundanese (Basa Sunda)', flag: '🏔️', category: 'indonesian' },
    { code: 'javanese', name: 'Javanese (Basa Jawa)', flag: '🏛️', category: 'indonesian' },
    { code: 'balinese', name: 'Balinese (Basa Bali)', flag: '🏝️', category: 'indonesian' },
    { code: 'minangkabau', name: 'Minangkabau', flag: '🏕️', category: 'indonesian' },
    { code: 'batak', name: 'Batak', flag: '🌋', category: 'indonesian' },
    { code: 'betawi', name: 'Betawi', flag: '🏙️', category: 'indonesian' }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Welcome message when component mounts
    const currentLang = languages.find(l => l.code === selectedLanguage);
    const isIndonesian = currentLang?.category === 'indonesian';
    
    const welcomeMessage: Message = {
      id: '1',
      role: 'assistant',
      content: `${isIndonesian ? '🇮🇩 Selamat datang! Welcome to your Indonesian Language Tutor!' : '¡Hola! Welcome to your personal Language Learning Tutor!'} 🌟\n\nI'm here to help you master ${currentLang?.name || 'your chosen language'} through:\n\n📚 **Interactive Vocabulary Building**\n💬 **Real Conversation Practice**\n📖 **Grammar Coaching**\n🎵 **Pronunciation Guidance**\n🌍 **Cultural Insights**${isIndonesian ? '\n🏛️ **Traditional Indonesian Heritage**' : ''}\n\n${isIndonesian ? 
        `🌟 **Special Features for Indonesian Languages:**\n• Traditional cultural context and etiquette\n• Regional expressions and dialects\n• Cultural ceremonies and customs\n• Traditional storytelling and proverbs\n\n` : 
        ''
      }What would you like to focus on today? You can:\n• Choose a quick action below\n• Tell me your learning goals\n• Ask for a specific lesson\n• Practice conversation\n\nLet's make learning fun and meaningful! 🚀`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [selectedLanguage]);

  const simulateAgentResponse = async (userMessage: string): Promise<Message> => {
    // Simulate tool usage and agent reasoning
    const actions = [];
    let response = '';

    // Detect learning intent and simulate appropriate tool usage
    if (userMessage.toLowerCase().includes('vocabulary') || userMessage.toLowerCase().includes('words')) {
      actions.push({
        type: 'thought' as const,
        content: 'User wants to work on vocabulary. I should use the vocabulary builder tool.',
      });
      actions.push({
        type: 'tool_use' as const,
        content: 'Using vocabulary_builder tool',
        tool: 'vocabulary_builder',
        toolInput: { action: 'practice_session', language: selectedLanguage },
        toolOutput: '🎯 Vocabulary Practice Session - SPANISH\n\n📚 Today\'s words (5/10):\n\n1. 📍 "Hola" = ?\n   a) Goodbye  b) Hello  c) Thank you\n\n2. 🔄 Translate: "Good morning"\n   Your answer: ____________\n\n3. 🎭 Fill the blank: "Me _____ Juan" (My name is Juan)\n\n💪 Score so far: 8/10 correct\n⭐ Streak: 5 days!'
      });
      response = "Great! Let's practice some vocabulary. I've prepared an interactive session for you based on your current level.\n\nLook at these questions and try to answer them. Don't worry if you make mistakes - that's how we learn! 📚\n\nFor the first question, what do you think \"Hola\" means?";
    }
    else if (userMessage.toLowerCase().includes('conversation') || userMessage.toLowerCase().includes('practice')) {
      actions.push({
        type: 'thought' as const,
        content: 'User wants conversation practice. I should create a realistic scenario.',
      });
      actions.push({
        type: 'tool_use' as const,
        content: 'Using conversation_practice tool',
        tool: 'conversation_practice',
        toolInput: { action: 'start_scenario', scenario: 'restaurant', language: selectedLanguage },
        toolOutput: '🎭 Conversation Scenario: RESTAURANT - SPANISH\n\n📍 Setting: You\'re at a restaurant in Madrid\n🎯 Goal: Order food and drinks\n⭐ Difficulty: beginner\n\n🤵 Waiter: "¡Buenas tardes! ¿Mesa para cuántas personas?"\n(Good afternoon! Table for how many people?)'
      });
      response = "¡Perfecto! Let's practice a real conversation scenario. You're at a restaurant in Madrid and the waiter just greeted you.\n\nThe waiter said: \"¡Buenas tardes! ¿Mesa para cuántas personas?\"\n\nThis means: \"Good afternoon! Table for how many people?\"\n\nHow would you respond? Try answering in Spanish! 💬";
    }
    else if (userMessage.toLowerCase().includes('grammar') || userMessage.toLowerCase().includes('verbs')) {
      actions.push({
        type: 'thought' as const,
        content: 'User needs grammar help. I should provide a clear lesson.',
      });
      actions.push({
        type: 'tool_use' as const,
        content: 'Using grammar_coach tool',
        tool: 'grammar_coach',
        toolInput: { action: 'lesson', topic: 'verbs', language: selectedLanguage },
        toolOutput: '📖 Grammar Lesson: VERBS in SPANISH\n\n🎯 Today\'s Focus: Present Tense Verbs\n\n📚 Key Rules:\n1. Regular -AR verbs: hablar → hablo, hablas, habla...\n2. Regular -ER verbs: comer → como, comes, come...\n3. Regular -IR verbs: vivir → vivo, vives, vive...'
      });
      response = "Let's dive into Spanish grammar! Today we'll focus on present tense verbs - they're the foundation of Spanish communication.\n\nSpanish verbs are grouped by their endings: -AR, -ER, and -IR. Each group follows a pattern.\n\nFor example:\n• HABLAR (to speak): hablo, hablas, habla\n• COMER (to eat): como, comes, come\n• VIVIR (to live): vivo, vives, vive\n\nTry conjugating \"estudiar\" (to study). What would \"I study\" be in Spanish? 📖";
    }
    else if (userMessage.toLowerCase().includes('pronunciation') || userMessage.toLowerCase().includes('accent')) {
      actions.push({
        type: 'thought' as const,
        content: 'User wants pronunciation help. I should provide specific guidance.',
      });
      actions.push({
        type: 'tool_use' as const,
        content: 'Using pronunciation_coach tool',
        tool: 'pronunciation_coach',
        toolInput: { action: 'sound_guide', language: selectedLanguage },
        toolOutput: '🎵 Pronunciation Guide: SPANISH Sounds\n\n🔤 Challenging sounds for English speakers:\n\n🎯 SPANISH:\n• RR (rolling R): "perro" - tip of tongue vibrates\n• Ñ: "niño" - like "ny" in canyon\n• J: "joven" - like "h" but stronger'
      });
      response = "Great question about pronunciation! Spanish has some unique sounds that English speakers often find challenging.\n\nThe rolling R (RR) is probably the most famous one. Don't worry if you can't do it right away - even some native speakers struggle with it!\n\nLet's start with something easier. The Spanish \"J\" sound (like in \"joven\") is made in the back of your throat, similar to clearing your throat gently.\n\nWhich sound would you like to practice first? 🎵";
    }
    else {
      // General learning response
      response = `That's a great question about learning ${languages.find(l => l.code === selectedLanguage)?.name}! \n\nI can help you with many aspects of language learning:\n\n📚 **Vocabulary**: Build your word bank systematically\n💬 **Conversation**: Practice real-world scenarios\n📖 **Grammar**: Master the rules step by step\n🎵 **Pronunciation**: Perfect your accent\n🌍 **Culture**: Understand context and etiquette\n\nWhat specific area interests you most right now? Or would you like me to assess your current level and create a personalized learning plan?`;
    }

    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: response,
      timestamp: new Date(),
      actions: actions.length > 0 ? actions : undefined
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const assistantMessage = await simulateAgentResponse(inputValue);
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = async (action: typeof languageLearningQuickActions[0]) => {
    const actionMessage = `Execute ${action.label.toLowerCase()}`;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: actionMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const assistantMessage = await simulateAgentResponse(actionMessage);
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real implementation, this would start/stop speech recognition
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = selectedLanguage === 'spanish' ? 'es-ES' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white">
      {/* Header with Language Selection and Progress */}
      <div className="border-b border-gray-200 p-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Language Learning Tutor</h1>
              <p className="text-sm text-gray-600">Interactive AI-powered language learning</p>
            </div>
          </div>
          
          {/* Language Selector */}
          <div className="flex flex-col gap-2">
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <optgroup label="🌍 Major World Languages">
                {languages.filter(lang => lang.category === 'major').map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="🇮🇩 Indonesian Regional Languages">
                {languages.filter(lang => lang.category === 'indonesian').map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </optgroup>
            </select>
            {languages.find(l => l.code === selectedLanguage)?.category === 'indonesian' && (
              <div className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded flex items-center justify-between">
                <span>🌟 Traditional Indonesian Language - Preserving Cultural Heritage</span>
                {selectedLanguage === 'sundanese' && (
                  <a 
                    href="/learn/sundanese" 
                    target="_blank"
                    className="ml-2 px-2 py-1 bg-purple-200 hover:bg-purple-300 rounded text-purple-800 transition-colors"
                  >
                    📚 Full Course
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
              <Target className="h-4 w-4" />
              <span className="text-xs font-medium">Words Learned</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{session.wordsLearned}</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
              <Clock className="h-4 w-4" />
              <span className="text-xs font-medium">Sessions</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{session.sessionsCompleted}</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center justify-center gap-1 text-orange-600 mb-1">
              <Trophy className="h-4 w-4" />
              <span className="text-xs font-medium">Streak</span>
            </div>
            <div className="text-xl font-bold text-gray-800">{session.streak} days</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center justify-center gap-1 text-purple-600 mb-1">
              <Globe className="h-4 w-4" />
              <span className="text-xs font-medium">Level</span>
            </div>
            <div className="text-sm font-bold text-gray-800 capitalize">{session.level}</div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg p-4 ${
              message.role === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              <div className="whitespace-pre-wrap">{message.content}</div>
              
              {/* Tool Actions Display */}
              {message.actions && (
                <div className="mt-3 space-y-2">
                  {message.actions.map((action, idx) => (
                    <div key={idx} className="text-xs opacity-75 border-t border-gray-300 pt-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {action.type === 'thought' && '💭'}
                          {action.type === 'tool_use' && '🔧'}
                          {action.type === 'response' && '💬'}
                          {action.type}
                        </span>
                        <span>{action.content}</span>
                      </div>
                      {action.toolOutput && (
                        <div className="mt-1 p-2 bg-gray-50 rounded text-gray-600">
                          {action.toolOutput}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {message.role === 'assistant' && (
                <button
                  onClick={() => speakText(message.content)}
                  className="mt-2 p-1 hover:bg-gray-200 rounded transition-colors"
                  title="Listen to pronunciation"
                >
                  <Volume2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="flex flex-wrap gap-2 mb-4">
          {languageLearningQuickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action)}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
              disabled={isLoading}
            >
              <span>{action.icon}</span>
              <span>{action.label}</span>
            </button>
          ))}
          
          {/* Special Indonesian Language Actions */}
          {languages.find(l => l.code === selectedLanguage)?.category === 'indonesian' && (
            <>
              <button
                onClick={() => handleQuickAction({
                  icon: '🏛️',
                  label: 'Budaya & Adat',
                  action: 'cultural_context',
                  params: { action: 'etiquette_guide', language: selectedLanguage }
                })}
                className="flex items-center gap-2 px-3 py-2 bg-orange-50 border border-orange-300 rounded-lg hover:bg-orange-100 transition-colors text-sm text-orange-800"
                disabled={isLoading}
              >
                <span>🏛️</span>
                <span>Budaya & Adat</span>
              </button>
              <button
                onClick={() => handleQuickAction({
                  icon: '📜',
                  label: 'Tingkatan Bahasa',
                  action: 'cultural_context',
                  params: { action: 'social_situations', language: selectedLanguage }
                })}
                className="flex items-center gap-2 px-3 py-2 bg-purple-50 border border-purple-300 rounded-lg hover:bg-purple-100 transition-colors text-sm text-purple-800"
                disabled={isLoading}
              >
                <span>📜</span>
                <span>Tingkatan Bahasa</span>
              </button>
            </>
          )}
        </div>
        
        {/* Common Prompts */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {languageLearningPrompts.slice(0, 3).map((prompt, index) => (
              <button
                key={index}
                onClick={() => setInputValue(prompt)}
                className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
              >
                &quot;{prompt}&quot;
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything about learning languages..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={toggleListening}
            className={`p-2 rounded-lg transition-colors ${
              isListening 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title={isListening ? 'Stop listening' : 'Start voice input'}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
