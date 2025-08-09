import type { Tool } from '@/types/agent';

// Web Search Tool (simulated for demo)
export const webSearchTool: Tool = {
  name: 'web_search',
  description: 'Search the web for current information about any topic',
  parameters: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'The search query to find information about'
      }
    },
    required: ['query']
  },
  execute: async (params: { query: string }) => {
    // Simulate web search
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `Search results for "${params.query}": This is simulated search data. In a real implementation, this would integrate with search APIs like Google Search API, Bing Search API, or SerpAPI.`;
  }
};

// Calculator Tool
export const calculatorTool: Tool = {
  name: 'calculator',
  description: 'Perform mathematical calculations',
  parameters: {
    type: 'object',
    properties: {
      expression: {
        type: 'string',
        description: 'Mathematical expression to evaluate (e.g., "2 + 2", "10 * 5", "sqrt(16)")'
      }
    },
    required: ['expression']
  },
  execute: async (params: { expression: string }) => {
    try {
      // Basic safe evaluation (in production, use a proper math parser)
      const result = eval(params.expression.replace(/[^0-9+\-*/().sqrt\s]/g, ''));
      return `Calculation result: ${params.expression} = ${result}`;
    } catch (error) {
      return `Error in calculation: ${error}`;
    }
  }
};

// Weather Tool (simulated)
export const weatherTool: Tool = {
  name: 'get_weather',
  description: 'Get current weather information for a location',
  parameters: {
    type: 'object',
    properties: {
      location: {
        type: 'string',
        description: 'The city or location to get weather for'
      }
    },
    required: ['location']
  },
  execute: async (params: { location: string }) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const temps = [18, 22, 25, 28, 32];
    const conditions = ['sunny', 'cloudy', 'rainy', 'partly cloudy'];
    const temp = temps[Math.floor(Math.random() * temps.length)];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    
    return `Weather in ${params.location}: ${temp}°C, ${condition}. This is simulated weather data. In production, integrate with weather APIs like OpenWeatherMap.`;
  }
};

// Code Execution Tool (simulated)
export const codeExecutorTool: Tool = {
  name: 'execute_code',
  description: 'Execute JavaScript code and return the result',
  parameters: {
    type: 'object',
    properties: {
      code: {
        type: 'string',
        description: 'JavaScript code to execute'
      },
      language: {
        type: 'string',
        description: 'Programming language (currently only supports javascript)',
        enum: ['javascript']
      }
    },
    required: ['code', 'language']
  },
  execute: async (params: { code: string; language: string }) => {
    try {
      if (params.language !== 'javascript') {
        return `Error: ${params.language} is not supported. Only JavaScript is currently supported.`;
      }
      
      // In production, use a sandboxed environment
      const result = eval(params.code);
      return `Code execution result: ${result}`;
    } catch (error) {
      return `Code execution error: ${error}`;
    }
  }
};

// File System Tool (simulated)
export const fileSystemTool: Tool = {
  name: 'file_operations',
  description: 'Perform file system operations like reading or creating files',
  parameters: {
    type: 'object',
    properties: {
      operation: {
        type: 'string',
        description: 'The operation to perform',
        enum: ['read', 'write', 'list']
      },
      path: {
        type: 'string',
        description: 'File or directory path'
      },
      content: {
        type: 'string',
        description: 'Content to write (only for write operation)'
      }
    },
    required: ['operation', 'path']
  },
  execute: async (params: { operation: string; path: string; content?: string }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    switch (params.operation) {
      case 'read':
        return `Reading file ${params.path}: This is simulated file content. In production, this would read actual files with proper security measures.`;
      case 'write':
        return `Writing to file ${params.path}: Content written successfully. This is simulated. In production, implement with proper file system APIs.`;
      case 'list':
        return `Listing directory ${params.path}: file1.txt, file2.js, folder1/. This is simulated directory listing.`;
      default:
        return `Unknown operation: ${params.operation}`;
    }
  }
};

export const defaultTools: Tool[] = [
  webSearchTool,
  calculatorTool,
  weatherTool,
  codeExecutorTool,
  fileSystemTool
];
