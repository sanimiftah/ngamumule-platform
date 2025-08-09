'use client';

import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  LogOut, 
  Trophy, 
  Target, 
  Calendar, 
  Shield,
  Bell,
  Moon,
  Sun,
  Globe,
  Volume2,
  Clock,
  Users,
  BarChart3,
  X
} from 'lucide-react';
import { UserProfile, LearningProgress, Badge, LearningGoal } from '@/types/auth';

interface AuthHeaderProps {
  user?: UserProfile | null;
  progress?: LearningProgress | null;
  onSignIn: () => void;
  onSignUp: () => void;
  onSignOut: () => void;
}

export function AuthHeader({ user, progress, onSignIn, onSignUp, onSignOut }: AuthHeaderProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <button 
          onClick={onSignIn}
          className="px-4 py-2 text-teal-600 hover:text-teal-700 transition-colors font-medium"
        >
          Asup (Sign In)
        </button>
        <button 
          onClick={onSignUp}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium shadow-sm"
        >
          Daptar (Sign Up)
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex items-center gap-4">
      {/* User Stats */}
      <div className="hidden md:flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1 px-3 py-1 bg-yellow-100 rounded-full">
          <Trophy className="h-4 w-4 text-yellow-600" />
          <span className="font-semibold text-yellow-800">{progress?.totalXP || 0} XP</span>
        </div>
        <div className="flex items-center gap-1 px-3 py-1 bg-orange-100 rounded-full">
          <Calendar className="h-4 w-4 text-orange-600" />
          <span className="font-semibold text-orange-800">{progress?.currentStreak || 0} poé</span>
        </div>
      </div>

      {/* User Menu */}
      <div className="relative">
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center gap-3 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="hidden md:block text-left">
            <div className="text-sm text-gray-600">Sugeng rawuh,</div>
            <div className="font-semibold text-gray-900">{user.preferredName || user.username}</div>
          </div>
        </button>

        {/* Profile Dropdown */}
        {showProfileMenu && (
          <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 z-50">
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user.preferredName || user.username}</h3>
                  <p className="text-sm text-gray-500">Level {Math.floor((progress?.totalXP || 0) / 100) + 1} Learner</p>
                </div>
              </div>
            </div>

            <div className="p-2">
              <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <BarChart3 className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="font-medium text-gray-900">Learning Progress</div>
                  <div className="text-sm text-gray-500">View detailed analytics</div>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Target className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="font-medium text-gray-900">Learning Goals</div>
                  <div className="text-sm text-gray-500">Set and track goals</div>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Trophy className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="font-medium text-gray-900">Achievements</div>
                  <div className="text-sm text-gray-500">Badges and certificates</div>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Users className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="font-medium text-gray-900">Friends</div>
                  <div className="text-sm text-gray-500">Connect with other learners</div>
                </div>
              </button>

              <div className="border-t border-gray-100 my-2"></div>

              <button className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors">
                <Settings className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="font-medium text-gray-900">Settings</div>
                  <div className="text-sm text-gray-500">Preferences and privacy</div>
                </div>
              </button>

              <button 
                onClick={onSignOut}
                className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-red-50 rounded-lg transition-colors text-red-600"
              >
                <LogOut className="h-5 w-5" />
                <div>
                  <div className="font-medium">Sign Out</div>
                  <div className="text-sm opacity-75">Kaluar tina akun</div>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {showProfileMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowProfileMenu(false)}
        />
      )}
    </div>
  );
}
