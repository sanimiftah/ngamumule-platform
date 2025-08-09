'use client';

import { cn } from '@/lib/utils';
import { Calendar, GraduationCap, Zap, Eye } from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Personal Assistant',
    description: 'Intelligent daily life management with calendar, tasks, finances, and smart home integration.',
  },
  {
    icon: GraduationCap,
    title: 'Education Tutor',
    description: 'Adaptive learning with personalized instruction, progress tracking, and multi-subject expertise.',
  },
  {
    icon: Zap,
    title: 'Agentic Intelligence',
    description: 'Autonomous AI that uses tools, makes decisions, and solves complex multi-step problems.',
  },
  {
    icon: Eye,
    title: 'Transparent Actions',
    description: 'See exactly how AI thinks and works - building trust through complete transparency.',
  },
];

interface FeatureGridProps {
  className?: string;
}

export function FeatureGrid({ className }: FeatureGridProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6', className)}>
      {features.map((feature, index) => (
        <div
          key={index}
          className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <feature.icon className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
          <p className="text-gray-600 text-sm">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
