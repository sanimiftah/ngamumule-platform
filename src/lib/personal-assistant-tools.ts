// Personal Assistant Tools - Implementation Examples

import type { Tool } from '@/types/agent';

// Calendar Management Tool
export const calendarTool: Tool = {
  name: 'calendar_manager',
  description: 'Manage calendar events, schedule meetings, and avoid conflicts',
  parameters: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        description: 'Action to perform',
        enum: ['create_event', 'list_events', 'find_free_time', 'reschedule', 'cancel']
      },
      date: {
        type: 'string',
        description: 'Date for the event (YYYY-MM-DD format)'
      },
      time: {
        type: 'string',
        description: 'Time for the event (HH:MM format)'
      },
      duration: {
        type: 'string',
        description: 'Duration in minutes'
      },
      title: {
        type: 'string',
        description: 'Event title or description'
      },
      attendees: {
        type: 'string',
        description: 'Comma-separated list of email addresses'
      }
    },
    required: ['action']
  },
  execute: async (params) => {
    // Simulated calendar operations
    const { action, date, time, title, duration } = params;
    
    switch (action) {
      case 'create_event':
        return `✅ Created event "${title}" on ${date} at ${time} for ${duration} minutes`;
      case 'list_events':
        return `📅 Today's events: 9:00 AM - Team Meeting, 2:00 PM - Doctor Appointment, 4:00 PM - Project Review`;
      case 'find_free_time':
        return `🕐 Available slots today: 10:30-11:30 AM, 12:00-1:00 PM, 3:00-4:00 PM`;
      case 'reschedule':
        return `📝 Rescheduled "${title}" to ${date} at ${time}`;
      default:
        return `Unknown calendar action: ${action}`;
    }
  }
};

// Task Management Tool
export const taskManagerTool: Tool = {
  name: 'task_manager',
  description: 'Create, manage, and track personal tasks and to-dos',
  parameters: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        description: 'Task action to perform',
        enum: ['create', 'list', 'complete', 'prioritize', 'set_reminder']
      },
      task: {
        type: 'string',
        description: 'Task description'
      },
      priority: {
        type: 'string',
        description: 'Task priority level',
        enum: ['low', 'medium', 'high', 'urgent']
      },
      due_date: {
        type: 'string',
        description: 'Due date (YYYY-MM-DD)'
      },
      category: {
        type: 'string',
        description: 'Task category',
        enum: ['work', 'personal', 'health', 'shopping', 'home']
      }
    },
    required: ['action']
  },
  execute: async (params) => {
    const { action, task, priority, due_date, category } = params;
    
    switch (action) {
      case 'create':
        return `✅ Created task: "${task}" (Priority: ${priority}, Due: ${due_date}, Category: ${category})`;
      case 'list':
        return `📋 Current tasks:\n• Buy groceries (High, Today)\n• Call dentist (Medium, Tomorrow)\n• Review budget (Low, This week)`;
      case 'complete':
        return `✅ Marked "${task}" as completed! Great job! 🎉`;
      case 'prioritize':
        return `📌 Updated "${task}" priority to ${priority}`;
      default:
        return `Unknown task action: ${action}`;
    }
  }
};

// Finance Tracker Tool
export const financeTrackerTool: Tool = {
  name: 'finance_tracker',
  description: 'Track expenses, monitor budget, and provide financial insights',
  parameters: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        description: 'Financial action to perform',
        enum: ['add_expense', 'view_budget', 'spending_summary', 'bill_reminder', 'savings_goal']
      },
      amount: {
        type: 'string',
        description: 'Amount in currency'
      },
      category: {
        type: 'string',
        description: 'Expense category',
        enum: ['food', 'transport', 'entertainment', 'utilities', 'shopping', 'health']
      },
      description: {
        type: 'string',
        description: 'Expense description'
      }
    },
    required: ['action']
  },
  execute: async (params) => {
    const { action, amount, category, description } = params;
    
    switch (action) {
      case 'add_expense':
        return `💰 Added expense: $${amount} for ${description} (Category: ${category})`;
      case 'view_budget':
        return `📊 Monthly Budget Status:\n• Food: $450/$500 (90%)\n• Transport: $120/$200 (60%)\n• Entertainment: $180/$150 (120% - Over budget!)`;
      case 'spending_summary':
        return `📈 This month: $1,250 spent\n• Top category: Food ($450)\n• Compared to last month: +$75\n• Savings rate: 22%`;
      case 'bill_reminder':
        return `🔔 Upcoming bills:\n• Electricity: $85 (Due in 3 days)\n• Internet: $60 (Due next week)\n• Credit card: $324 (Due in 10 days)`;
      default:
        return `Unknown finance action: ${action}`;
    }
  }
};
