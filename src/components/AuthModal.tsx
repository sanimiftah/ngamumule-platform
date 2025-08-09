'use client';

import React, { useState } from 'react';
import { X, Eye, EyeOff, Globe, Shield, Heart, Users } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  mode: 'signin' | 'signup' | null;
  onClose: () => void;
  onModeChange: (mode: 'signin' | 'signup') => void;
  onAuth: (credentials: { email?: string; username?: string; password: string; preferredName?: string; goals?: string[] }) => void;
  onGuestContinue: () => void;
}

export function AuthModal({ isOpen, mode, onClose, onModeChange, onAuth, onGuestContinue }: AuthModalProps) {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    preferredName: '',
    goals: [] as string[]
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const learningGoals = [
    { id: 'conversation', label: 'Ngobrol sapopoé (Daily conversation)', icon: '💬' },
    { id: 'culture', label: 'Budaya Sunda (Sundanese culture)', icon: '🎭' },
    { id: 'music', label: 'Musik tradisional (Traditional music)', icon: '🎵' },
    { id: 'travel', label: 'Wisata ka Bandung (Travel to Bandung)', icon: '✈️' },
    { id: 'family', label: 'Komunikasi sareng kulawarga (Family communication)', icon: '👨‍👩‍👧‍👦' },
    { id: 'business', label: 'Bisnis di Jawa Barat (Business in West Java)', icon: '💼' }
  ];

  if (!isOpen || !mode) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await onAuth(formData);
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleGoal = (goalId: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goalId) 
        ? prev.goals.filter(g => g !== goalId)
        : [...prev.goals, goalId]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {mode === 'signin' ? 'Sugeng rawuh deui!' : 'Gabung sareng urang!'}
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          <p className="text-gray-600 mt-1">
            {mode === 'signin' 
              ? 'Sign in to continue your Sundanese learning journey' 
              : 'Start your journey learning beautiful Sundanese language'
            }
          </p>
        </div>

        {/* Guest Continue Option */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-teal-50">
          <button
            onClick={onGuestContinue}
            className="w-full flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-dashed border-blue-300 hover:border-blue-400 transition-colors group"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <Globe className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">Continue as Guest</div>
              <div className="text-sm text-gray-600">Start learning immediately, create account later</div>
            </div>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {mode === 'signup' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Name (Nami anu dipikaresep)
              </label>
              <input
                type="text"
                value={formData.preferredName}
                onChange={(e) => setFormData(prev => ({ ...prev, preferredName: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="How should we call you?"
              />
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="your@email.com"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent pr-12"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              {/* Learning Goals */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What would you like to learn? (Naon anu hoyong diajar?)
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {learningGoals.map(goal => (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => toggleGoal(goal.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-colors text-left ${
                        formData.goals.includes(goal.id)
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-lg">{goal.icon}</span>
                      <span className="text-sm font-medium text-gray-900">{goal.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Privacy Notice */}
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-green-600 mt-0.5" />
              <div className="text-sm">
                <div className="font-medium text-green-900 mb-1">Privacy-First Promise</div>
                <div className="text-green-700">
                  We keep your data secure and never share it. Your learning progress stays private.
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : (mode === 'signin' ? 'Asup (Sign In)' : 'Daptar (Sign Up)')}
          </button>

          {/* Switch Mode */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => onModeChange(mode === 'signin' ? 'signup' : 'signin')}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              {mode === 'signin' 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </form>

        {/* Community Values */}
        <div className="px-6 pb-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="h-5 w-5 text-purple-600" />
              <span className="font-semibold text-purple-900">Join Our Community</span>
            </div>
            <div className="text-sm text-purple-700">
              Connect with fellow learners, share your progress, and celebrate Sundanese culture together!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
