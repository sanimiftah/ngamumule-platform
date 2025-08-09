import type { AgentConfig } from '@/types/agent';
import { calendarTool, taskManagerTool, financeTrackerTool } from './personal-assistant-tools';
import { mathTutorTool, studyPlannerTool, knowledgeAssessmentTool, languageLearningTool } from './education-tutor-tools';
import { defaultTools } from './agent-tools';

// Personal Assistant Agent Configuration
export const personalAssistantConfig: AgentConfig = {
  name: 'Personal Life Assistant',
  description: 'Your intelligent personal assistant for managing daily life, tasks, finances, and home automation',
  model: {
    provider: 'openai',
    model: 'gpt-4',
    temperature: 0.3 // Lower temperature for more consistent, reliable responses
  },
  tools: [
    ...defaultTools, // Basic tools (calculator, weather, etc.)
    calendarTool,
    taskManagerTool,
    financeTrackerTool
  ],
  maxIterations: 15, // Allow more complex multi-step workflows
  temperature: 0.3
};

// Education Tutor Agent Configuration  
export const educationTutorConfig: AgentConfig = {
  name: 'AI Education Tutor',
  description: 'Your personalized AI tutor for adaptive learning, homework help, and academic growth',
  model: {
    provider: 'openai', 
    model: 'gpt-4',
    temperature: 0.7 // Higher temperature for more creative teaching approaches
  },
  tools: [
    ...defaultTools.filter(tool => ['calculator', 'web_search', 'execute_code'].includes(tool.name)), // Relevant basic tools
    mathTutorTool,
    studyPlannerTool,
    knowledgeAssessmentTool,
    languageLearningTool
  ],
  maxIterations: 20, // Allow complex educational workflows
  temperature: 0.7
};

// Agent Personas and Behaviors
export const agentPersonas = {
  personalAssistant: {
    greeting: "👋 Hello! I'm your personal assistant. I can help you manage your calendar, tasks, finances, and daily life. What would you like me to help you with today?",
    personality: "efficient, proactive, organized, helpful",
    specialties: [
      "Calendar and scheduling management",
      "Task prioritization and reminders", 
      "Financial tracking and budgeting",
      "Home automation and smart device control",
      "Travel planning and coordination",
      "Email and communication assistance"
    ],
    conversationStyle: "direct and action-oriented",
    examples: [
      "Schedule a dentist appointment for next week",
      "Add 'buy groceries' to my high-priority tasks",
      "How much did I spend on food this month?",
      "Remind me to call mom tomorrow at 3 PM",
      "What's my schedule looking like for Friday?"
    ]
  },
  
  educationTutor: {
    greeting: "📚 Welcome, student! I'm your AI tutor, here to help you learn and grow. I can teach any subject, create study plans, and adapt to your learning style. What would you like to learn today?",
    personality: "patient, encouraging, adaptive, knowledgeable",
    specialties: [
      "Step-by-step problem solving",
      "Personalized learning paths",
      "Concept explanation and examples",
      "Study planning and progress tracking",
      "Multiple subjects and skill levels",
      "Learning style adaptation"
    ],
    conversationStyle: "encouraging and educational",
    examples: [
      "Help me solve this algebra problem: 2x + 5 = 13", 
      "I need to learn calculus basics in 2 weeks",
      "Create a study schedule for my Spanish exam",
      "Explain photosynthesis in simple terms",
      "Test my knowledge of American history"
    ]
  }
};

// Agent Decision Making Logic
export const agentDecisionRules = {
  personalAssistant: {
    // Keywords that trigger specific tools
    taskKeywords: ['task', 'todo', 'remind', 'priority', 'deadline'],
    calendarKeywords: ['schedule', 'appointment', 'meeting', 'calendar', 'book', 'available'],
    financeKeywords: ['expense', 'budget', 'money', 'spend', 'cost', 'bill', 'payment'],
    
    // Proactive suggestions
    shouldSuggestCalendarReview: (currentHour: number) => currentHour === 8, // 8 AM
    shouldSuggestTaskReview: (currentHour: number) => currentHour === 17, // 5 PM
    shouldSuggestBudgetCheck: (dayOfMonth: number) => dayOfMonth === 1, // 1st of month
  },
  
  educationTutor: {
    // Learning-focused triggers
    mathKeywords: ['solve', 'calculate', 'equation', 'math', 'algebra', 'geometry'],
    studyKeywords: ['study', 'learn', 'practice', 'review', 'schedule', 'plan'],
    assessmentKeywords: ['test', 'quiz', 'check', 'assess', 'evaluate', 'progress'],
    languageKeywords: ['language', 'grammar', 'vocabulary', 'pronunciation', 'conversation'],
    
    // Adaptive behavior
    shouldEncourage: (strugglingConcept: boolean) => strugglingConcept,
    shouldIncreaseDifficulty: (masteryLevel: number) => masteryLevel > 0.8,
    shouldRecommendBreak: (studyTime: number) => studyTime > 60, // minutes
  }
};
