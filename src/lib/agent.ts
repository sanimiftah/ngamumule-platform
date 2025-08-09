import type { AgentConfig, AgentSession, AgentAction, Tool } from '@/types/agent';
import type { ChatMessage } from '@/types';
import { generateId } from './utils';
import { defaultTools } from './agent-tools';

export class NgamumuleAgent {
  private config: AgentConfig;
  private session: AgentSession;

  constructor(config?: Partial<AgentConfig>) {
    this.config = {
      name: 'Ngamumule Agent',
      description: 'An intelligent AI agent capable of using tools to solve complex tasks',
      model: {
        provider: 'openai',
        model: 'gpt-4',
        temperature: 0.7
      },
      tools: defaultTools,
      maxIterations: 10,
      temperature: 0.7,
      ...config
    };

    this.session = {
      id: generateId(),
      messages: [],
      actions: [],
      isThinking: false,
      currentTask: undefined
    };
  }

  async processMessage(message: string): Promise<ChatMessage[]> {
    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: message,
      timestamp: new Date()
    };

    this.session.messages.push(userMessage);
    this.session.isThinking = true;

    try {
      const response = await this.think(message);
      this.session.isThinking = false;
      return response;
    } catch (error) {
      this.session.isThinking = false;
      const errorMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: `I encountered an error while processing your request: ${error}`,
        timestamp: new Date()
      };
      this.session.messages.push(errorMessage);
      return [errorMessage];
    }
  }

  private async think(userInput: string): Promise<ChatMessage[]> {
    const responses: ChatMessage[] = [];
    let iterations = 0;
    let currentThought = userInput;

    while (iterations < this.config.maxIterations) {
      iterations++;

      // Add thinking action
      const thinkingAction: AgentAction = {
        type: 'thought',
        content: `Analyzing: ${currentThought}`,
        timestamp: new Date()
      };
      this.session.actions.push(thinkingAction);

      // Determine if we need to use tools
      const toolDecision = await this.decideTool(currentThought);

      if (toolDecision.needsTool && toolDecision.tool) {
        // Use tool
        const toolResult = await this.useTool(toolDecision.tool, toolDecision.parameters);
        
        const toolAction: AgentAction = {
          type: 'tool_use',
          content: `Using ${toolDecision.tool}`,
          tool: toolDecision.tool,
          toolInput: toolDecision.parameters,
          toolOutput: toolResult,
          timestamp: new Date()
        };
        this.session.actions.push(toolAction);

        // Update current thought with tool result
        currentThought = `Original request: ${userInput}\nTool result: ${toolResult}`;
      } else {
        // Generate final response
        const finalResponse = await this.generateResponse(currentThought);
        
        const responseAction: AgentAction = {
          type: 'response',
          content: finalResponse,
          timestamp: new Date()
        };
        this.session.actions.push(responseAction);

        const assistantMessage: ChatMessage = {
          id: generateId(),
          role: 'assistant',
          content: finalResponse,
          timestamp: new Date()
        };
        
        this.session.messages.push(assistantMessage);
        responses.push(assistantMessage);
        break;
      }
    }

    return responses;
  }

  private async decideTool(input: string): Promise<{
    needsTool: boolean;
    tool?: string;
    parameters?: any;
  }> {
    // Simple rule-based tool selection (in production, use LLM for this)
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('calculate') || lowerInput.includes('math') || /\d+\s*[\+\-\*/]\s*\d+/.test(input)) {
      const mathMatch = input.match(/[\d\+\-\*/\(\)\.\s]+/);
      return {
        needsTool: true,
        tool: 'calculator',
        parameters: { expression: mathMatch?.[0]?.trim() || input }
      };
    }

    if (lowerInput.includes('weather') || lowerInput.includes('temperature')) {
      const locationMatch = input.match(/in\s+([a-zA-Z\s]+)/i) || input.match(/for\s+([a-zA-Z\s]+)/i);
      return {
        needsTool: true,
        tool: 'get_weather',
        parameters: { location: locationMatch?.[1]?.trim() || 'London' }
      };
    }

    if (lowerInput.includes('search') || lowerInput.includes('find') || lowerInput.includes('lookup')) {
      return {
        needsTool: true,
        tool: 'web_search',
        parameters: { query: input }
      };
    }

    if (lowerInput.includes('code') || lowerInput.includes('execute') || lowerInput.includes('run')) {
      const codeMatch = input.match(/```(?:javascript|js)?\n?([\s\S]*?)\n?```/) || input.match(/`([^`]+)`/);
      if (codeMatch) {
        return {
          needsTool: true,
          tool: 'execute_code',
          parameters: { code: codeMatch[1], language: 'javascript' }
        };
      }
    }

    return { needsTool: false };
  }

  private async useTool(toolName: string, parameters: any): Promise<string> {
    const tool = this.config.tools.find(t => t.name === toolName);
    if (!tool) {
      return `Tool ${toolName} not found`;
    }

    try {
      return await tool.execute(parameters);
    } catch (error) {
      return `Error using tool ${toolName}: ${error}`;
    }
  }

  private async generateResponse(context: string): Promise<string> {
    // Simulate AI response generation (in production, use actual LLM API)
    await new Promise(resolve => setTimeout(resolve, 800));

    const responses = [
      `Based on my analysis of "${context}", I can help you with that.`,
      `I've processed your request: "${context}". Here's what I found.`,
      `After considering "${context}", I believe I can assist you.`,
      `I understand you want help with: "${context}". Let me provide you with a comprehensive response.`
    ];

    const baseResponse = responses[Math.floor(Math.random() * responses.length)];
    
    if (context.includes('Tool result:')) {
      return `${baseResponse}\n\nI've used my tools to gather information and can now provide you with a complete answer based on the results I obtained.`;
    }

    return `${baseResponse}\n\nAs an agentic AI, I can use various tools to help solve complex problems. Feel free to ask me to search for information, perform calculations, check weather, execute code, or handle file operations!`;
  }

  getSession(): AgentSession {
    return { ...this.session };
  }

  getActions(): AgentAction[] {
    return [...this.session.actions];
  }

  isThinking(): boolean {
    return this.session.isThinking;
  }

  addTool(tool: Tool): void {
    this.config.tools.push(tool);
  }

  removeTool(toolName: string): void {
    this.config.tools = this.config.tools.filter(t => t.name !== toolName);
  }

  getAvailableTools(): Tool[] {
    return [...this.config.tools];
  }
}
