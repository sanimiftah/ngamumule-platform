'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, LearningProgress, UserPreferences } from '@/types/auth';

interface CustomAuthState {
  isAuthenticated: boolean;
  isGuest: boolean;
  isLoading: boolean;
}

interface AuthContextType {
  authState: CustomAuthState;
  user: UserProfile | null;
  progress: LearningProgress | null;
  isGuest: boolean;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signUp: (credentials: { 
    email: string; 
    username?: string; 
    password: string; 
    preferredName?: string; 
    goals?: string[] 
  }) => Promise<void>;
  signOut: () => void;
  continueAsGuest: () => void;
  updateProgress: (progress: Partial<LearningProgress>) => void;
  convertGuestToUser: (credentials: { 
    email: string; 
    password: string; 
    preferredName?: string; 
    goals?: string[] 
  }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<CustomAuthState>({
    isAuthenticated: false,
    isGuest: false,
    isLoading: true
  });
  
  const [user, setUser] = useState<UserProfile | null>(null);
  const [progress, setProgress] = useState<LearningProgress | null>(null);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem('ngamumule_user');
        const storedProgress = localStorage.getItem('ngamumule_progress');
        const isGuest = localStorage.getItem('ngamumule_guest') === 'true';
        
        if (storedUser && !isGuest) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setAuthState({
            isAuthenticated: true,
            isGuest: false,
            isLoading: false
          });
        } else if (isGuest) {
          setAuthState({
            isAuthenticated: false,
            isGuest: true,
            isLoading: false
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            isGuest: false,
            isLoading: false
          });
        }

        if (storedProgress) {
          setProgress(JSON.parse(storedProgress));
        } else {
          // Initialize empty progress
          const defaultProgress: LearningProgress = {
            totalXP: 0,
            currentStreak: 0,
            longestStreak: 0,
            completedModules: [],
            averageQuizScore: 0,
            wordsLearned: 0,
            hoursStudied: 0,
            favoriteTopics: [],
            lastActivityDate: new Date()
          };
          setProgress(defaultProgress);
          localStorage.setItem('ngamumule_progress', JSON.stringify(defaultProgress));
        }
      } catch (error) {
        console.error('Error initializing auth state:', error);
        setAuthState({
          isAuthenticated: false,
          isGuest: false,
          isLoading: false
        });
      }
    };

    initializeAuth();
  }, []);

  const signIn = async (credentials: { email: string; password: string }) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simulate API call - in real app, this would be an actual API request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data - in real app, this would come from API
      const userData: UserProfile = {
        id: 'user-' + Date.now(),
        username: credentials.email.split('@')[0],
        preferredName: credentials.email.split('@')[0],
        createdAt: new Date(),
        difficultyLevel: 'beginner',
        learningGoals: [],
        dailyGoalMinutes: 30,
        privacySettings: {
          shareProgress: true,
          allowFriends: true,
          publicProfile: false,
          dataRetention: '1year'
        }
      };

      setUser(userData);
      setAuthState({
        isAuthenticated: true,
        isGuest: false,
        isLoading: false
      });

      localStorage.setItem('ngamumule_user', JSON.stringify(userData));
      localStorage.removeItem('ngamumule_guest');
      
    } catch (error) {
      console.error('Sign in error:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const signUp = async (credentials: { 
    email: string; 
    username?: string; 
    password: string; 
    preferredName?: string; 
    goals?: string[] 
  }) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData: UserProfile = {
        id: 'user-' + Date.now(),
        username: credentials.username || credentials.email.split('@')[0],
        preferredName: credentials.preferredName || credentials.username || credentials.email.split('@')[0],
        createdAt: new Date(),
        difficultyLevel: 'beginner',
        learningGoals: credentials.goals || [],
        dailyGoalMinutes: 30,
        privacySettings: {
          shareProgress: true,
          allowFriends: true,
          publicProfile: false,
          dataRetention: '1year'
        }
      };

      setUser(userData);
      setAuthState({
        isAuthenticated: true,
        isGuest: false,
        isLoading: false
      });

      localStorage.setItem('ngamumule_user', JSON.stringify(userData));
      localStorage.removeItem('ngamumule_guest');
      
    } catch (error) {
      console.error('Sign up error:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    setAuthState({
      isAuthenticated: false,
      isGuest: false,
      isLoading: false
    });
    
    localStorage.removeItem('ngamumule_user');
    localStorage.removeItem('ngamumule_guest');
    // Keep progress for potential account creation later
  };

  const continueAsGuest = () => {
    setAuthState({
      isAuthenticated: false,
      isGuest: true,
      isLoading: false
    });
    
    localStorage.setItem('ngamumule_guest', 'true');
    localStorage.removeItem('ngamumule_user');
  };

  const updateProgress = (newProgress: Partial<LearningProgress>) => {
    setProgress(prev => {
      if (!prev) return null;
      
      const updated = { ...prev, ...newProgress };
      localStorage.setItem('ngamumule_progress', JSON.stringify(updated));
      return updated;
    });
  };

  const convertGuestToUser = async (credentials: { 
    email: string; 
    password: string; 
    preferredName?: string; 
    goals?: string[] 
  }) => {
    // Convert guest progress to user account
    await signUp(credentials);
    // Guest progress is already preserved in localStorage
  };

  const value: AuthContextType = {
    authState,
    user,
    progress,
    isGuest: authState.isGuest,
    signIn,
    signUp,
    signOut,
    continueAsGuest,
    updateProgress,
    convertGuestToUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
