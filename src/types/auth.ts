export interface UserProfile {
  id: string;
  username: string;
  preferredName?: string;
  createdAt: Date;
  
  // Learning preferences
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  learningGoals: string[];
  dailyGoalMinutes: number;
  
  // Privacy settings
  privacySettings: {
    shareProgress: boolean;
    allowFriends: boolean;
    publicProfile: boolean;
    dataRetention: '30days' | '1year' | 'indefinite';
  };
}

export interface LearningProgress {
  totalXP: number;
  currentStreak: number;
  longestStreak: number;
  completedModules: string[];
  currentModule?: string;
  averageQuizScore: number;
  wordsLearned: number;
  hoursStudied: number;
  favoriteTopics: string[];
  lastActivityDate: Date;
}

export interface Badge {
  id: string;
  name: string;
  nameInSundanese: string;
  description: string;
  icon: string;
  earnedDate: Date;
  category: 'vocabulary' | 'culture' | 'music' | 'pronunciation' | 'social' | 'achievement';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface LearningGoal {
  id: string;
  title: string;
  titleInSundanese: string;
  description: string;
  targetDate: Date;
  progress: number; // 0-100%
  type: 'vocabulary' | 'module' | 'skill' | 'cultural' | 'daily';
  isCompleted: boolean;
  createdDate: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: 'en' | 'id' | 'su'; // English, Indonesian, Sundanese
  audioAutoplay: boolean;
  reminderEnabled: boolean;
  reminderTime?: string;
  studyDays: string[];
  preferredLearningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
}

export interface Friend {
  id: string;
  username: string;
  isOnline: boolean;
  totalXP: number;
  currentStreak: number;
  mutualFriend: boolean;
  friendSince: Date;
}

export interface Achievement {
  id: string;
  name: string;
  nameInSundanese: string;
  description: string;
  icon: string;
  unlockedDate: Date;
  category: string;
  points: number;
}

// Auth-related types
export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  progress: LearningProgress | null;
  preferences: UserPreferences;
}

export interface SignUpData {
  username: string;
  password: string;
  preferredName?: string;
  learningGoals: string[];
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
}

export interface SignInData {
  username: string;
  password: string;
  rememberMe?: boolean;
}
