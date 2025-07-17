'use client';

import React, { useState } from 'react';

interface Tool {
  name: string;
  icon: string;
  connected: boolean;
}

interface Agent {
  id: string;
  name: string;
  acronym: string;
  description: string;
  online: boolean;
  tools: Tool[];
  color: string;
}

interface AgentCardProps {
  agent: Agent;
  onToggleAgent: (id: string) => void;
}

export default function AgentCard({ agent, onToggleAgent }: AgentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300">
      {/* Agent Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-full ${agent.color} flex items-center justify-center text-white font-bold text-lg`}>
            {agent.acronym.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{agent.acronym}</h3>
            <p className="text-sm text-gray-600">{agent.name}</p>
          </div>
        </div>
        
        {/* Status Indicator */}
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${agent.online ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <span className={`text-sm font-medium ${agent.online ? 'text-green-600' : 'text-red-600'}`}>
            {agent.online ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm mb-4">{agent.description}</p>

      {/* Connected Tools */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Connected Tools</h4>
        <div className="flex flex-wrap gap-2">
          {agent.tools.map((tool, index) => (
            <div
              key={index}
              className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                tool.connected 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
            >
              <span>{tool.icon}</span>
              <span>{tool.name}</span>
              <div className={`w-2 h-2 rounded-full ${tool.connected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={() => onToggleAgent(agent.id)}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            agent.online
              ? 'bg-red-100 text-red-700 hover:bg-red-200'
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          {agent.online ? 'Stop Agent' : 'Start Agent'}
        </button>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 transition-colors"
        >
          {isExpanded ? 'Less' : 'More'}
        </button>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Last Active:</span>
              <span className="text-gray-900">{agent.online ? 'Now' : '2 hours ago'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tasks Completed:</span>
              <span className="text-gray-900">{Math.floor(Math.random() * 100) + 50}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Success Rate:</span>
              <span className="text-green-600">{Math.floor(Math.random() * 20) + 80}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
