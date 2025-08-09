// Language Learning Tutor Configuration

import type { AgentConfig } from '@/types/agent';
import { 
  vocabularyBuilderTool, 
  grammarCoachTool, 
  conversationPracticeTool, 
  pronunciationCoachTool, 
  culturalContextTool 
} from './language-learning-tools';

export const languageLearningTutorConfig: AgentConfig = {
  name: 'Language Learning Tutor',
  description: 'Master any language with interactive lessons, conversation practice, and cultural insights',
  model: {
    provider: 'openai',
    model: 'gpt-4o',
    temperature: 0.7,
    maxTokens: 4000
  },
  tools: [
    vocabularyBuilderTool,
    grammarCoachTool, 
    conversationPracticeTool,
    pronunciationCoachTool,
    culturalContextTool
  ],
  maxIterations: 10,
  temperature: 0.7
};

// Language Learning Quick Actions
export const languageLearningQuickActions = [
  {
    icon: '📚',
    label: 'Start Vocabulary Session',
    action: 'vocabulary_builder',
    params: { action: 'practice_session', language: 'spanish' }
  },
  {
    icon: '💬',
    label: 'Practice Conversation',
    action: 'conversation_practice', 
    params: { action: 'start_scenario', scenario: 'restaurant', language: 'spanish' }
  },
  {
    icon: '📖',
    label: 'Grammar Lesson',
    action: 'grammar_coach',
    params: { action: 'lesson', topic: 'verbs', language: 'spanish' }
  },
  {
    icon: '🎵',
    label: 'Pronunciation Guide',
    action: 'pronunciation_coach',
    params: { action: 'sound_guide', language: 'spanish' }
  },
  {
    icon: '🌍',
    label: 'Cultural Insights',
    action: 'cultural_context',
    params: { action: 'etiquette_guide', language: 'spanish' }
  },
  {
    icon: '📊',
    label: 'Check Progress',
    action: 'vocabulary_builder',
    params: { action: 'progress_check', language: 'spanish' }
  }
];

// Language Learning Prompt Templates
export const languageLearningPrompts = [
  "I want to learn Spanish from scratch",
  "Help me practice French conversation for travel",
  "I need to improve my German pronunciation", 
  "Teach me Italian grammar basics",
  "I want to understand Portuguese culture",
  "Help me prepare for a business meeting in Spanish",
  "Practice ordering food in French",
  "Learn Chinese tones and pronunciation",
  "Master Japanese writing systems",
  "Improve my accent in any language"
];

// Learning Path Recommendations
export const learningPaths = {
  beginner: [
    'Basic greetings and introductions',
    'Essential vocabulary (numbers, colors, days)',
    'Present tense verbs',
    'Simple conversation practice',
    'Cultural basics'
  ],
  intermediate: [
    'Expanded vocabulary themes',
    'Past and future tenses', 
    'Complex conversation scenarios',
    'Pronunciation refinement',
    'Cultural nuances'
  ],
  advanced: [
    'Specialized vocabulary',
    'Subjunctive and complex grammar',
    'Professional/academic language',
    'Native-level pronunciation',
    'Regional variations and slang'
  ]
};
