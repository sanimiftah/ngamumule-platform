import type { ChatMessage, AIModelConfig } from './index';

export interface Tool {
  name: string;
  description: string;
  parameters: {
    type: 'object';
    properties: Record<string, {
      type: string;
      description: string;
      enum?: string[];
    }>;
    required: string[];
  };
  execute: (params: any) => Promise<string>;
}

export interface AgentAction {
  type: 'thought' | 'tool_use' | 'response';
  content: string;
  tool?: string;
  toolInput?: any;
  toolOutput?: string;
  timestamp: Date;
}

export interface AgentSession {
  id: string;
  messages: ChatMessage[];
  actions: AgentAction[];
  isThinking: boolean;
  currentTask?: string;
}

export interface AgentConfig {
  name: string;
  description: string;
  model: AIModelConfig;
  tools: Tool[];
  maxIterations: number;
  temperature: number;
}
