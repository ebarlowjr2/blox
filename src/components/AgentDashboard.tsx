'use client';

import React, { useState } from 'react';
import AgentCard from './AgentCard';

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

const initialAgents: Agent[] = [
  {
    id: 'mark',
    name: 'Marketing, Automation, Research & Knowledge',
    acronym: 'M.A.R.K.',
    description: 'Handles marketing campaigns, lead generation, and customer research',
    online: true,
    color: 'bg-blue-500',
    tools: [
      { name: 'Gmail', icon: '📧', connected: true },
      { name: 'Google Drive', icon: '📁', connected: true },
      { name: 'Google Search', icon: '🔍', connected: true },
      { name: 'Twilio SMS', icon: '💬', connected: false },
      { name: 'HubSpot CRM', icon: '🎯', connected: true },
    ]
  },
  {
    id: 'cory',
    name: 'Creative Output & Rendering Yield',
    acronym: 'C.O.R.Y.',
    description: 'Creates content, designs, and multimedia assets',
    online: false,
    color: 'bg-purple-500',
    tools: [
      { name: 'Canva', icon: '🎨', connected: true },
      { name: 'Adobe Creative', icon: '🖼️', connected: false },
      { name: 'YouTube', icon: '📺', connected: true },
      { name: 'Figma', icon: '✏️', connected: true },
      { name: 'Unsplash', icon: '📸', connected: true },
    ]
  },
  {
    id: 'alex',
    name: 'Administrative Logistics Executive',
    acronym: 'A.L.E.X.',
    description: 'Manages schedules, documents, and administrative tasks',
    online: true,
    color: 'bg-green-500',
    tools: [
      { name: 'Google Calendar', icon: '📅', connected: true },
      { name: 'Slack', icon: '💼', connected: true },
      { name: 'Notion', icon: '📝', connected: true },
      { name: 'DocuSign', icon: '📋', connected: false },
      { name: 'Zoom', icon: '🎥', connected: true },
    ]
  },
  {
    id: 'hali',
    name: 'Human Assistance & Labor Intelligence',
    acronym: 'H.A.L.I.',
    description: 'Handles recruitment, employee relations, and HR processes',
    online: true,
    color: 'bg-orange-500',
    tools: [
      { name: 'LinkedIn', icon: '👔', connected: true },
      { name: 'BambooHR', icon: '👥', connected: true },
      { name: 'Indeed', icon: '🔎', connected: false },
      { name: 'Workday', icon: '⏰', connected: true },
      { name: 'Glassdoor', icon: '🏢', connected: false },
    ]
  },
  {
    id: 'fint',
    name: 'Financial Insights & Transactions',
    acronym: 'F.I.N.T.',
    description: 'Manages finances, budgets, and financial reporting',
    online: false,
    color: 'bg-emerald-500',
    tools: [
      { name: 'QuickBooks', icon: '💰', connected: true },
      { name: 'Stripe', icon: '💳', connected: true },
      { name: 'PayPal', icon: '💸', connected: false },
      { name: 'Excel', icon: '📊', connected: true },
      { name: 'Mint', icon: '🏦', connected: false },
    ]
  },
  {
    id: 'cyra',
    name: 'Cybersecurity Response & Analysis',
    acronym: 'C.Y.R.A.',
    description: 'Monitors security threats and protects digital assets',
    online: true,
    color: 'bg-red-500',
    tools: [
      { name: 'LastPass', icon: '🔐', connected: true },
      { name: 'Norton', icon: '🛡️', connected: true },
      { name: 'Cloudflare', icon: '☁️', connected: true },
      { name: 'VPN', icon: '🔒', connected: false },
      { name: 'Firewall', icon: '🚫', connected: true },
    ]
  },
  {
    id: 'tony',
    name: 'Technical Operations & Network Yield',
    acronym: 'T.O.N.Y.',
    description: 'Manages technical infrastructure and development operations',
    online: true,
    color: 'bg-indigo-500',
    tools: [
      { name: 'GitHub', icon: '🐙', connected: true },
      { name: 'AWS', icon: '☁️', connected: true },
      { name: 'Docker', icon: '🐳', connected: true },
      { name: 'Jenkins', icon: '⚙️', connected: false },
      { name: 'Monitoring', icon: '📈', connected: true },
    ]
  },
  {
    id: 'sage',
    name: 'Social Automation & Growth Engine',
    acronym: 'S.A.G.E.',
    description: 'Manages social media presence and community engagement',
    online: false,
    color: 'bg-pink-500',
    tools: [
      { name: 'Twitter', icon: '🐦', connected: true },
      { name: 'Instagram', icon: '📷', connected: true },
      { name: 'Facebook', icon: '👥', connected: false },
      { name: 'TikTok', icon: '🎵', connected: false },
      { name: 'Buffer', icon: '📱', connected: true },
    ]
  },
];

export default function AgentDashboard() {
  const [agents, setAgents] = useState<Agent[]>(initialAgents);

  const handleToggleAgent = (agentId: string) => {
    setAgents(prevAgents =>
      prevAgents.map(agent =>
        agent.id === agentId
          ? { ...agent, online: !agent.online }
          : agent
      )
    );
  };

  const onlineAgents = agents.filter(agent => agent.online).length;
  const totalAgents = agents.length;

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">🧠 B.L.O.X Agent Command Center</h1>
        <p className="text-blue-100 mb-4">Barlow Logic Operations Xecutive - Your AI CEO</p>
        <div className="flex space-x-6">
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-2xl font-bold">{onlineAgents}/{totalAgents}</div>
            <div className="text-sm text-blue-100">Agents Online</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-2xl font-bold">{agents.reduce((sum, agent) => sum + agent.tools.filter(tool => tool.connected).length, 0)}</div>
            <div className="text-sm text-blue-100">Tools Connected</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-2xl font-bold">98%</div>
            <div className="text-sm text-blue-100">System Health</div>
          </div>
        </div>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onToggleAgent={handleToggleAgent}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center">
            <div className="text-2xl mb-2">🚀</div>
            <div className="text-sm font-medium">Start All Agents</div>
          </button>
          <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center">
            <div className="text-2xl mb-2">⏸️</div>
            <div className="text-sm font-medium">Pause All</div>
          </button>
          <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-sm font-medium">View Reports</div>
          </button>
          <button className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow text-center">
            <div className="text-2xl mb-2">⚙️</div>
            <div className="text-sm font-medium">Settings</div>
          </button>
        </div>
      </div>
    </div>
  );
}
