'use client';

import React, { useState, useEffect } from 'react';
import { Trophy, Star, Target, Calendar, Award } from 'lucide-react';
import { useAuth } from './AuthProvider';

export function ProgressTracker() {
  const { user, progress, updateProgress } = useAuth();
  const [showXPGain, setShowXPGain] = useState(false);
  const [xpGained, setXpGained] = useState(0);

  // Function to award XP for completing actions
  const awardXP = (amount: number, action: string) => {
    if (!progress) return;

    setXpGained(amount);
    setShowXPGain(true);
    
    // Update progress
    updateProgress({
      totalXP: progress.totalXP + amount,
      wordsLearned: action === 'vocabulary' ? progress.wordsLearned + 1 : progress.wordsLearned,
      hoursStudied: action === 'lesson' ? progress.hoursStudied + 0.5 : progress.hoursStudied,
      lastActivityDate: new Date()
    });

    // Hide XP notification after 3 seconds
    setTimeout(() => {
      setShowXPGain(false);
      setXpGained(0);
    }, 3000);
  };

  if (!user || !progress) return null;

  return (
    <div className="relative">
      {/* XP Gain Animation */}
      {showXPGain && (
        <div className="fixed top-20 right-4 z-50 animate-bounce">
          <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <Star className="h-5 w-5 text-white" />
            <span className="font-bold">+{xpGained} XP!</span>
          </div>
        </div>
      )}

      {/* Progress Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-600" />
          Learning Progress
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{progress.totalXP}</div>
            <div className="text-sm text-gray-600">Total XP</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{progress.currentStreak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{progress.wordsLearned}</div>
            <div className="text-sm text-gray-600">Words Learned</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{Math.round(progress.hoursStudied * 10) / 10}h</div>
            <div className="text-sm text-gray-600">Time Studied</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Level {Math.floor(progress.totalXP / 100) + 1}</span>
            <span>{progress.totalXP % 100}/100 XP</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-teal-500 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(progress.totalXP % 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Completed Modules */}
        {progress.completedModules && progress.completedModules.length > 0 && (
          <div className="mt-4">
            <div className="text-sm text-gray-600 mb-2">Completed Modules</div>
            <div className="flex flex-wrap gap-1">
              {progress.completedModules.map((module, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                >
                  {module}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Learning Goals */}
        {user.learningGoals && user.learningGoals.length > 0 && (
          <div className="mt-4">
            <div className="text-sm text-gray-600 mb-2 flex items-center gap-1">
              <Target className="h-4 w-4" />
              Learning Goals
            </div>
            <div className="space-y-2">
              {user.learningGoals.slice(0, 3).map((goal, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">{goal}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Achievement Notification */}
      {progress.totalXP > 0 && progress.totalXP % 100 === 0 && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-xl shadow-2xl text-center animate-pulse">
            <Award className="h-12 w-12 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">Level Up!</h3>
            <p>You've reached Level {Math.floor(progress.totalXP / 100) + 1}!</p>
          </div>
        </div>
      )}
    </div>
  );
}
