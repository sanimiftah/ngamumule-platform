'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { defaultTools } from '@/lib/agent-tools';
import { Tool } from '@/types/agent';
import { 
  Search, 
  Calculator, 
  Cloud, 
  Code, 
  FileText, 
  Play, 
  CheckCircle 
} from 'lucide-react';

interface AgentToolsShowcaseProps {
  className?: string;
}

export function AgentToolsShowcase({ className }: AgentToolsShowcaseProps) {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<string>('');

  const getToolIcon = (toolName: string) => {
    switch (toolName) {
      case 'web_search': return Search;
      case 'calculator': return Calculator;
      case 'get_weather': return Cloud;
      case 'execute_code': return Code;
      case 'file_operations': return FileText;
      default: return Play;
    }
  };

  const getToolColor = (toolName: string) => {
    switch (toolName) {
      case 'web_search': return 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200';
      case 'calculator': return 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200';
      case 'get_weather': return 'bg-cyan-100 text-cyan-700 border-cyan-200 hover:bg-cyan-200';
      case 'execute_code': return 'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200';
      case 'file_operations': return 'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200';
    }
  };

  const getDemoParams = (toolName: string) => {
    switch (toolName) {
      case 'web_search':
        return { query: 'latest AI developments 2025' };
      case 'calculator':
        return { expression: '(15 * 23) + 100 - 45' };
      case 'get_weather':
        return { location: 'San Francisco' };
      case 'execute_code':
        return { 
          code: 'const greet = (name) => `Hello, ${name}!`; greet("AI Agent")', 
          language: 'javascript' 
        };
      case 'file_operations':
        return { operation: 'read', path: '/example/document.txt' };
      default:
        return {};
    }
  };

  const runToolDemo = async (tool: Tool) => {
    setIsRunning(true);
    setResult('');
    
    try {
      const params = getDemoParams(tool.name);
      const output = await tool.execute(params);
      setResult(output);
    } catch (error) {
      setResult(`Error: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      <div className="text-center">
        <h4 className="text-2xl font-bold text-gray-900 mb-2">Agentic AI Tools</h4>
        <p className="text-gray-600">
          Explore the tools our AI agent can use to solve complex problems
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {defaultTools.map((tool) => {
          const IconComponent = getToolIcon(tool.name);
          const isSelected = selectedTool?.name === tool.name;
          
          return (
            <div
              key={tool.name}
              onClick={() => setSelectedTool(tool)}
              className={cn(
                'p-4 rounded-lg border-2 cursor-pointer transition-all',
                isSelected 
                  ? 'ring-2 ring-blue-500 ring-offset-2' 
                  : 'hover:shadow-md',
                getToolColor(tool.name)
              )}
            >
              <div className="flex items-center space-x-3 mb-2">
                <IconComponent className="w-5 h-5" />
                <h5 className="font-medium">
                  {tool.name.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </h5>
              </div>
              <p className="text-sm opacity-75">
                {tool.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Selected Tool Details */}
      {selectedTool && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {React.createElement(getToolIcon(selectedTool.name), { 
                className: "w-6 h-6 text-blue-600" 
              })}
              <h5 className="text-lg font-semibold text-gray-900">
                {selectedTool.name.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </h5>
            </div>
            <button
              onClick={() => runToolDemo(selectedTool)}
              disabled={isRunning}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isRunning ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Running...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Test Tool</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Parameters */}
            <div>
              <h6 className="font-medium text-gray-900 mb-2">Parameters</h6>
              <div className="bg-gray-50 rounded-md p-3">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {JSON.stringify(selectedTool.parameters, null, 2)}
                </pre>
              </div>
            </div>

            {/* Demo Parameters */}
            <div>
              <h6 className="font-medium text-gray-900 mb-2">Demo Input</h6>
              <div className="bg-gray-50 rounded-md p-3">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {JSON.stringify(getDemoParams(selectedTool.name), null, 2)}
                </pre>
              </div>
            </div>
          </div>

          {/* Result */}
          {result && (
            <div className="mt-4">
              <h6 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Output</span>
              </h6>
              <div className="bg-green-50 border border-green-200 rounded-md p-3">
                <p className="text-sm text-green-800">{result}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
