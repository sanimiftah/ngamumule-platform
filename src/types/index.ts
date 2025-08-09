export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AIModelConfig {
  provider: 'openai' | 'anthropic' | 'local';
  model: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  aiModel: AIModelConfig;
  autoSave: boolean;
}
