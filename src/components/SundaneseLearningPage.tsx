'use client';

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Music, 
  MapPin, 
  Users, 
  Clock, 
  Volume2, 
  Play,
  ChevronRight,
  Mountain,
  Heart,
  Star,
  Award,
  Trophy,
  Headphones,
  Camera,
  Download,
  Share2,
  Bookmark,
  Eye,
  Mic,
  Video,
  FileText,
  Calendar,
  Zap,
  CheckCircle,
  Lock,
  PlayCircle,
  Pause,
  SkipForward,
  Target,
  Globe,
  BookmarkPlus,
  MessageCircle,
  PenTool,
  Lightbulb,
  Search,
  Filter,
  Grid,
  List,
  X,
  Brain,
  Puzzle,
  Timer,
  Hash,
  Image as ImageIcon,
  UtensilsCrossed,
  Palette,
  BarChart3,
  ShoppingCart,
  Home,
  Briefcase,
  TrendingUp,
  Settings,
  Sparkles
} from 'lucide-react';
import { useAuth } from './AuthProvider';
import { AuthHeader } from './AuthHeader';
import { AuthModal } from './AuthModal';
import { sundaneseBasicsLessons, DetailedLesson } from '@/lib/sundanese-basics-lessons';
import { LessonViewer } from './LessonViewer';
import { hasRealAudio, generateAudioPath, getAudioStats } from '@/lib/vocabulary-audio';

interface LearningModule {
  id: string;
  title: string;
  titleSunda: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  lessons: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'language' | 'culture' | 'arts' | 'history';
  estimatedTime: string;
  isLocked?: boolean;
  prerequisites?: string[];
}

interface Lesson {
  id: string;
  title: string;
  titleSunda: string;
  duration: string;
  type: 'video' | 'audio' | 'interactive' | 'reading';
  isCompleted: boolean;
  isUnlocked: boolean;
}

interface VocabularyItem {
  sunda: string;
  english: string;
  pronunciation: string;
  example: string;
  audio?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

interface MediaItem {
  id: string;
  title: string;
  titleSunda: string;
  type: 'audio' | 'video' | 'podcast';
  duration: string;
  difficulty: string;
  description: string;
  thumbnail?: string;
  category: string;
  plays: number;
}

interface CulturalContent {
  id: string;
  title: string;
  titleSunda: string;
  type: 'instrument' | 'song' | 'story' | 'landmark' | 'tradition';
  description: string;
  audioAvailable: boolean;
  difficulty: string;
  audioSample?: {
    name: string;
    duration: string;
    description: string;
    sampleText?: string; // For songs, includes lyrics or key phrases
    audioFile?: string; // Path to actual audio file
    fallbackText?: string; // Text-to-speech fallback if audio file not available
  };
}

// Module Detail View Component
function ModuleDetailView({ module, lessons, onBack, onLessonSelect }: { 
  module: LearningModule; 
  lessons: Lesson[]; 
  onBack: () => void;
  onLessonSelect: (lesson: DetailedLesson) => void;
}) {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  // Get detailed lessons for Sundanese Basics module
  const getDetailedLessons = () => {
    if (module.id === 'basics') {
      return sundaneseBasicsLessons.map((detailedLesson, index) => ({
        id: detailedLesson.id,
        title: detailedLesson.title,
        titleSunda: detailedLesson.titleSunda,
        duration: detailedLesson.duration,
        type: detailedLesson.type,
        isCompleted: false, // You can track this in state
        isUnlocked: index === 0 || index <= 2 // First 3 lessons unlocked for demo
      }));
    }
    return lessons;
  };

  const detailedLessons = getDetailedLessons();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'audio': return <Volume2 className="h-4 w-4" />;
      case 'interactive': return <Zap className="h-4 w-4" />;
      case 'reading': return <BookOpen className="h-4 w-4" />;
      case 'practice': return <Target className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-sky-100 text-sky-600';
      case 'audio': return 'bg-emerald-100 text-emerald-600';
      case 'interactive': return 'bg-teal-100 text-teal-600';
      case 'reading': return 'bg-slate-100 text-slate-600';
      case 'practice': return 'bg-amber-100 text-amber-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const handleLessonClick = (lessonId: string) => {
    if (module.id === 'basics') {
      const detailedLesson = sundaneseBasicsLessons.find(l => l.id === lessonId);
      if (detailedLesson) {
        onLessonSelect(detailedLesson);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={onBack}
          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <ChevronRight className="h-5 w-5 rotate-180" />
        </button>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-teal-100 rounded-lg">
            {module.icon}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{module.title}</h2>
            <p className="text-teal-600 font-medium">{module.titleSunda}</p>
          </div>
        </div>
      </div>

      {/* Enhanced Module Overview */}
      <div className="bg-gradient-to-r from-slate-600 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{detailedLessons.length}</div>
            <div className="text-slate-200 text-sm">Total Lessons</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{module.estimatedTime}</div>
            <div className="text-slate-200 text-sm">Est. Duration</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{module.progress}%</div>
            <div className="text-slate-200 text-sm">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{detailedLessons.filter(l => l.isCompleted).length}</div>
            <div className="text-slate-200 text-sm">Lessons Done</div>
          </div>
        </div>

        <p className="text-slate-100 mb-6 leading-relaxed">{module.description}</p>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-slate-200 mb-2">
            <span>Module Progress</span>
            <span>{module.progress}%</span>
          </div>
          <div className="w-full bg-slate-400 bg-opacity-30 rounded-full h-3">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-300"
              style={{ width: `${module.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Prerequisites */}
        {module.prerequisites && module.prerequisites.length > 0 && (
          <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-slate-200 text-sm mb-2">Prerequisites completed:</p>
            <div className="flex flex-wrap gap-2">
              {module.prerequisites.map(prereq => (
                <span key={prereq} className="px-3 py-1 bg-emerald-500 bg-opacity-20 border border-emerald-300 text-emerald-100 rounded-lg text-sm">
                  ✓ {prereq}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detailed Lessons List */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Lessons</h3>
          {module.id === 'basics' && (
            <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-lg text-sm font-medium">
              📚 Comprehensive Content Available
            </span>
          )}
        </div>
        
        <div className="space-y-4">
          {detailedLessons.map((lesson, index) => {
            const isDetailedLesson = module.id === 'basics' && sundaneseBasicsLessons.find(l => l.id === lesson.id);
            
            return (
              <div 
                key={lesson.id}
                className={`p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                  lesson.isUnlocked 
                    ? 'border-gray-200 hover:border-teal-300 hover:shadow-md' 
                    : 'border-gray-100 opacity-50 cursor-not-allowed'
                } ${lesson.isCompleted ? 'bg-emerald-50 border-emerald-200' : 'bg-white'}`}
                onClick={() => lesson.isUnlocked && handleLessonClick(lesson.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                        lesson.isCompleted ? 'bg-emerald-500 text-white' : 
                        lesson.isUnlocked ? 'bg-teal-100 text-teal-600' : 'bg-gray-200 text-gray-400'
                      }`}>
                        {lesson.isCompleted ? <CheckCircle className="h-5 w-5" /> : index + 1}
                      </div>
                      <div className={`p-3 rounded-lg ${getTypeColor(lesson.type)}`}>
                        {getTypeIcon(lesson.type)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{lesson.title}</h4>
                      <p className="text-sm text-teal-600 mb-2">{lesson.titleSunda}</p>
                      
                      {/* Enhanced description for detailed lessons */}
                      {isDetailedLesson && (
                        <p className="text-sm text-gray-600 mb-2">
                          {sundaneseBasicsLessons.find(l => l.id === lesson.id)?.description}
                        </p>
                      )}
                      
                      {/* Learning objectives preview */}
                      {isDetailedLesson && (
                        <div className="text-xs text-gray-500">
                          {sundaneseBasicsLessons.find(l => l.id === lesson.id)?.objectives.length} learning objectives
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {lesson.duration}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(lesson.type)}`}>
                      {lesson.type}
                    </span>
                    {lesson.isUnlocked ? (
                      lesson.isCompleted ? (
                        <button className="px-4 py-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-colors font-medium">
                          Review
                        </button>
                      ) : (
                        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 font-medium">
                          {isDetailedLesson ? 'Study' : 'Start'}
                          <Play className="h-4 w-4" />
                        </button>
                      )
                    ) : (
                      <Lock className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Expanded lesson preview when selected */}
                {selectedLesson === lesson.id && isDetailedLesson && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">What you&apos;ll learn:</h5>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {sundaneseBasicsLessons.find(l => l.id === lesson.id)?.objectives.slice(0, 3).map((objective, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Target className="h-3 w-3 text-teal-500 mt-1 flex-shrink-0" />
                              {objective}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Lesson includes:</h5>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded text-xs">
                            {sundaneseBasicsLessons.find(l => l.id === lesson.id)?.content.vocabulary.length} vocabulary words
                          </span>
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">
                            {sundaneseBasicsLessons.find(l => l.id === lesson.id)?.content.culturalNotes.length} cultural insights
                          </span>
                          <span className="px-2 py-1 bg-sky-100 text-sky-700 rounded text-xs">
                            {sundaneseBasicsLessons.find(l => l.id === lesson.id)?.content.exercises.length} practice exercises
                          </span>
                          {(sundaneseBasicsLessons.find(l => l.id === lesson.id)?.audioFiles?.length ?? 0) > 0 && (
                            <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs">
                              Audio included
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        const detailedLesson = sundaneseBasicsLessons.find(dl => dl.id === lesson.id);
                        if (detailedLesson) {
                          onLessonSelect(detailedLesson);
                        }
                      }}
                      className="mt-4 w-full py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all font-medium flex items-center justify-center gap-2"
                    >
                      <BookOpen className="h-5 w-5" />
                      Start Complete Lesson
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Module completion message */}
        {module.id === 'basics' && (
          <div className="mt-6 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-6 border border-teal-200">
            <div className="flex items-center gap-3 mb-3">
              <Award className="h-6 w-6 text-teal-600" />
              <h4 className="font-bold text-gray-900">Complete Learning Experience</h4>
            </div>
            <p className="text-gray-700 mb-4">
              This module features comprehensive lessons with detailed vocabulary, cultural insights, 
              interactive exercises, and audio pronunciation guides. Perfect for building a strong 
              foundation in Sundanese language and culture.
            </p>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-1 text-teal-600">
                <BookOpen className="h-4 w-4" />
                Rich Content
              </span>
              <span className="flex items-center gap-1 text-emerald-600">
                <Volume2 className="h-4 w-4" />
                Audio Guides
              </span>
              <span className="flex items-center gap-1 text-sky-600">
                <Users className="h-4 w-4" />
                Cultural Context
              </span>
              <span className="flex items-center gap-1 text-amber-600">
                <Target className="h-4 w-4" />
                Practice Exercises
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function SundaneseLearningPage() {
  // Authentication state
  const { user, progress, signIn, signUp, signOut, continueAsGuest, updateProgress } = useAuth();
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | null>(null);

  // Audio player state
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);

  // Audio files mapping
  const audioFiles = {
    'Kacapi Suling': '/audio/instruments/kacapi/Kecapi.mp3',
    'Angklung Melodies': '/audio/instruments/angklung/Angklung.mp3', 
    'Kendang Rhythms': '/audio/instruments/kendang/Kendang.mp3',
    'Gamelan Degung': '/audio/instruments/gamelan-degung/Gamelan-degung.mp3',
    'Suling Flute': '/audio/instruments/suling/Suling.mp3',
    'Rebab Strings': '/audio/instruments/rebab/Rebab.mp3',
    'Bonang Melodies': '/audio/instruments/bonang/Bonang.mp3'
  };

  // Instrument-to-audio mapping for cultural items
  const instrumentAudioMap: Record<string, string> = {
    'angklung': '/audio/instruments/angklung/Angklung.mp3',
    'kacapi-suling': '/audio/instruments/kacapi/Kecapi.mp3',
    'kendang': '/audio/instruments/kendang/Kendang.mp3',
    'gamelan-degung': '/audio/instruments/gamelan-degung/Gamelan-degung.mp3',
    'suling': '/audio/instruments/suling/Suling.mp3',
    'rebab': '/audio/instruments/rebab/Rebab.mp3',
    'bonang': '/audio/instruments/bonang/Bonang.mp3'
  };

  // Audio player functions
  const playAudio = (trackName: string) => {
    const audioPath = audioFiles[trackName as keyof typeof audioFiles];
    if (!audioPath) return;

    // Stop current audio if playing
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // Create new audio instance
    const audio = new Audio(audioPath);
    audio.onended = () => {
      setIsPlaying(false);
      setCurrentTrack(null);
    };
    
    audio.onerror = () => {
      console.error(`Error loading audio: ${audioPath}`);
      setIsPlaying(false);
      setCurrentTrack(null);
    };

    setCurrentAudio(audio);
    setCurrentTrack(trackName);
    setIsPlaying(true);
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
      setCurrentTrack(null);
    });
  };

  const pauseAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setIsPlaying(false);
      setCurrentTrack(null);
    }
  };

  // Check if audio file exists for an instrument
  const hasAudioFile = (itemId: string, itemType: string): boolean => {
    if (itemType === 'instrument') {
      return instrumentAudioMap.hasOwnProperty(itemId);
    }
    return false;
  };

  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'culture' | 'media' | 'practice' | 'dictionary' | 'games' | 'quiz' | 'conversation'>('overview');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<DetailedLesson | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [showLessonDetails, setShowLessonDetails] = useState<string | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Dictionary search states
  const [dictionarySearchQuery, setDictionarySearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedPronunciation, setExpandedPronunciation] = useState<string | null>(null);
  
  // AI Challenge states
  const [currentChallenge, setCurrentChallenge] = useState<any>(null);
  const [challengeProgress, setChallengeProgress] = useState(0);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [challengeMessages, setChallengeMessages] = useState<any[]>([]);
  const [userInput, setUserInput] = useState('');
  const [challengeScore, setChallengeScore] = useState(0);
  const [dailyStreak, setDailyStreak] = useState(7);
  const [totalXP, setTotalXP] = useState(1250);
  
  // Quiz states
  const [activeQuizCategory, setActiveQuizCategory] = useState<string | null>(null);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState<number>(0);
  const [earnedBadges, setEarnedBadges] = useState<string[]>(['Music Expert', 'Food Lover', 'Historian']);
  const [searchFilters, setSearchFilters] = useState({
    includeEtymology: true,
    showCulturalContext: true,
    audioOnly: false
  });

  // Vocabulary Games states
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [gameLevel, setGameLevel] = useState<string>('easy');
  const [currentGameQuestion, setCurrentGameQuestion] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [gameAnswers, setGameAnswers] = useState<any[]>([]);
  const [gameTimeLeft, setGameTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showGameResult, setShowGameResult] = useState(false);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [flashcardSide, setFlashcardSide] = useState<'front' | 'back'>('front');
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [gameWordsLearned, setGameWordsLearned] = useState<string[]>([]);

  // Cleanup audio on component unmount
  useEffect(() => {
    return () => {
      // Cleanup main audio player
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      // Cleanup cultural audio player
      if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      }
      // Cleanup speech synthesis
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentAudio, audioPlayer]);

  // Authentication handlers
  const handleSignIn = () => {
    setAuthMode('signin');
    setShowAuthModal(true);
  };

  const handleSignUp = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleAuth = async (credentials: any) => {
    try {
      if (authMode === 'signin') {
        await signIn(credentials);
      } else if (authMode === 'signup') {
        await signUp(credentials);
      }
      setShowAuthModal(false);
      setAuthMode(null);
    } catch (error) {
      console.error('Authentication error:', error);
      // Handle error (show toast, etc.)
    }
  };

  const handleGuestContinue = () => {
    continueAsGuest();
    setShowAuthModal(false);
    setAuthMode(null);
  };

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
    setAuthMode(null);
  };

  const handleModeChange = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
  };

  // Quiz Functions
  const startQuiz = (category: string) => {
    setActiveQuizCategory(category);
    setCurrentQuizQuestion(0);
    setQuizScore(0);
    setQuizAnswers([]);
    setSelectedAnswer(null);
    setShowQuizResult(false);
    setQuizCompleted(false);
    setShowExplanation(false);
    setQuizStartTime(Date.now());
  };

  const handleQuizAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null || !activeQuizCategory) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    const category = quizCategories[activeQuizCategory as keyof typeof quizCategories];
    const currentQuestion = category.questions[currentQuizQuestion];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    // Update answers and score
    const newAnswers = [...quizAnswers, answerIndex];
    setQuizAnswers(newAnswers);
    
    if (isCorrect) {
      const timeBonus = Math.max(0, 10 - Math.floor((Date.now() - quizStartTime) / 1000));
      const points = currentQuestion.points + timeBonus;
      setQuizScore(prev => prev + points);
    }
    
    // Auto-advance after showing explanation
    setTimeout(() => {
      if (currentQuizQuestion + 1 < category.questions.length) {
        setCurrentQuizQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setQuizStartTime(Date.now());
      } else {
        completeQuiz(newAnswers);
      }
    }, 3000);
  };

  const completeQuiz = (answers: number[]) => {
    setQuizCompleted(true);
    setShowQuizResult(true);
    
    if (!activeQuizCategory) return;
    
    const category = quizCategories[activeQuizCategory as keyof typeof quizCategories];
    const correctAnswers = answers.filter((answer, index) => 
      answer === category.questions[index].correctAnswer
    ).length;
    
    const percentage = (correctAnswers / category.questions.length) * 100;
    const xpEarned = Math.floor(quizScore * 0.5);
    
    // Award badges based on performance
    if (percentage >= 80 && !earnedBadges.includes(`${category.name} Master`)) {
      setEarnedBadges(prev => [...prev, `${category.name} Master`]);
    }
    
    // Update total XP
    setTotalXP(prev => prev + xpEarned);
    
    // Update streak if perfect score
    if (percentage === 100) {
      setDailyStreak(prev => prev + 1);
    }
  };

  const resetQuiz = () => {
    setActiveQuizCategory(null);
    setCurrentQuizQuestion(0);
    setQuizScore(0);
    setQuizAnswers([]);
    setSelectedAnswer(null);
    setShowQuizResult(false);
    setQuizCompleted(false);
    setShowExplanation(false);
    setQuizStartTime(0);
  };

  const getQuizCategoryColor = (color: string) => {
    const colors = {
      yellow: 'from-yellow-50 to-amber-50 border-yellow-200',
      orange: 'from-orange-50 to-red-50 border-orange-200',
      purple: 'from-purple-50 to-indigo-50 border-purple-200',
      pink: 'from-pink-50 to-rose-50 border-pink-200'
    };
    return colors[color as keyof typeof colors] || colors.yellow;
  };

  const getQuizButtonColor = (color: string) => {
    const colors = {
      yellow: 'bg-yellow-500 hover:bg-yellow-600',
      orange: 'bg-orange-500 hover:bg-orange-600', 
      purple: 'bg-purple-500 hover:bg-purple-600',
      pink: 'bg-pink-500 hover:bg-pink-600'
    };
    return colors[color as keyof typeof colors] || colors.yellow;
  };

  // Vocabulary Games Data
  const vocabularyGameData = {
    basic: [
      { id: 1, sunda: 'Wilujeng', english: 'Welcome', category: 'Greetings', pronunciation: '/wi.lu.jəŋ/', image: '👋' },
      { id: 2, sunda: 'Hatur nuhun', english: 'Thank you', category: 'Greetings', pronunciation: '/ha.tur nu.hun/', image: '🙏' },
      { id: 3, sunda: 'Kumaha damang?', english: 'How are you?', category: 'Greetings', pronunciation: '/ku.ma.ha da.maŋ/', image: '❓' },
      { id: 4, sunda: 'Bapa', english: 'Father', category: 'Family', pronunciation: '/ba.pa/', image: '👨' },
      { id: 5, sunda: 'Indung', english: 'Mother', category: 'Family', pronunciation: '/in.duŋ/', image: '👩' },
      { id: 6, sunda: 'Adi', english: 'Younger sibling', category: 'Family', pronunciation: '/a.di/', image: '👶' },
      { id: 7, sunda: 'Akang', english: 'Older brother', category: 'Family', pronunciation: '/a.kaŋ/', image: '👦' },
      { id: 8, sunda: 'Teteh', english: 'Older sister', category: 'Family', pronunciation: '/tə.təh/', image: '👧' },
      { id: 9, sunda: 'Bumi', english: 'Home', category: 'Places', pronunciation: '/bu.mi/', image: '🏠' },
      { id: 10, sunda: 'Sakola', english: 'School', category: 'Places', pronunciation: '/sa.ko.la/', image: '🏫' }
    ],
    food: [
      { id: 11, sunda: 'Nasi', english: 'Rice', category: 'Food', pronunciation: '/na.si/', image: '🍚' },
      { id: 12, sunda: 'Karedok', english: 'Raw vegetable salad', category: 'Food', pronunciation: '/ka.rə.doʔ/', image: '🥗' },
      { id: 13, sunda: 'Lotek', english: 'Mixed vegetables', category: 'Food', pronunciation: '/lo.təʔ/', image: '🥬' },
      { id: 14, sunda: 'Peuyeum', english: 'Fermented cassava', category: 'Food', pronunciation: '/pəy.jəm/', image: '🍠' },
      { id: 15, sunda: 'Bandrek', english: 'Hot ginger drink', category: 'Food', pronunciation: '/ban.drəʔ/', image: '☕' },
      { id: 16, sunda: 'Gado-gado', english: 'Mixed salad', category: 'Food', pronunciation: '/ga.do ga.do/', image: '🥙' },
      { id: 17, sunda: 'Bakso', english: 'Meatball soup', category: 'Food', pronunciation: '/bak.so/', image: '🍲' },
      { id: 18, sunda: 'Es cendol', english: 'Iced dessert', category: 'Food', pronunciation: '/əs cən.dol/', image: '🍧' },
      { id: 19, sunda: 'Tahu', english: 'Tofu', category: 'Food', pronunciation: '/ta.hu/', image: '🧈' },
      { id: 20, sunda: 'Tempe', english: 'Fermented soybeans', category: 'Food', pronunciation: '/təm.pe/', image: '🍘' }
    ],
    nature: [
      { id: 21, sunda: 'Gunung', english: 'Mountain', category: 'Nature', pronunciation: '/gu.nuŋ/', image: '⛰️' },
      { id: 22, sunda: 'Laut', english: 'Ocean', category: 'Nature', pronunciation: '/la.ut/', image: '🌊' },
      { id: 23, sunda: 'Hutan', english: 'Forest', category: 'Nature', pronunciation: '/hu.tan/', image: '🌲' },
      { id: 24, sunda: 'Kembang', english: 'Flower', category: 'Nature', pronunciation: '/kəm.baŋ/', image: '🌸' },
      { id: 25, sunda: 'Tangkal', english: 'Tree', category: 'Nature', pronunciation: '/taŋ.kal/', image: '🌳' },
      { id: 26, sunda: 'Cai', english: 'Water', category: 'Nature', pronunciation: '/ca.i/', image: '💧' },
      { id: 27, sunda: 'Panonpoé', english: 'Sun', category: 'Nature', pronunciation: '/pa.non.po.e/', image: '☀️' },
      { id: 28, sunda: 'Bulan', english: 'Moon', category: 'Nature', pronunciation: '/bu.lan/', image: '🌙' },
      { id: 29, sunda: 'Béntang', english: 'Star', category: 'Nature', pronunciation: '/ben.taŋ/', image: '⭐' },
      { id: 30, sunda: 'Hujan', english: 'Rain', category: 'Nature', pronunciation: '/hu.jan/', image: '🌧️' }
    ]
  };

  // Vocabulary Games Functions
  const startGame = (gameType: string, level: string = 'easy') => {
    setActiveGame(gameType);
    setGameLevel(level);
    setCurrentGameQuestion(0);
    setGameScore(0);
    setGameAnswers([]);
    setGameStarted(true);
    setGameCompleted(false);
    setShowGameResult(false);
    setSelectedCards([]);
    setMatchedPairs([]);
    setFlashcardSide('front');
    setCurrentFlashcard(0);
    
    // Set timer based on game type and level
    if (gameType === 'speed') {
      const timeMap = { easy: 30, medium: 120, hard: 300 };
      setGameTimeLeft(timeMap[level as keyof typeof timeMap] || 30);
    }
  };

  const resetGame = () => {
    setActiveGame(null);
    setGameLevel('easy');
    setCurrentGameQuestion(0);
    setGameScore(0);
    setGameAnswers([]);
    setGameStarted(false);
    setGameCompleted(false);
    setShowGameResult(false);
    setGameTimeLeft(30);
    setSelectedCards([]);
    setMatchedPairs([]);
    setFlashcardSide('front');
    setCurrentFlashcard(0);
  };

  const handleGameAnswer = (answer: any) => {
    const newAnswers = [...gameAnswers, answer];
    setGameAnswers(newAnswers);
    
    // Check if answer is correct and update score
    const currentData = getCurrentGameData();
    if (activeGame === 'speed' && answer.correct) {
      setGameScore(prev => prev + 10);
    }
    
    // Move to next question or complete game
    if (currentGameQuestion + 1 < currentData.length) {
      setCurrentGameQuestion(prev => prev + 1);
    } else {
      completeGame();
    }
  };

  const completeGame = () => {
    setGameCompleted(true);
    setShowGameResult(true);
    setGameStarted(false);
    
    // Award XP and badges
    const xpEarned = Math.floor(gameScore * 0.3);
    setTotalXP(prev => prev + xpEarned);
    
    // Check for new badges
    if (gameScore >= 80 && !earnedBadges.includes('Vocabulary Master')) {
      setEarnedBadges(prev => [...prev, 'Vocabulary Master']);
    }
  };

  const getCurrentGameData = () => {
    const allData = [...vocabularyGameData.basic, ...vocabularyGameData.food, ...vocabularyGameData.nature];
    const levelMap = {
      easy: allData.slice(0, 6),
      medium: allData.slice(0, 10),
      hard: allData.slice(0, 15)
    };
    return levelMap[gameLevel as keyof typeof levelMap] || levelMap.easy;
  };

  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const generateMatchingPairs = () => {
    const data = getCurrentGameData();
    const pairs = [];
    
    for (const item of data) {
      pairs.push({ id: item.id * 2, content: item.sunda, type: 'sunda', matchId: item.id });
      pairs.push({ id: item.id * 2 + 1, content: item.english, type: 'english', matchId: item.id });
    }
    
    return shuffleArray(pairs);
  };

  const handleCardClick = (cardId: number) => {
    if (selectedCards.length === 2 || selectedCards.includes(cardId) || matchedPairs.includes(cardId)) {
      return;
    }
    
    const newSelected = [...selectedCards, cardId];
    setSelectedCards(newSelected);
    
    if (newSelected.length === 2) {
      const pairs = generateMatchingPairs();
      const card1 = pairs.find(p => p.id === newSelected[0]);
      const card2 = pairs.find(p => p.id === newSelected[1]);
      
      if (card1 && card2 && card1.matchId === card2.matchId) {
        // Match found!
        setMatchedPairs(prev => [...prev, ...newSelected]);
        setGameScore(prev => prev + 20);
        setSelectedCards([]);
        
        // Check if game is complete
        if (matchedPairs.length + 2 >= pairs.length) {
          setTimeout(completeGame, 500);
        }
      } else {
        // No match, reset after delay
        setTimeout(() => setSelectedCards([]), 1000);
      }
    }
  };

  const nextFlashcard = () => {
    const data = getCurrentGameData();
    if (currentFlashcard < data.length - 1) {
      setCurrentFlashcard(prev => prev + 1);
      setFlashcardSide('front');
    } else {
      completeGame();
    }
  };

  const prevFlashcard = () => {
    if (currentFlashcard > 0) {
      setCurrentFlashcard(prev => prev - 1);
      setFlashcardSide('front');
    }
  };

  const flipFlashcard = () => {
    setFlashcardSide(prev => prev === 'front' ? 'back' : 'front');
  };

  const markWordLearned = (word: string) => {
    if (!gameWordsLearned.includes(word)) {
      setGameWordsLearned(prev => [...prev, word]);
      setGameScore(prev => prev + 5);
    }
  };

  // Search functionality for dictionary
  const createComprehensiveDictionary = () => {
    return [
      // Daily Greetings
      { id: 1, sunda: 'Wilujeng enjing', english: 'Good morning', category: 'Greetings', pronunciation: '/wi.lu.jəŋ ən.jiŋ/', 
        definition: 'Traditional morning greeting used from 5-10 AM', example: 'Wilujeng enjing, kumaha damang?', 
        exampleTranslation: 'Good morning, how are you?', audioAvailable: true, difficulty: 'beginner' },
      { id: 2, sunda: 'Wilujeng wengi', english: 'Good night', category: 'Greetings', pronunciation: '/wi.lu.jəŋ wə.ŋi/', 
        definition: 'Evening/night greeting used after 9 PM', example: 'Wilujeng wengi, hade istirahat', 
        exampleTranslation: 'Good night, have a good rest', audioAvailable: true, difficulty: 'beginner' },
      { id: 3, sunda: 'Kumaha damang?', english: 'How are you?', category: 'Greetings', pronunciation: '/ku.ma.ha da.maŋ/', 
        definition: 'Common greeting to ask about wellbeing', example: 'Kumaha damang? Damang waé', 
        exampleTranslation: 'How are you? I am fine', audioAvailable: true, difficulty: 'beginner' },
      { id: 4, sunda: 'Hatur nuhun', english: 'Thank you', category: 'Greetings', pronunciation: '/ha.tur nu.hun/', 
        definition: 'Polite expression of gratitude', example: 'Hatur nuhun pisan', 
        exampleTranslation: 'Thank you very much', audioAvailable: true, difficulty: 'beginner' },
      
      // Family Terms
      { id: 5, sunda: 'Kolot', english: 'Parents', category: 'Family', pronunciation: '/ko.lot/', 
        definition: 'Both father and mother collectively', example: 'Kolot abdi aya di bumi', 
        exampleTranslation: 'My parents are at home', audioAvailable: true, difficulty: 'beginner' },
      { id: 6, sunda: 'Bapa', english: 'Father', category: 'Family', pronunciation: '/ba.pa/', 
        definition: 'Formal term for father', example: 'Bapa daek ka sawah', 
        exampleTranslation: 'Father is going to the rice field', audioAvailable: true, difficulty: 'beginner' },
      { id: 7, sunda: 'Indung', english: 'Mother', category: 'Family', pronunciation: '/in.duŋ/', 
        definition: 'Traditional term for mother', example: 'Indung masak di dapur', 
        exampleTranslation: 'Mother is cooking in the kitchen', audioAvailable: true, difficulty: 'beginner' },
      { id: 8, sunda: 'Akang', english: 'Older brother', category: 'Family', pronunciation: '/a.kaŋ/', 
        definition: 'Respectful address for older brother', example: 'Akang parantos mulih', 
        exampleTranslation: 'Older brother has come home', audioAvailable: true, difficulty: 'intermediate' },
      
      // Traditional Food
      { id: 9, sunda: 'Nasi timbel', english: 'Rice wrapped in banana leaf', category: 'Food', pronunciation: '/na.si tim.bəl/', 
        definition: 'Iconic Sundanese rice dish wrapped in banana leaves', example: 'Hayu tuang nasi timbel', 
        exampleTranslation: 'Let\'s eat nasi timbel', audioAvailable: true, difficulty: 'intermediate', cultural: 'Traditional West Java dish' },
      { id: 10, sunda: 'Karedok', english: 'Raw vegetable salad', category: 'Food', pronunciation: '/ka.rə.doʔ/', 
        definition: 'Fresh raw vegetable salad with spicy peanut dressing', example: 'Karedok téh seger pisan', 
        exampleTranslation: 'Karedok is very refreshing', audioAvailable: true, difficulty: 'intermediate', cultural: 'Healthy Sundanese cuisine' },
      
      // Cultural Values
      { id: 11, sunda: 'Someah', english: 'Friendly / Hospitable', category: 'Culture', pronunciation: '/so.me.ah/', 
        definition: 'Core Sundanese value of warmth and hospitality', example: 'Urang Sunda téh someah', 
        exampleTranslation: 'Sundanese people are hospitable', audioAvailable: true, difficulty: 'intermediate', cultural: 'Core Sundanese character trait' },
      { id: 12, sunda: 'Gotong royong', english: 'Mutual assistance', category: 'Culture', pronunciation: '/go.toŋ ro.joŋ/', 
        definition: 'Community cooperation and mutual help philosophy', example: 'Gotong royong di kampung', 
        exampleTranslation: 'Mutual assistance in the village', audioAvailable: true, difficulty: 'advanced', cultural: 'Indonesian community principle' },
      
      // Traditional Arts
      { id: 13, sunda: 'Angklung', english: 'Bamboo musical instrument', category: 'Traditional Arts', pronunciation: '/aŋ.kluŋ/', 
        definition: 'UNESCO World Heritage bamboo musical instrument', example: 'Angklung dimainkeun ku cara digoyangkeun', 
        exampleTranslation: 'Angklung is played by shaking', audioAvailable: true, difficulty: 'intermediate', cultural: 'UNESCO World Heritage instrument' },
      { id: 14, sunda: 'Wayang golek', english: 'Wooden puppet theater', category: 'Traditional Arts', pronunciation: '/wa.jaŋ go.ləʔ/', 
        definition: 'Traditional wooden puppet theater with dalang narration', example: 'Wayang golek carita Ramayana', 
        exampleTranslation: 'Wayang golek tells Ramayana stories', audioAvailable: true, difficulty: 'advanced', cultural: 'Traditional Sundanese theater' },
      
      // Nature
      { id: 15, sunda: 'Gunung', english: 'Mountain', category: 'Nature', pronunciation: '/gu.nuŋ/', 
        definition: 'Large natural elevation of land', example: 'Gunung Tangkuban Parahu', 
        exampleTranslation: 'Tangkuban Parahu Mountain', audioAvailable: true, difficulty: 'beginner' },
      { id: 16, sunda: 'Situ', english: 'Lake', category: 'Nature', pronunciation: '/si.tu/', 
        definition: 'Body of water surrounded by land', example: 'Situ Patenggang endah', 
        exampleTranslation: 'Patenggang Lake is beautiful', audioAvailable: true, difficulty: 'beginner' },
      
      // Emotions
      { id: 17, sunda: 'Bagja', english: 'Happy', category: 'Emotions', pronunciation: '/bag.ja/', 
        definition: 'Feeling of joy and contentment', example: 'Abdi bagja pisan', 
        exampleTranslation: 'I am very happy', audioAvailable: true, difficulty: 'beginner' },
      { id: 18, sunda: 'Seuri', english: 'Smile', category: 'Emotions', pronunciation: '/sə.u.ri/', 
        definition: 'Facial expression showing happiness', example: 'Seuri nu manis', 
        exampleTranslation: 'A sweet smile', audioAvailable: true, difficulty: 'beginner' },
      
      // Historical Dictionary Entries (from Rigg 1862)
      { id: 19, sunda: 'Abdi', english: 'Slave, servant, I (humble)', category: 'Historical', pronunciation: '/ab.di/', 
        definition: 'Arabic origin: a slave or bondman; humble form of "I" used to superiors', 
        example: 'Abdi hoyong naroskeun', exampleTranslation: 'I want to ask (humbly)', 
        audioAvailable: true, difficulty: 'intermediate', 
        cultural: 'Historical term from Sultans of Bantam period, now used as humble first person pronoun',
        etymology: 'Arabic: abd (slave)' },
      { id: 20, sunda: 'Aji', english: 'Study, learn, price, value', category: 'Historical', pronunciation: '/a.ji/', 
        definition: 'To study religious formularies; also price or value of something', 
        example: 'Aji agama di pesantren', exampleTranslation: 'Study religion at Islamic school', 
        audioAvailable: true, difficulty: 'advanced', 
        cultural: 'Sanskrit origin: probably from "adhi-i" meaning to read',
        etymology: 'Sanskrit: adhi (to read)' },
      { id: 21, sunda: 'Aing', english: 'I, me (superior to inferior)', category: 'Historical', pronunciation: '/a.iŋ/', 
        definition: 'First person pronoun used by superior to inferior', 
        example: 'Aing moal méré ka manéh', exampleTranslation: 'I will not give it to you', 
        audioAvailable: true, difficulty: 'intermediate', 
        cultural: 'Traditional hierarchical pronoun system reflecting social status',
        etymology: 'Possibly from "aya" (father) with Polynesian terminal "ng"' },
      { id: 22, sunda: 'Angsana', english: 'Pterocarpus tree', category: 'Historical', pronunciation: '/aŋ.sa.na/', 
        definition: 'Tree with yellow flowers and wing-like seeds, often planted in sacred places', 
        example: 'Angsana ditanem di makam kuno', exampleTranslation: 'Angsana is planted in old graveyards', 
        audioAvailable: true, difficulty: 'advanced', 
        cultural: 'Sacred tree in Buddhist tradition, often found in old burial grounds',
        etymology: 'Sanskrit: asana (seat, tree used by devotees for meditation)' }
    ];
  };

  const dictionaryData = createComprehensiveDictionary();

  const performDictionarySearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = dictionaryData.filter((item: any) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesAudio = !searchFilters.audioOnly || item.audioAvailable;
      
      const searchTerms = query.toLowerCase();
      const matchesSearch = 
        item.sunda.toLowerCase().includes(searchTerms) ||
        item.english.toLowerCase().includes(searchTerms) ||
        item.definition.toLowerCase().includes(searchTerms) ||
        item.category.toLowerCase().includes(searchTerms) ||
        (item.cultural && item.cultural.toLowerCase().includes(searchTerms));

      return matchesCategory && matchesAudio && matchesSearch;
    });

    setSearchResults(filtered);
    setShowSuggestions(query.length > 0);
  };

  // Handle search input change
  const handleDictionarySearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setDictionarySearchQuery(query);
    performDictionarySearch(query);
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      clearDictionarySearch();
    } else if (e.key === 'Enter' && showSuggestions && searchResults.length > 0) {
      // Select first result on Enter
      const firstResult = searchResults[0];
      setDictionarySearchQuery(firstResult.sunda);
      setShowSuggestions(false);
    }
  };

  // Quick search suggestions
  const quickSearchTerms = [
    'Wilujeng enjing', 'Hatur nuhun', 'Someah', 'Angklung', 'Wayang golek', 
    'Nasi timbel', 'Bagja', 'Gunung', 'Family', 'Greetings'
  ];

  // Handle category filter
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    performDictionarySearch(dictionarySearchQuery);
  };

  // Handle search filter changes
  const handleFilterChange = (filterKey: keyof typeof searchFilters) => {
    setSearchFilters(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey]
    }));
    performDictionarySearch(dictionarySearchQuery);
  };

  // Enhanced audio player for dictionary items with real audio support
  const playDictionaryAudio = (item: any) => {
    // Stop any currently playing audio
    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // Get the audio path using the utility function
    const audioPath = generateAudioPath(item);

    // Try to play real audio file first
    const audio = new Audio(audioPath);
    
    audio.addEventListener('canplaythrough', () => {
      setAudioPlayer(audio);
      audio.play().catch(() => {
        // If real audio fails, fallback to text-to-speech
        console.log(`Failed to play audio file: ${audioPath}, falling back to TTS`);
        playTextToSpeech(item);
      });
    });

    audio.addEventListener('error', () => {
      // If audio file doesn't exist, fallback to text-to-speech
      console.log(`Audio file not found: ${audioPath}, using TTS`);
      playTextToSpeech(item);
    });

    audio.addEventListener('ended', () => {
      setCurrentlyPlaying(null);
      setAudioPlayer(null);
    });

    // Set loading state
    setCurrentlyPlaying(item.id);
    
    // Try to load the audio file
    audio.load();
  };

  // Fallback text-to-speech function
  const playTextToSpeech = (item: any) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(item.sunda);
      utterance.lang = 'id-ID';
      utterance.rate = 0.8;
      utterance.onend = () => {
        setCurrentlyPlaying(null);
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  // Clear search
  const clearDictionarySearch = () => {
    setDictionarySearchQuery('');
    setSearchResults([]);
    setShowSuggestions(false);
  };

  // Real audio player system for Cultural Treasures
  const playRealAudio = (item: CulturalContent) => {
    if (currentlyPlaying === item.id) {
      // Stop current audio
      if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setCurrentlyPlaying(null);
      setAudioPlayer(null);
      return;
    }

    // Stop any previous audio
    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    setCurrentlyPlaying(item.id);
    setIsAudioLoading(true);

    // Try to play real audio file based on item type and id
    const audioPath = item.type === 'instrument' && instrumentAudioMap[item.id]
      ? instrumentAudioMap[item.id]
      : item.type === 'song'
      ? `/audio/songs/${item.id}.mp3`
      : null;

    if (audioPath) {
      const audio = new Audio(audioPath);
      
      audio.onloadstart = () => {
        setIsAudioLoading(true);
      };
      
      audio.oncanplay = () => {
        setIsAudioLoading(false);
        setAudioPlayer(audio);
        audio.play().catch(() => {
          // If real audio fails, fall back to text-to-speech
          playTextToSpeechFallback(item);
        });
      };
      
      audio.onended = () => {
        setCurrentlyPlaying(null);
        setAudioPlayer(null);
      };
      
      audio.onerror = () => {
        // Audio file not found or failed to load, use text-to-speech
        setIsAudioLoading(false);
        playTextToSpeechFallback(item);
      };
      
      // Start loading the audio
      audio.load();
    } else {
      // No audio file for this type, use text-to-speech directly
      setIsAudioLoading(false);
      playTextToSpeechFallback(item);
    }
  };

  // Fallback text-to-speech system
  const playTextToSpeechFallback = (item: CulturalContent) => {
    if ('speechSynthesis' in window) {
      // Use title in Sundanese for pronunciation
      const textToSpeak = item.titleSunda;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      
      // Try to use Indonesian voice, fallback to default
      const voices = window.speechSynthesis.getVoices();
      const indonesianVoice = voices.find(voice => 
        voice.lang.includes('id') || voice.lang.includes('ID') || 
        voice.name.toLowerCase().includes('indonesia')
      );
      
      if (indonesianVoice) {
        utterance.voice = indonesianVoice;
      }
      
      utterance.lang = 'id-ID'; // Indonesian locale
      
      // Adjust speech settings based on content type
      if (item.type === 'song') {
        utterance.rate = 0.7; // Slower for songs to emphasize melody
        utterance.pitch = 1.2; // Slightly higher pitch for musical content
      } else {
        utterance.rate = 0.8; // Normal learning rate
        utterance.pitch = 1.0;
      }
      
      utterance.onend = () => {
        setCurrentlyPlaying(null);
      };
      
      utterance.onerror = () => {
        setCurrentlyPlaying(null);
        console.log('Audio sample not available');
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback: just reset the playing state
      setTimeout(() => setCurrentlyPlaying(null), 2000);
    }
  };

  // Pronunciation guide audio player
  const playPronunciation = (category: string, specificWord?: string) => {
    if ('speechSynthesis' in window) {
      // Stop any current speech
      window.speechSynthesis.cancel();
      
      let textToSpeak = '';
      
      if (specificWord) {
        textToSpeak = specificWord;
      } else {
        // Play category introduction
        switch (category) {
          case 'greetings':
            textToSpeak = 'Wilujeng énjing. Punten. Hatur nuhun.';
            break;
          case 'numbers':
            textToSpeak = 'Hiji, dua, tilu, opat, lima';
            break;
          case 'family':
            textToSpeak = 'Bapa, Ibu, Lanceuk, Adi';
            break;
          case 'daily':
            textToSpeak = 'Hayang tuang. Kumaha damang? Sampurasun.';
            break;
          default:
            textToSpeak = 'Pronunciation guide';
        }
      }
      
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      
      // Try to use Indonesian voice for better Sundanese pronunciation
      const voices = window.speechSynthesis.getVoices();
      const indonesianVoice = voices.find(voice => 
        voice.lang.includes('id') || voice.lang.includes('ID') || 
        voice.name.toLowerCase().includes('indonesia')
      );
      
      if (indonesianVoice) {
        utterance.voice = indonesianVoice;
      }
      
      utterance.lang = 'id-ID';
      utterance.rate = 0.7; // Slower for pronunciation learning
      utterance.pitch = 1.0;
      
      utterance.onend = () => {
        // Audio finished
      };
      
      utterance.onerror = () => {
        console.log('Pronunciation audio error');
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const learningModules: LearningModule[] = [
    {
      id: 'basics',
      title: 'Sundanese Basics',
      titleSunda: 'Dasar-dasar Basa Sunda',
      description: 'Learn fundamental Sundanese vocabulary, greetings, and basic conversation',
      icon: <BookOpen className="h-6 w-6" />,
      progress: 75,
      lessons: 12,
      difficulty: 'beginner',
      category: 'language',
      estimatedTime: '3 hours',
      isLocked: false
    },
    {
      id: 'undak-usuk',
      title: 'Speech Levels (Undak Usuk)',
      titleSunda: 'Undak Usuk Basa',
      description: 'Master the respectful speech levels in Sundanese culture',
      icon: <Users className="h-6 w-6" />,
      progress: 45,
      lessons: 8,
      difficulty: 'intermediate',
      category: 'language',
      estimatedTime: '2.5 hours',
      isLocked: false,
      prerequisites: ['basics']
    },
    {
      id: 'sisindiran',
      title: 'Traditional Poetry (Sisindiran)',
      titleSunda: 'Sisindiran Sunda',
      description: 'Explore beautiful Sundanese traditional poetry and riddles',
      icon: <Heart className="h-6 w-6" />,
      progress: 20,
      lessons: 10,
      difficulty: 'intermediate',
      category: 'arts',
      estimatedTime: '4 hours',
      isLocked: false,
      prerequisites: ['basics']
    },
    {
      id: 'pupuh',
      title: 'Classical Poetry (Pupuh)',
      titleSunda: 'Pupuh Sunda',
      description: 'Learn traditional Sundanese poetic forms and their meanings',
      icon: <BookOpen className="h-6 w-6" />,
      progress: 0,
      lessons: 15,
      difficulty: 'advanced',
      category: 'arts',
      estimatedTime: '6 hours',
      isLocked: true,
      prerequisites: ['sisindiran', 'undak-usuk']
    },
    {
      id: 'music',
      title: 'Traditional Music & Instruments',
      titleSunda: 'Musik jeung Alat Musik Tradisional',
      description: 'Discover angklung, kacapi, suling, and other Sundanese instruments',
      icon: <Music className="h-6 w-6" />,
      progress: 30,
      lessons: 18,
      difficulty: 'beginner',
      category: 'arts',
      estimatedTime: '5 hours',
      isLocked: false
    },
    {
      id: 'history',
      title: 'Sundanese History & Landmarks',
      titleSunda: 'Sajarah jeung Tempat Bersejarah Sunda',
      description: 'Explore the rich history of Sunda Kingdom and West Java',
      icon: <MapPin className="h-6 w-6" />,
      progress: 10,
      lessons: 14,
      difficulty: 'intermediate',
      category: 'history',
      estimatedTime: '4.5 hours',
      isLocked: false,
      prerequisites: ['basics']
    }
  ];

  // Sample lessons data for each module
  const sampleLessons: Record<string, Lesson[]> = {
    basics: [
      { id: 'lesson1', title: 'Greetings & Basic Phrases', titleSunda: 'Salametan jeung Ungkapan Dasar', duration: '15 min', type: 'interactive', isCompleted: true, isUnlocked: true },
      { id: 'lesson2', title: 'Family Members', titleSunda: 'Anggota Kulawarga', duration: '12 min', type: 'video', isCompleted: true, isUnlocked: true },
      { id: 'lesson3', title: 'Numbers 1-20', titleSunda: 'Angka 1-20', duration: '10 min', type: 'audio', isCompleted: false, isUnlocked: true },
      { id: 'lesson4', title: 'Days & Time', titleSunda: 'Poé jeung Waktu', duration: '18 min', type: 'interactive', isCompleted: false, isUnlocked: false }
    ],
    'undak-usuk': [
      { id: 'ul1', title: 'Introduction to Speech Levels', titleSunda: 'Bubuka Undak Usuk', duration: '20 min', type: 'video', isCompleted: false, isUnlocked: true },
      { id: 'ul2', title: 'Lemes (Formal Speech)', titleSunda: 'Basa Lemes', duration: '25 min', type: 'interactive', isCompleted: false, isUnlocked: false }
    ]
  };

  // Sample vocabulary data
  const vocabularyItems: VocabularyItem[] = [
    { sunda: 'Wilujeng enjing', english: 'Good morning', pronunciation: 'wi-lu-jeng en-jing', example: 'Wilujeng enjing, Pak!', difficulty: 'beginner', category: 'greetings' },
    { sunda: 'Hatur nuhun', english: 'Thank you', pronunciation: 'ha-tur nu-hun', example: 'Hatur nuhun pisan!', difficulty: 'beginner', category: 'greetings' },
    { sunda: 'Kumaha damang?', english: 'How are you?', pronunciation: 'ku-ma-ha da-mang', example: 'Kumaha damang, Teh?', difficulty: 'beginner', category: 'greetings' },
    { sunda: 'Someah', english: 'Friendly/hospitable', pronunciation: 'so-me-ah', example: 'Urang Sunda téh someah', difficulty: 'intermediate', category: 'culture' }
  ];

  // Sample media items
  const mediaItems: MediaItem[] = [
    { id: 'med1', title: 'Angklung Performance', titleSunda: 'Pagelaran Angklung', type: 'video', duration: '12:30', difficulty: 'beginner', description: 'Traditional bamboo orchestra performance', category: 'music', plays: 1247 },
    { id: 'med2', title: 'Kacapi Suling Ensemble', titleSunda: 'Rampak Kacapi Suling', type: 'audio', duration: '8:45', difficulty: 'intermediate', description: 'Beautiful string and flute music', category: 'music', plays: 856 },
    { id: 'med3', title: 'Sundanese Pronunciation Guide', titleSunda: 'Pituduh Ucapan Sunda', type: 'audio', duration: '25:15', difficulty: 'beginner', description: 'Complete pronunciation tutorial', category: 'language', plays: 2103 }
  ];

  const culturalHighlights: CulturalContent[] = [
    // Traditional Music & Instruments
    {
      id: 'angklung',
      title: 'Angklung',
      titleSunda: 'Angklung',
      type: 'instrument',
      description: 'UNESCO World Heritage bamboo musical instrument played by shaking to create enchanting melodies. Each angklung produces a specific note in pentatonic scale.',
      audioAvailable: true,
      difficulty: 'Beginner'
    },
    {
      id: 'kacapi-suling',
      title: 'Kacapi Suling',
      titleSunda: 'Kacapi Suling',
      type: 'instrument',
      description: 'Traditional string (kacapi) and bamboo flute (suling) ensemble that creates meditative and spiritual music, often accompanying Sundanese poetry.',
      audioAvailable: true,
      difficulty: 'Intermediate'
    },
    {
      id: 'calung',
      title: 'Calung',
      titleSunda: 'Calung',
      type: 'instrument',
      description: 'Bamboo xylophone with a deeper tone than angklung, played by striking with mallets. Creates rhythmic and melodic foundations.',
      audioAvailable: true,
      difficulty: 'Intermediate'
    },
    {
      id: 'karinding',
      title: 'Karinding',
      titleSunda: 'Karinding',
      type: 'instrument',
      description: 'Traditional bamboo jaw harp that produces mystical overtones. Used in spiritual practices and modern experimental music.',
      audioAvailable: true,
      difficulty: 'Advanced'
    },
    {
      id: 'arumba',
      title: 'Arumba',
      titleSunda: 'Arumba',
      type: 'instrument',
      description: 'Modern bamboo ensemble (Alunan Rumpun Bambu) that combines traditional and contemporary musical styles.',
      audioAvailable: true,
      difficulty: 'Intermediate'
    },

    // Traditional Songs & Music
    {
      id: 'es-lilin',
      title: 'Es Lilin',
      titleSunda: 'Lagu Es Lilin',
      type: 'song',
      description: 'Beloved children\'s song about ice seller calling through the village streets. Teaches basic Sundanese vocabulary and pronunciation.',
      audioAvailable: true,
      difficulty: 'Beginner'
    },
    {
      id: 'manuk-dadali',
      title: 'Manuk Dadali',
      titleSunda: 'Manuk Dadali',
      type: 'song',
      description: 'Iconic West Java anthem about the mythical Garuda bird, symbolizing freedom and strength. Official song of West Java province.',
      audioAvailable: true,
      difficulty: 'Intermediate'
    },
    {
      id: 'bubuy-bulan',
      title: 'Bubuy Bulan',
      titleSunda: 'Bubuy Bulan',
      type: 'song',
      description: 'Classic love song comparing beloved to the beautiful moon. Features poetic Sundanese language and romantic metaphors.',
      audioAvailable: true,
      difficulty: 'Advanced'
    },
    {
      id: 'tokecang',
      title: 'Tokecang',
      titleSunda: 'Tokecang',
      type: 'song',
      description: 'Traditional work song sung during rice planting season. Demonstrates the connection between music and daily life.',
      audioAvailable: true,
      difficulty: 'Intermediate'
    },

    // Legends & Stories
    {
      id: 'sangkuriang',
      title: 'Sangkuriang Legend',
      titleSunda: 'Legenda Sangkuriang',
      type: 'story',
      description: 'Epic tale of Sangkuriang who unknowingly fell in love with his mother Dayang Sumbi, creating Tangkuban Perahu mountain in his failed attempt to build a boat.',
      audioAvailable: true,
      difficulty: 'Intermediate'
    },
    {
      id: 'lutung-kasarung',
      title: 'Lutung Kasarung',
      titleSunda: 'Lutung Kasarung',
      type: 'story',
      description: 'Magical story of Purbasari and the enchanted monkey who helps her reclaim her rightful place as princess.',
      audioAvailable: true,
      difficulty: 'Advanced'
    },
    {
      id: 'ciung-wanara',
      title: 'Ciung Wanara',
      titleSunda: 'Ciung Wanara',
      type: 'story',
      description: 'Heroic tale of twin brothers who were raised by a magical bird and later became great kings of Sunda kingdom.',
      audioAvailable: true,
      difficulty: 'Advanced'
    },
    {
      id: 'nyi-loro-kidul',
      title: 'Nyi Loro Kidul',
      titleSunda: 'Nyi Loro Kidul',
      type: 'story',
      description: 'Mystical legend of the Queen of the Southern Seas, protector of Java and powerful supernatural being.',
      audioAvailable: true,
      difficulty: 'Advanced'
    },

    // Traditional Dance & Performance
    {
      id: 'jaipong',
      title: 'Jaipong Dance',
      titleSunda: 'Tari Jaipong',
      type: 'tradition',
      description: 'Dynamic and energetic folk dance created in 1960s, blending traditional Sundanese movements with modern influences.',
      audioAvailable: true,
      difficulty: 'Advanced'
    },
    {
      id: 'wayang-golek',
      title: 'Wayang Golek',
      titleSunda: 'Wayang Golek',
      type: 'tradition',
      description: 'Traditional wooden puppet theater performing stories from Ramayana, Mahabharata, and local legends with dalang narration.',
      audioAvailable: true,
      difficulty: 'Advanced'
    },
    {
      id: 'sisingaan',
      title: 'Sisingaan Dance',
      titleSunda: 'Tari Sisingaan',
      type: 'tradition',
      description: 'Lion dance performed during circumcision ceremonies and festivals, featuring acrobatic movements and colorful lion costumes.',
      audioAvailable: true,
      difficulty: 'Intermediate'
    },
    {
      id: 'kuda-lumping',
      title: 'Kuda Lumping',
      titleSunda: 'Kuda Lumping',
      type: 'tradition',
      description: 'Trance dance featuring bamboo horse puppets, combining spiritual elements with entertainment.',
      audioAvailable: true,
      difficulty: 'Advanced'
    },

    // Traditional Food & Culinary
    {
      id: 'nasi-timbel',
      title: 'Nasi Timbel',
      titleSunda: 'Nasi Timbel',
      type: 'tradition',
      description: 'Iconic Sundanese rice dish wrapped in banana leaves, served with fried chicken, vegetables, and sambal.',
      audioAvailable: false,
      difficulty: 'Beginner'
    },
    {
      id: 'gado-gado-sunda',
      title: 'Lotek Sunda',
      titleSunda: 'Lotek Sunda',
      type: 'tradition',
      description: 'Traditional vegetable salad with peanut sauce, showcasing fresh local ingredients and healthy Sundanese cuisine.',
      audioAvailable: false,
      difficulty: 'Beginner'
    },
    {
      id: 'karedok',
      title: 'Karedok',
      titleSunda: 'Karedok',
      type: 'tradition',
      description: 'Fresh raw vegetable salad with spicy peanut dressing, representing Sundanese love for fresh, healthy food.',
      audioAvailable: false,
      difficulty: 'Beginner'
    },

    // Landmarks & Places
    {
      id: 'gedung-sate',
      title: 'Gedung Sate',
      titleSunda: 'Gedung Sate',
      type: 'landmark',
      description: 'Iconic Art Deco government building in Bandung, symbol of West Java with distinctive tower resembling satay skewer.',
      audioAvailable: false,
      difficulty: 'Beginner'
    },
    {
      id: 'tangkuban-perahu',
      title: 'Tangkuban Perahu',
      titleSunda: 'Tangkuban Parahu',
      type: 'landmark',
      description: 'Active volcano north of Bandung shaped like an overturned boat, central to Sangkuriang legend.',
      audioAvailable: false,
      difficulty: 'Intermediate'
    },
    {
      id: 'kawah-putih',
      title: 'Kawah Putih',
      titleSunda: 'Kawah Bodas',
      type: 'landmark',
      description: 'Stunning white crater lake in Ciwidey with surreal milky turquoise waters from sulfur minerals.',
      audioAvailable: false,
      difficulty: 'Intermediate'
    },
    {
      id: 'keraton-kasepuhan',
      title: 'Keraton Kasepuhan',
      titleSunda: 'Karaton Kasepuhan',
      type: 'landmark',
      description: 'Historic palace in Cirebon showcasing Sundanese-Javanese-Islamic architecture and royal heritage.',
      audioAvailable: false,
      difficulty: 'Advanced'
    },

    // Festivals & Ceremonies
    {
      id: 'seren-taun',
      title: 'Seren Taun Festival',
      titleSunda: 'Upacara Seren Taun',
      type: 'tradition',
      description: 'Sacred harvest festival by Sundanese Baduy people, giving thanks to Dewi Sri (rice goddess) for abundant harvest.',
      audioAvailable: false,
      difficulty: 'Advanced'
    },
    {
      id: 'ngalaksa',
      title: 'Ngalaksa Tradition',
      titleSunda: 'Tradisi Ngalaksa',
      type: 'tradition',
      description: 'Traditional ceremony for preparing laksa noodles, bringing community together through food preparation rituals.',
      audioAvailable: false,
      difficulty: 'Intermediate'
    },
    {
      id: 'mapag-sri',
      title: 'Mapag Sri',
      titleSunda: 'Mapag Sri',
      type: 'tradition',
      description: 'Rice planting ceremony honoring Dewi Sri, featuring traditional dances, prayers, and community participation.',
      audioAvailable: false,
      difficulty: 'Advanced'
    },

    // Traditional Crafts & Arts
    {
      id: 'batik-mega-mendung',
      title: 'Batik Mega Mendung',
      titleSunda: 'Batik Mega Mendung',
      type: 'tradition',
      description: 'Distinctive Cirebon batik pattern featuring cloud motifs (mega mendung) in bold blue and red colors.',
      audioAvailable: false,
      difficulty: 'Intermediate'
    },
    {
      id: 'anyaman-bambu',
      title: 'Bamboo Weaving',
      titleSunda: 'Anyaman Awi',
      type: 'tradition',
      description: 'Traditional bamboo craft creating baskets, containers, and decorative items using time-honored techniques.',
      audioAvailable: false,
      difficulty: 'Intermediate'
    },
    {
      id: 'keris-sunda',
      title: 'Sundanese Keris',
      titleSunda: 'Keris Sunda',
      type: 'tradition',
      description: 'Traditional ceremonial dagger with spiritual significance, featuring distinctive Sundanese forging techniques.',
      audioAvailable: false,
      difficulty: 'Advanced'
    },

    // Language & Literature
    {
      id: 'pantun-sunda',
      title: 'Sundanese Pantun',
      titleSunda: 'Pantun Sunda',
      type: 'tradition',
      description: 'Traditional four-line poetry with ABAB rhyme scheme, expressing wisdom, humor, and cultural values.',
      audioAvailable: true,
      difficulty: 'Advanced'
    },
    {
      id: 'sisindiran',
      title: 'Sisindiran',
      titleSunda: 'Sisindiran',
      type: 'tradition',
      description: 'Sophisticated Sundanese poetry form using metaphor and allegory to convey deeper meanings and social commentary.',
      audioAvailable: true,
      difficulty: 'Advanced'
    },
    {
      id: 'wawangsalan',
      title: 'Wawangsalan',
      titleSunda: 'Wawangsalan',
      type: 'tradition',
      description: 'Sundanese riddle poetry that challenges listeners to decode hidden meanings through wordplay and cultural references.',
      audioAvailable: true,
      difficulty: 'Advanced'
    }
  ];

  // Daily AI Challenges Data
  const dailyChallenges = [
    {
      id: 'warung-order',
      title: 'Order at Traditional Warung',
      titleSunda: 'Pesan di Warung Tradisional',
      description: 'Practice ordering traditional Sundanese food at a local warung',
      scenario: 'warung',
      difficulty: 'Beginner',
      duration: 15,
      xpReward: 50,
      specialBadge: 'Food Explorer',
      conversation: [
        {
          speaker: 'warung_owner',
          name: 'Bu Sari',
          message: 'Wilujeng sumping ka warung abdi! Badé naon?',
          translation: 'Welcome to my warung! What would you like?',
          expectedResponse: ['Abdi badé nasi timbel', 'Nasi timbel mangga', 'Pesan nasi timbel']
        },
        {
          speaker: 'user',
          message: '',
          translation: '',
          hints: ['Say you want nasi timbel', 'Use "Abdi badé..." (I want...)', 'Be polite!']
        }
      ]
    },
    {
      id: 'family-greeting',
      title: 'Family Morning Greetings',
      titleSunda: 'Ngabagéakeun Kulawarga Isuk',
      description: 'Practice proper morning greetings with family members',
      scenario: 'family',
      difficulty: 'Beginner',
      duration: 10,
      xpReward: 30,
      specialBadge: 'Family Friend',
      conversation: [
        {
          speaker: 'grandmother',
          name: 'Nini',
          message: 'Wilujeng enjing, anak alit!',
          translation: 'Good morning, little one!',
          expectedResponse: ['Wilujeng enjing Nini', 'Selamat pagi Nini', 'Enjing Nini']
        }
      ]
    },
    {
      id: 'market-bargain',
      title: 'Bargaining at Traditional Market',
      titleSunda: 'Nawar di Pasar Tradisional',
      description: 'Learn to bargain politely for vegetables at the market',
      scenario: 'market',
      difficulty: 'Intermediate',
      duration: 20,
      xpReward: 75,
      specialBadge: 'Market Master',
      conversation: [
        {
          speaker: 'vendor',
          name: 'Mang Ujang',
          message: 'Sayur seger pisan! Kangkung sarébu per iket.',
          translation: 'Very fresh vegetables! Kangkung is one thousand per bundle.',
          expectedResponse: ['Bisa kurang?', 'Nawar delapan ratus', 'Tigang ratus']
        }
      ]
    },
    {
      id: 'cultural-event',
      title: 'Attending Traditional Ceremony',
      titleSunda: 'Hadir dina Upacara Adat',
      description: 'Navigate conversations at a traditional Sundanese ceremony',
      scenario: 'ceremony',
      difficulty: 'Advanced',
      duration: 25,
      xpReward: 100,
      specialBadge: 'Culture Expert',
      conversation: [
        {
          speaker: 'elder',
          name: 'Bapa Adat',
          message: 'Salamet sumping ka upacara mitoni. Mangga calik di dieu.',
          translation: 'Welcome to the mitoni ceremony. Please sit here.',
          expectedResponse: ['Hatur nuhun Bapa', 'Wilujeng sumping', 'Mangga Bapa']
        }
      ]
    },
    {
      id: 'wayang-discussion',
      title: 'Discussing Wayang Golek Stories',
      titleSunda: 'Ngobrol ngeunaan Carita Wayang Golek',
      description: 'Have an educated discussion about wayang golek characters and stories',
      scenario: 'cultural',
      difficulty: 'Expert',
      duration: 30,
      xpReward: 150,
      specialBadge: 'Wayang Scholar',
      conversation: [
        {
          speaker: 'dalang',
          name: 'Dalang Asep',
          message: 'Anjeun resep karakter naon dina carita Ramayana?',
          translation: 'What character do you like in the Ramayana story?',
          expectedResponse: ['Abdi resep Hanoman', 'Rama karakter alus', 'Sita lemah lembut']
        }
      ]
    }
  ];

  // Cultural Quiz Questions Data
  const quizCategories = {
    music: {
      name: 'Traditional Music',
      nameSunda: 'Musik Tradisional',
      description: 'Test your knowledge of Sundanese musical instruments and traditions',
      icon: '🎵',
      color: 'yellow',
      difficulty: 'Beginner',
      questions: [
        {
          id: 'm1',
          question: 'What is the name of the traditional Sundanese bamboo orchestra?',
          questionSunda: 'Naon ngaranna orkéstra awi tradisional Sunda?',
          options: ['Angklung', 'Gamelan', 'Kacapi', 'Suling'],
          correctAnswer: 0,
          explanation: 'Angklung is a traditional Indonesian musical instrument made of bamboo tubes attached to a bamboo frame.',
          explanationSunda: 'Angklung téh alat musik tradisional Indonesia anu dijieun tina awi.',
          difficulty: 'Beginner',
          points: 10
        },
        {
          id: 'm2',
          question: 'Which instrument is often paired with kacapi in Sundanese music?',
          questionSunda: 'Alat musik naon anu mindeng dipasangkeun jeung kacapi?',
          options: ['Kendang', 'Suling', 'Rebab', 'Bonang'],
          correctAnswer: 1,
          explanation: 'Kacapi suling is a famous traditional Sundanese musical combination.',
          explanationSunda: 'Kacapi suling téh kombinasi musik tradisional Sunda anu kasohor.',
          difficulty: 'Beginner',
          points: 10
        },
        {
          id: 'm3',
          question: 'What type of scale is commonly used in Sundanese music?',
          questionSunda: 'Jenis tangga nada naon anu biasa dipaké dina musik Sunda?',
          options: ['Pentatonic', 'Diatonic', 'Chromatic', 'Blues'],
          correctAnswer: 0,
          explanation: 'Sundanese music traditionally uses pentatonic scales (5-note scales).',
          explanationSunda: 'Musik Sunda sacara tradisional ngagunakeun skala pentatonik (5 nada).',
          difficulty: 'Intermediate',
          points: 15
        },
        {
          id: 'm4',
          question: 'In wayang golek performances, what instrument leads the musical ensemble?',
          questionSunda: 'Dina pagelaran wayang golek, alat musik naon anu mingpin ansambel?',
          options: ['Kendang', 'Rebab', 'Kacapi', 'Suling'],
          correctAnswer: 1,
          explanation: 'The rebab, a bowed string instrument, typically leads the gamelan ensemble in wayang golek.',
          explanationSunda: 'Rebab, alat musik gesek, biasana mingpin ansambel gamelan dina wayang golek.',
          difficulty: 'Advanced',
          points: 20
        }
      ]
    },
    food: {
      name: 'Food & Cuisine',
      nameSunda: 'Kuliner Sunda',
      description: 'Explore the rich culinary heritage of Sundanese cuisine',
      icon: '🍽️',
      color: 'orange',
      difficulty: 'Intermediate',
      questions: [
        {
          id: 'f1',
          question: 'What is the main ingredient in lotek?',
          questionSunda: 'Naon bahan utama dina lotek?',
          options: ['Rice', 'Vegetables', 'Meat', 'Fish'],
          correctAnswer: 1,
          explanation: 'Lotek is a traditional Sundanese salad made with mixed vegetables and peanut sauce.',
          explanationSunda: 'Lotek téh salad tradisional Sunda anu dijieun tina sayuran campur jeung sambal kacang.',
          difficulty: 'Beginner',
          points: 10
        },
        {
          id: 'f2',
          question: 'What does "nasi timbel" refer to?',
          questionSunda: 'Naon hartina "nasi timbel"?',
          options: ['Fried rice', 'Rice wrapped in banana leaf', 'Rice porridge', 'Steamed rice'],
          correctAnswer: 1,
          explanation: 'Nasi timbel is rice wrapped and cooked in banana leaves, giving it a distinctive aroma.',
          explanationSunda: 'Nasi timbel téh sangu anu dibungkus jeung dimasak dina daun cau.',
          difficulty: 'Beginner',
          points: 10
        },
        {
          id: 'f3',
          question: 'Which fermented food is popular in Sundanese cuisine?',
          questionSunda: 'Kadaharan fermentasi naon anu populér dina masakan Sunda?',
          options: ['Tempeh', 'Oncom', 'Tahu', 'Kerupuk'],
          correctAnswer: 1,
          explanation: 'Oncom is a traditional Sundanese fermented food made from peanut press cake or soybean waste.',
          explanationSunda: 'Oncom téh kadaharan fermentasi tradisional Sunda anu dijieun tina ampas kacang.',
          difficulty: 'Intermediate',
          points: 15
        },
        {
          id: 'f4',
          question: 'What is the traditional Sundanese way of eating called?',
          questionSunda: 'Naon sebutan cara dahar tradisional Sunda?',
          options: ['Megibung', 'Dulang', 'Bancakan', 'Botram'],
          correctAnswer: 2,
          explanation: 'Bancakan is the traditional Sundanese communal way of eating together from shared dishes.',
          explanationSunda: 'Bancakan téh cara dahar babarengan tradisional Sunda.',
          difficulty: 'Advanced',
          points: 20
        }
      ]
    },
    history: {
      name: 'History & Legends',
      nameSunda: 'Sajarah & Legenda',
      description: 'Discover the fascinating history and legendary tales of West Java',
      icon: '📚',
      color: 'purple',
      difficulty: 'Advanced',
      questions: [
        {
          id: 'h1',
          question: 'What is the name of the legendary Sundanese princess?',
          questionSunda: 'Naon ngaranna putri legendaris Sunda?',
          options: ['Dewi Sri', 'Nyi Roro Kidul', 'Dayang Sumbi', 'Dewi Ratih'],
          correctAnswer: 2,
          explanation: 'Dayang Sumbi is the legendary mother of Sangkuriang in Sundanese folklore.',
          explanationSunda: 'Dayang Sumbi téh indung legendaris Sangkuriang dina folklor Sunda.',
          difficulty: 'Beginner',
          points: 10
        },
        {
          id: 'h2',
          question: 'Which ancient kingdom was centered in West Java?',
          questionSunda: 'Karajaan kuna naon anu pusatna di Jawa Barat?',
          options: ['Majapahit', 'Sriwijaya', 'Tarumanagara', 'Mataram'],
          correctAnswer: 2,
          explanation: 'Tarumanagara was one of the earliest known kingdoms in West Java (4th-7th century).',
          explanationSunda: 'Tarumanagara mangrupikeun salah sahiji karajaan pangkolotna di Jawa Barat.',
          difficulty: 'Intermediate',
          points: 15
        },
        {
          id: 'h3',
          question: 'Who was the legendary hero who tried to marry Dayang Sumbi?',
          questionSunda: 'Saha pahlawan legendaris anu nyoba nikah ka Dayang Sumbi?',
          options: ['Prabu Siliwangi', 'Sangkuriang', 'Lutung Kasarung', 'Prabu Ajisaka'],
          correctAnswer: 1,
          explanation: 'Sangkuriang unknowingly tried to marry his own mother, Dayang Sumbi, in the famous legend.',
          explanationSunda: 'Sangkuriang tanpa sadar nyoba nikah ka indungna sorangan, Dayang Sumbi.',
          difficulty: 'Beginner',
          points: 10
        },
        {
          id: 'h4',
          question: 'What mountain was created when Sangkuriang kicked over a boat?',
          questionSunda: 'Gunung naon anu kabentuk nalika Sangkuriang najong parahu?',
          options: ['Gunung Gede', 'Gunung Tangkuban Parahu', 'Gunung Salak', 'Gunung Ciremai'],
          correctAnswer: 1,
          explanation: 'Mount Tangkuban Parahu (overturned boat) was formed when Sangkuriang kicked over the boat.',
          explanationSunda: 'Gunung Tangkuban Parahu kabentuk nalika Sangkuriang najong parahu anu dibalikkeun.',
          difficulty: 'Intermediate',
          points: 15
        }
      ]
    },
    arts: {
      name: 'Arts & Crafts',
      nameSunda: 'Seni & Karajinan',
      description: 'Learn about traditional Sundanese arts and craftsmanship',
      icon: '🎨',
      color: 'pink',
      difficulty: 'Intermediate',
      questions: [
        {
          id: 'a1',
          question: 'What type of puppet is used in wayang golek?',
          questionSunda: 'Jenis wayang naon anu dipaké dina wayang golek?',
          options: ['Shadow puppets', 'Wooden puppets', 'String puppets', 'Hand puppets'],
          correctAnswer: 1,
          explanation: 'Wayang golek uses three-dimensional wooden puppets, unlike shadow puppets.',
          explanationSunda: 'Wayang golek ngagunakeun wayang kayu tilu diménsi.',
          difficulty: 'Beginner',
          points: 10
        },
        {
          id: 'a2',
          question: 'What is the traditional Sundanese dance that mimics peacock movements?',
          questionSunda: 'Tarian tradisional Sunda naon anu meniru gerakan merak?',
          options: ['Jaipong', 'Kecak', 'Merak', 'Topeng'],
          correctAnswer: 2,
          explanation: 'Tari Merak (Peacock Dance) is a classical Sundanese dance inspired by peacock movements.',
          explanationSunda: 'Tari Merak téh tarian klasik Sunda anu diilhami ku gerakan merak.',
          difficulty: 'Intermediate',
          points: 15
        },
        {
          id: 'a3',
          question: 'Which Sundanese dance became popular in the 1960s?',
          questionSunda: 'Tarian Sunda naon anu jadi populér dina taun 1960an?',
          options: ['Kecak', 'Jaipong', 'Saman', 'Pendet'],
          correctAnswer: 1,
          explanation: 'Jaipong was created in the 1960s by Gugum Gumbira and became very popular.',
          explanationSunda: 'Jaipong diciptakeun dina taun 1960an ku Gugum Gumbira.',
          difficulty: 'Advanced',
          points: 20
        },
        {
          id: 'a4',
          question: 'What material is traditionally used for Sundanese batik?',
          questionSunda: 'Bahan naon anu tradisional dipaké pikeun batik Sunda?',
          options: ['Cotton', 'Silk', 'Linen', 'All of the above'],
          correctAnswer: 3,
          explanation: 'Sundanese batik can be made on various fabrics including cotton, silk, and linen.',
          explanationSunda: 'Batik Sunda bisa dijieun dina rupa-rupa lawon kaasup katun, sutra, jeung linen.',
          difficulty: 'Advanced',
          points: 20
        }
      ]
    }
  };

  // Get today's challenge (rotate based on day of year)
  const getTodaysChallenge = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    return dailyChallenges[dayOfYear % dailyChallenges.length];
  };

  // Initialize today's challenge
  useEffect(() => {
    if (!currentChallenge) {
      setCurrentChallenge(getTodaysChallenge());
    }
  }, [currentChallenge]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'language': return <BookOpen className="h-4 w-4" />;
      case 'culture': return <Users className="h-4 w-4" />;
      case 'arts': return <Music className="h-4 w-4" />;
      case 'history': return <MapPin className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  // AI Challenge Functions
  const startChallenge = () => {
    setChallengeStarted(true);
    setChallengeProgress(0);
    setChallengeCompleted(false);
    setChallengeMessages([]);
    setChallengeScore(0);
    
    // Start with first message from AI character
    if (currentChallenge && currentChallenge.conversation.length > 0) {
      const firstMessage = currentChallenge.conversation[0];
      setChallengeMessages([{
        speaker: firstMessage.speaker,
        name: firstMessage.name,
        message: firstMessage.message,
        translation: firstMessage.translation,
        timestamp: new Date()
      }]);
    }
  };

  const handleChallengeResponse = (response: string) => {
    if (!currentChallenge || challengeCompleted) return;

    const currentStep = currentChallenge.conversation[challengeProgress];
    const nextStep = currentChallenge.conversation[challengeProgress + 1];

    // Add user message
    const userMessage = {
      speaker: 'user',
      name: 'You',
      message: response,
      translation: '',
      timestamp: new Date()
    };

    setChallengeMessages(prev => [...prev, userMessage]);

    // Check response accuracy
    let isCorrect = false;
    let score = 0;

    if (currentStep && currentStep.expectedResponse) {
      isCorrect = currentStep.expectedResponse.some((expected: string) => 
        response.toLowerCase().includes(expected.toLowerCase())
      );
      score = isCorrect ? 20 : 10; // Points for correct vs any response
    }

    setChallengeScore(prev => prev + score);

    // Add AI response or completion
    setTimeout(() => {
      if (challengeProgress + 1 < currentChallenge.conversation.length) {
        // Continue conversation
        const aiResponse = {
          speaker: nextStep.speaker,
          name: nextStep.name || 'AI',
          message: isCorrect ? 
            getPositiveFeedback() + ' ' + (nextStep.message || getNextQuestion()) :
            getEncouragingFeedback() + ' ' + (nextStep.message || getNextQuestion()),
          translation: nextStep.translation || '',
          timestamp: new Date()
        };
        
        setChallengeMessages(prev => [...prev, aiResponse]);
        setChallengeProgress(prev => prev + 1);
      } else {
        // Complete challenge
        completeChallenge(isCorrect);
      }
    }, 1500);

    setUserInput('');
  };

  const completeChallenge = (lastResponseCorrect: boolean) => {
    setChallengeCompleted(true);
    const bonusPoints = lastResponseCorrect ? 30 : 15;
    const finalScore = challengeScore + bonusPoints;
    setChallengeScore(finalScore);
    
    // Add XP and update streak
    setTotalXP(prev => prev + (currentChallenge?.xpReward || 50));
    setDailyStreak(prev => prev + 1);

    // Completion message
    const completionMessage = {
      speaker: 'system',
      name: 'Ngamumule AI',
      message: `Alus pisan! You completed today's challenge with ${finalScore} points! 🎉`,
      translation: `Excellent! You earned ${currentChallenge?.xpReward || 50} XP and the "${currentChallenge?.specialBadge}" badge!`,
      timestamp: new Date()
    };

    setChallengeMessages(prev => [...prev, completionMessage]);
  };

  const getPositiveFeedback = () => {
    const feedback = [
      'Alus pisan!', 'Sae pisan!', 'Betul!', 'Sampurna!', 'Hebat!'
    ];
    return feedback[Math.floor(Math.random() * feedback.length)];
  };

  const getEncouragingFeedback = () => {
    const feedback = [
      'Teras wae!', 'Hampura, coba deui!', 'Beuki alus!', 'Terus latihan!'
    ];
    return feedback[Math.floor(Math.random() * feedback.length)];
  };

  const getNextQuestion = () => {
    const questions = [
      'Kumaha salajengna?', 'Naon deui?', 'Teruskeun!', 'Coba deui!'
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  };

  const resetChallenge = () => {
    setChallengeStarted(false);
    setChallengeProgress(0);
    setChallengeCompleted(false);
    setChallengeMessages([]);
    setChallengeScore(0);
    setUserInput('');
  };

  const getDifficultyBadgeColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-orange-100 text-orange-700';
      case 'expert': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-emerald-50 to-slate-50">
      {/* Lesson Viewer Modal */}
      {selectedLesson && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <LessonViewer 
            lesson={selectedLesson} 
            onBack={() => setSelectedLesson(null)}
            onComplete={() => {
              setCompletedLessons(prev => new Set([...prev, selectedLesson.id]));
              setSelectedLesson(null);
            }}
            onNext={() => {
              // Handle next lesson logic here
              setSelectedLesson(null);
            }}
          />
        </div>
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        mode={authMode}
        onClose={handleAuthModalClose}
        onModeChange={handleModeChange}
        onAuth={handleAuth}
        onGuestContinue={handleGuestContinue}
      />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-700 via-teal-700 to-emerald-700 text-white relative overflow-hidden">
        {/* Auth Header */}
        <div className="max-w-7xl mx-auto px-4 py-4 relative z-20">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Mountain className="h-8 w-8 text-white" />
              <span className="text-xl font-bold">Ngamumule AI</span>
            </div>
            <div className="relative z-30">
              <AuthHeader
                user={user}
                progress={progress}
                onSignIn={handleSignIn}
                onSignUp={handleSignUp}
                onSignOut={signOut}
              />
            </div>
          </div>
        </div>

        {/* Traditional Sundanese Cloud Pattern Background */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='white' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10 30c5-8 15-8 20 0 5 8 15 8 20 0 5-8 15-8 20 0 5 8 15 8 20 0'/%3E%3Cpath d='M15 45c3-5 10-5 13 0 3 5 10 5 13 0 3-5 10-5 13 0 3 5 10 5 13 0 3-5 10-5 13 0'/%3E%3Cpath d='M20 60c4-6 12-6 16 0 4 6 12 6 16 0 4-6 12-6 16 0 4 6 12 6 16 0'/%3E%3Cpath d='M5 15c6-4 14-4 20 0 6 4 14 4 20 0 6-4 14-4 20 0 6 4 14 4 20 0'/%3E%3Cpath d='M25 75c2-3 8-3 10 0 2 3 8 3 10 0 2-3 8-3 10 0 2 3 8 3 10 0 2-3 8-3 10 0'/%3E%3Cpath d='M8 85c7-5 16-5 23 0 7 5 16 5 23 0 7-5 16-5 23 0'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        
        {/* Secondary Pattern Layer for Depth */}
        <div 
          className="absolute inset-0 opacity-[0.02] transform translate-x-12 translate-y-8"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='white' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 40c8-10 20-10 28 0 8 10 20 10 28 0 8-10 20-10 28 0'/%3E%3Cpath d='M25 65c5-7 15-7 20 0 5 7 15 7 20 0 5-7 15-7 20 0 5 7 15 7 20 0'/%3E%3Cpath d='M15 90c6-8 18-8 24 0 6 8 18 8 24 0 6-8 18-8 24 0'/%3E%3Cpath d='M10 20c9-6 21-6 30 0 9 6 21 6 30 0 9-6 21-6 30 0'/%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        
        {/* Existing Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Mountain className="h-10 w-10 animate-pulse text-white drop-shadow-lg" />
              <h1 className="text-5xl font-bold text-white drop-shadow-2xl">
                Puseur Diajar Basa Sunda
              </h1>
              <Mountain className="h-10 w-10 animate-pulse text-white drop-shadow-lg" />
            </div>
            <h2 className="text-3xl font-semibold text-white mb-6 drop-shadow-lg">Complete Sundanese Learning Experience</h2>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto mb-8 drop-shadow-md leading-relaxed">
              Welcome to the most comprehensive Sundanese learning platform! Master the beautiful language of West Java 
              through interactive lessons, cultural immersion, traditional music, poetry, and authentic experiences.
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-8 text-blue-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-white drop-shadow-lg">150+</div>
                <div className="text-sm drop-shadow-md">Interactive Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white drop-shadow-lg">500+</div>
                <div className="text-sm drop-shadow-md">Vocabulary Words</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white drop-shadow-lg">50+</div>
                <div className="text-sm drop-shadow-md">Cultural Stories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white drop-shadow-lg">25+</div>
                <div className="text-sm drop-shadow-md">Traditional Songs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white drop-shadow-lg">100+</div>
                <div className="text-sm drop-shadow-md">Audio Recordings</div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button 
                onClick={() => setActiveTab('modules')}
                className="px-6 py-3 bg-white text-slate-700 rounded-lg font-semibold hover:bg-sky-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🎯 Start Learning Now
              </button>
              <button 
                onClick={() => setActiveTab('practice')}
                className="px-6 py-3 bg-teal-600 bg-opacity-20 border-2 border-white text-white rounded-lg font-semibold hover:bg-opacity-30 transition-all duration-300"
              >
                📖 Take Level Test
              </button>
              <button 
                onClick={() => setActiveTab('media')}
                className="px-6 py-3 bg-emerald-600 bg-opacity-20 border-2 border-white text-white rounded-lg font-semibold hover:bg-opacity-30 transition-all duration-300"
              >
                🎵 Listen to Music
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-teal-200 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center space-x-8">
            {[
              { id: 'overview', label: 'Dashboard', sunda: 'Dasbor', icon: <Star className="h-4 w-4" /> },
              { id: 'modules', label: 'Learning Modules', sunda: 'Modul Diajar', icon: <BookOpen className="h-4 w-4" /> },
              { id: 'culture', label: 'Cultural Treasures', sunda: 'Khazanah Budaya', icon: <Heart className="h-4 w-4" /> },
              { id: 'media', label: 'Audio & Video', sunda: 'Audio & Video', icon: <Video className="h-4 w-4" /> },
              { id: 'practice', label: 'Practice Tools', sunda: 'Alat Latihan', icon: <Mic className="h-4 w-4" /> },
              { id: 'dictionary', label: 'Dictionary', sunda: 'Kamus', icon: <FileText className="h-4 w-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'overview' | 'modules' | 'culture' | 'media' | 'practice' | 'dictionary')}
                className={`py-4 px-3 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-teal-600 text-teal-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                  <div className="text-xs text-teal-600">{tab.sunda}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Learning Progress Overview */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-teal-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calendar className="h-6 w-6 text-teal-600" />
                Today&apos;s Learning Plan
                <span className="text-lg text-teal-600 font-normal">Rencana Diajar Dinten Ayeuna</span>
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Daily Lesson */}
                <div className="bg-gradient-to-br from-slate-50 to-teal-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group border border-slate-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-slate-200 transition-colors">
                      <BookOpen className="h-6 w-6 text-slate-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Daily Lesson</h4>
                      <p className="text-sm text-slate-600">Palajaran Poean</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">Learn about Sundanese traditional ceremonies and their cultural significance</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">15 minutes</span>
                    <button 
                      onClick={() => setActiveTab('modules')}
                      className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium"
                    >
                      Continue →
                    </button>
                  </div>
                </div>

                {/* Vocabulary Practice */}
                <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group border border-teal-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-teal-100 rounded-xl group-hover:bg-teal-200 transition-colors">
                      <Zap className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Vocabulary Drill</h4>
                      <p className="text-sm text-teal-600">Latihan Kosakata</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">Practice 20 new words about family relationships in Sundanese culture</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">10 minutes</span>
                    <button 
                      onClick={() => setActiveTab('practice')}
                      className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
                    >
                      Practice →
                    </button>
                  </div>
                </div>

                {/* Cultural Story */}
                <div className="bg-gradient-to-br from-emerald-50 to-sky-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group border border-emerald-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-emerald-100 rounded-xl group-hover:bg-emerald-200 transition-colors">
                      <Heart className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Cultural Story</h4>
                      <p className="text-sm text-emerald-600">Carita Budaya</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">Listen to the legend of Lutung Kasarung with audio narration</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">12 minutes</span>
                    <button 
                      onClick={() => setActiveTab('culture')}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                    >
                      Listen →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Achievements */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-teal-100">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  Recent Achievements
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="p-2 bg-slate-100 rounded-lg">
                      <Star className="h-4 w-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Sisindiran Master</p>
                      <p className="text-sm text-gray-600">Completed 10 traditional poetry lessons</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg border border-teal-200">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <Music className="h-4 w-4 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Music Enthusiast</p>
                      <p className="text-sm text-gray-600">Learned 5 traditional songs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Award className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Cultural Explorer</p>
                      <p className="text-sm text-gray-600">Discovered 8 landmarks</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-xl border border-teal-100">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Bookmark className="h-6 w-6 text-teal-600" />
                  Quick Access
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setActiveTab('media')}
                    className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors text-left border border-slate-200"
                  >
                    <Volume2 className="h-6 w-6 text-slate-600 mb-2" />
                    <p className="font-medium text-gray-900">Pronunciation</p>
                    <p className="text-xs text-gray-600">Listen & repeat</p>
                  </button>
                  <button 
                    onClick={() => setActiveTab('modules')}
                    className="p-4 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors text-left border border-teal-200"
                  >
                    <FileText className="h-6 w-6 text-teal-600 mb-2" />
                    <p className="font-medium text-gray-900">Grammar</p>
                    <p className="text-xs text-gray-600">Rules & patterns</p>
                  </button>
                  <button 
                    onClick={() => setActiveTab('culture')}
                    className="p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors text-left border border-emerald-200"
                  >
                    <Camera className="h-6 w-6 text-emerald-600 mb-2" />
                    <p className="font-medium text-gray-900">Virtual Tour</p>
                    <p className="text-xs text-gray-600">Explore places</p>
                  </button>
                  <button 
                    onClick={() => setActiveTab('media')}
                    className="p-4 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors text-left border border-sky-200"
                  >
                    <Headphones className="h-6 w-6 text-sky-600 mb-2" />
                    <p className="font-medium text-gray-900">Audio Library</p>
                    <p className="text-xs text-gray-600">Songs & stories</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'modules' && (
          <div className="space-y-6">
            {!selectedModule ? (
              <>
                {/* Header with enhanced search */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
                      Learning Modules
                      <span className="text-teal-600 ml-3 text-lg font-medium">Modul Diajar</span>
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Structured learning path from basics to advanced Sundanese mastery
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    {/* Enhanced Search */}
                    <div className="relative min-w-[280px]">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        placeholder="Search modules by title, category, or description..."
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-gray-700 placeholder-gray-400 bg-white shadow-sm transition-all duration-200"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                      
                      {/* Quick Search Suggestions - Only show when focused */}
                      {!searchQuery && isSearchFocused && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl p-4 shadow-lg z-10">
                          <p className="text-sm text-gray-600 mb-3 font-medium">Quick searches:</p>
                          <div className="flex flex-wrap gap-2">
                            {['beginner', 'culture', 'music', 'writing', 'conversation', 'grammar'].map((term) => (
                              <button
                                key={term}
                                onClick={() => {
                                  setSearchQuery(term);
                                  setIsSearchFocused(false);
                                }}
                                className="text-xs px-3 py-1 bg-teal-100 text-teal-700 rounded-full hover:bg-teal-200 transition-colors font-medium"
                              >
                                {term}
                              </button>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 mt-3">
                            💡 Tip: Search by difficulty level, topic, or Sundanese titles
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {/* Enhanced Filter */}
                    <select
                      className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-gray-700 shadow-sm min-w-[160px]"
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      <option value="language">📚 Language</option>
                      <option value="culture">🏛️ Culture</option>
                      <option value="arts">🎨 Arts</option>
                      <option value="history">📜 History</option>
                    </select>
                    
                    {/* Enhanced View Mode */}
                    <div className="flex bg-gray-100 rounded-xl p-1 shadow-sm">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-3 rounded-lg transition-all duration-200 ${
                          viewMode === 'grid' 
                            ? 'bg-white shadow-md text-teal-600 transform scale-105' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                        title="Grid view"
                      >
                        <Grid className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-3 rounded-lg transition-all duration-200 ${
                          viewMode === 'list' 
                            ? 'bg-white shadow-md text-teal-600 transform scale-105' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                        title="List view"
                      >
                        <List className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Search Results Summary */}
                {searchQuery && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r-lg">
                    <div className="flex items-center">
                      <Search className="h-5 w-5 text-blue-600 mr-2" />
                      <p className="text-blue-800 font-medium">
                        {learningModules.filter(module => 
                          (filterCategory === 'all' || module.category === filterCategory) &&
                          (module.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           module.titleSunda.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           module.description.toLowerCase().includes(searchQuery.toLowerCase()))
                        ).length} modules found for "{searchQuery}"
                      </p>
                      <button
                        onClick={() => setSearchQuery('')}
                        className="ml-auto text-blue-600 hover:text-blue-800 underline text-sm"
                      >
                        Clear search
                      </button>
                    </div>
                  </div>
                )}

                {/* Enhanced Learning Path Overview with improved readability */}
                <div className="bg-gradient-to-r from-slate-100 to-teal-100 rounded-2xl p-8 border-2 border-slate-200 mb-8 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-2xl font-bold mb-3 flex items-center gap-3 text-slate-800">
                        🎯 Your Learning Journey
                        <span className="text-lg font-medium text-teal-700">Lalampahan Diajar</span>
                      </h4>
                      <p className="text-slate-700 mb-4 text-lg leading-relaxed font-medium">
                        Complete modules in order to unlock advanced content and master Sundanese language
                      </p>
                      <div className="flex items-center gap-6 text-sm bg-white bg-opacity-80 rounded-lg p-4 border border-slate-300 shadow-sm">
                        <span className="flex items-center gap-2 text-slate-700 font-medium">
                          <BookOpen className="h-4 w-4 text-teal-600" />
                          Progress: 3/6 modules started
                        </span>
                        <span className="text-slate-400">•</span>
                        <span className="flex items-center gap-2 text-slate-700 font-medium">
                          <Clock className="h-4 w-4 text-teal-600" />
                          Total time: ~25 hours
                        </span>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="text-center bg-white bg-opacity-90 rounded-xl p-6 border border-slate-300 shadow-md">
                        <div className="text-4xl font-bold mb-2 text-slate-800">47%</div>
                        <div className="text-slate-600 text-sm font-semibold">Overall Progress</div>
                        <div className="mt-3 w-16 h-2 bg-slate-200 rounded-full mx-auto">
                          <div className="w-3/5 h-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Modules Grid/List */}
                {(() => {
                  const filteredModules = learningModules.filter(module => 
                    (filterCategory === 'all' || module.category === filterCategory) &&
                    (searchQuery === '' || 
                     module.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                     module.titleSunda.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     module.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     module.category.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                  );

                  if (filteredModules.length === 0) {
                    return (
                      <div className="text-center py-16">
                        <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                          <Search className="h-10 w-10 text-gray-400" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-700 mb-3">No modules found</h4>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                          {searchQuery 
                            ? `No modules match "${searchQuery}". Try different keywords or check spelling.`
                            : `No modules available in the "${filterCategory}" category.`
                          }
                        </p>
                        <div className="flex justify-center gap-3">
                          {searchQuery && (
                            <button
                              onClick={() => setSearchQuery('')}
                              className="px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-medium"
                            >
                              Clear Search
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setFilterCategory('all');
                              setSearchQuery('');
                            }}
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                          >
                            Show All Modules
                          </button>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-2 gap-8' : 'space-y-6'}>
                      {filteredModules.map((module) => (
                    <div 
                      key={module.id} 
                      className={`bg-white rounded-2xl p-7 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 ${
                        module.isLocked ? 'opacity-70' : 'hover:scale-[1.02] hover:border-teal-200'
                      }`}
                      onClick={() => !module.isLocked && setSelectedModule(module.id)}
                    >
                      {/* Enhanced Module Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start gap-5 flex-1">
                          <div className={`p-4 rounded-xl shadow-sm ${
                            module.isLocked ? 'bg-gray-100' : 'bg-teal-100'
                          }`}>
                            {module.isLocked ? (
                              <Lock className="h-7 w-7 text-gray-400" />
                            ) : (
                              <div className="text-teal-600">
                                {module.icon}
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h4 className="text-xl font-bold text-gray-900 leading-tight">
                                {module.title}
                              </h4>
                              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(module.difficulty)}`}>
                                {module.difficulty}
                              </span>
                            </div>
                            <p className="text-teal-700 font-semibold mb-3 text-lg">
                              {module.titleSunda}
                            </p>
                            <p className="text-gray-600 leading-relaxed text-base">
                              {module.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Module Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                          <div className="text-xl font-bold text-gray-900">{module.lessons}</div>
                          <div className="text-gray-500 text-sm font-medium">Lessons</div>
                        </div>
                        <div className="text-center p-4 bg-teal-50 rounded-xl border border-teal-100">
                          <div className="text-xl font-bold text-gray-900">{module.estimatedTime}</div>
                          <div className="text-gray-500 text-sm font-medium">Duration</div>
                        </div>
                        <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                          <div className="text-xl font-bold text-gray-900">{module.progress}%</div>
                          <div className="text-gray-500 text-sm font-medium">Complete</div>
                        </div>
                      </div>

                      {/* Enhanced Progress Bar */}
                      <div className="mb-6">
                        <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                          <span>Learning Progress</span>
                          <span className="text-teal-600">{module.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                          <div 
                            className={`h-3 rounded-full transition-all duration-500 ${
                              module.isLocked ? 'bg-gray-400' : 'bg-gradient-to-r from-teal-500 to-emerald-500'
                            }`}
                            style={{ width: `${module.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Enhanced Prerequisites */}
                      {module.prerequisites && module.prerequisites.length > 0 && (
                        <div className="mb-5">
                          <p className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Prerequisites:
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {module.prerequisites.map(prereq => (
                              <span key={prereq} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium border border-amber-200">
                                {learningModules.find(m => m.id === prereq)?.title}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Enhanced Action Section */}
                      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-gray-600">
                          {getCategoryIcon(module.category)}
                          <span className="text-sm font-medium capitalize">
                            {module.category}
                          </span>
                        </div>
                        <button 
                          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                            module.isLocked 
                              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                              : 'bg-teal-600 text-white hover:bg-teal-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                          }`}
                          disabled={module.isLocked}
                        >
                          {module.isLocked ? (
                            <>
                              <Lock className="h-4 w-4" />
                              Locked
                            </>
                          ) : module.progress > 0 ? (
                            <>
                              Continue Learning
                              <ChevronRight className="h-4 w-4" />
                            </>
                          ) : (
                            <>
                              Start Module
                              <Play className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                    </div>
                  );
                })()}
              </>
            ) : (
              /* Module Detail View */
              <ModuleDetailView 
                module={learningModules.find(m => m.id === selectedModule)!}
                lessons={sampleLessons[selectedModule] || []}
                onBack={() => setSelectedModule(null)}
                onLessonSelect={setSelectedLesson}
              />
            )}
          </div>
        )}

        {activeTab === 'culture' && (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Cultural Treasures</h3>
              <p className="text-gray-600 mb-6">Discover the rich heritage of Sundanese culture through interactive exploration</p>
              
              {/* Cultural Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <div className="text-2xl font-bold text-emerald-600">{culturalHighlights.filter(item => item.type === 'instrument').length}</div>
                  <div className="text-sm text-emerald-700">Musical Instruments</div>
                </div>
                <div className="bg-sky-50 p-4 rounded-lg border border-sky-200">
                  <div className="text-2xl font-bold text-sky-600">{culturalHighlights.filter(item => item.type === 'song').length}</div>
                  <div className="text-sm text-sky-700">Traditional Songs</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="text-2xl font-bold text-slate-600">{culturalHighlights.filter(item => item.type === 'story').length}</div>
                  <div className="text-sm text-slate-700">Epic Legends</div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <div className="text-2xl font-bold text-amber-600">{culturalHighlights.filter(item => item.type === 'tradition').length}</div>
                  <div className="text-sm text-amber-700">Living Traditions</div>
                </div>
              </div>
            </div>

            {/* Featured Cultural Highlight */}
            <div className="bg-gradient-to-r from-slate-600 to-teal-600 rounded-2xl p-8 text-white mb-8">
              <div>
                <div>
                  <h4 className="text-2xl font-bold mb-2">🎭 Featured: Wayang Golek Tradition</h4>
                  <p className="text-slate-100 mb-2">Explore the ancient art of Sundanese wooden puppet theater</p>
                  <p className="text-slate-200 text-sm mb-4">Experience epic stories of Ramayana and Mahabharata through masterful dalang narration, traditional music, and intricate wooden puppets that bring legends to life.</p>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => window.open('https://youtu.be/lqybwFw5Pq8?si=HFNN1M_7QmrrlJIa', '_blank')}
                      className="px-6 py-3 bg-white text-teal-600 rounded-lg font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
                    >
                      <Play className="h-5 w-5" />
                      Watch Performance
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              {[
                'All', 
                'Instruments', 
                'Songs', 
                'Stories', 
                'Landmarks', 
                'Traditions',
                'Dance',
                'Food',
                'Crafts',
                'Literature'
              ].map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filterCategory === category.toLowerCase() || (category === 'All' && filterCategory === 'all')
                      ? 'bg-teal-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setFilterCategory(category === 'All' ? 'all' : category.toLowerCase())}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Cultural Items Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {culturalHighlights
                .filter(item => {
                  if (filterCategory === 'all') return true;
                  
                  const categoryMap: Record<string, string[]> = {
                    'instruments': ['instrument'],
                    'songs': ['song'],
                    'stories': ['story'],
                    'landmarks': ['landmark'],
                    'traditions': ['tradition'],
                    'dance': ['tradition'], // Dance is a type of tradition
                    'food': ['tradition'], // Food traditions
                    'crafts': ['tradition'], // Traditional crafts
                    'literature': ['tradition'] // Literary traditions
                  };
                  
                  const allowedTypes = categoryMap[filterCategory] || [];
                  
                  // Special handling for subcategories
                  if (filterCategory === 'dance') {
                    return item.type === 'tradition' && (
                      item.title.toLowerCase().includes('dance') || 
                      item.title.toLowerCase().includes('tari') ||
                      item.title.toLowerCase().includes('jaipong') ||
                      item.title.toLowerCase().includes('sisingaan') ||
                      item.title.toLowerCase().includes('wayang') ||
                      item.title.toLowerCase().includes('kuda')
                    );
                  }
                  
                  if (filterCategory === 'food') {
                    return item.type === 'tradition' && (
                      item.title.toLowerCase().includes('nasi') ||
                      item.title.toLowerCase().includes('lotek') ||
                      item.title.toLowerCase().includes('karedok') ||
                      item.title.toLowerCase().includes('ngalaksa')
                    );
                  }
                  
                  if (filterCategory === 'crafts') {
                    return item.type === 'tradition' && (
                      item.title.toLowerCase().includes('batik') ||
                      item.title.toLowerCase().includes('bamboo') ||
                      item.title.toLowerCase().includes('anyaman') ||
                      item.title.toLowerCase().includes('keris')
                    );
                  }
                  
                  if (filterCategory === 'literature') {
                    return item.type === 'tradition' && (
                      item.title.toLowerCase().includes('pantun') ||
                      item.title.toLowerCase().includes('sisindiran') ||
                      item.title.toLowerCase().includes('wawangsalan')
                    );
                  }
                  
                  return allowedTypes.includes(item.type);
                })
                .map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  {/* Item Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">{item.title}</h4>
                      <p className="text-teal-600 font-medium">{item.titleSunda}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(item.difficulty.toLowerCase())}`}>
                        {item.difficulty}
                      </span>
                      <button className="p-2 bg-gray-100 rounded-lg hover:bg-teal-100 transition-colors group">
                        <Heart className="h-4 w-4 text-gray-400 group-hover:text-teal-600" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Type Badge */}
                  <div className="mb-3">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                      item.type === 'instrument' ? 'bg-emerald-100 text-emerald-700' :
                      item.type === 'song' ? 'bg-sky-100 text-sky-700' :
                      item.type === 'story' ? 'bg-slate-100 text-slate-700' :
                      item.type === 'landmark' ? 'bg-teal-100 text-teal-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {item.type === 'instrument' && <Music className="h-4 w-4" />}
                      {item.type === 'song' && <Volume2 className="h-4 w-4" />}
                      {item.type === 'story' && <BookOpen className="h-4 w-4" />}
                      {item.type === 'landmark' && <MapPin className="h-4 w-4" />}
                      {item.type === 'tradition' && <Users className="h-4 w-4" />}
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{item.description}</p>
                  
                  {/* Audio Sample Info */}
                  {item.audioSample && (
                    <div className="bg-gradient-to-r from-emerald-50 to-sky-50 rounded-lg p-3 mb-4 border border-emerald-200">
                      <div className="flex items-start gap-2">
                        <Headphones className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-emerald-800">{item.audioSample.name}</p>
                          <p className="text-xs text-emerald-600">{item.audioSample.description} • {item.audioSample.duration}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Interactive Elements */}
                  <div className="space-y-3">
                    {/* Audio/Visual Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {/* Audio button - only show for items with actual audio files */}
                        {hasAudioFile(item.id, item.type) && (
                          <button 
                            className={`p-2 rounded-lg transition-colors group ${
                              currentlyPlaying === item.id
                                ? 'bg-emerald-200 text-emerald-800' 
                                : isAudioLoading && currentlyPlaying === item.id
                                  ? 'bg-yellow-100 text-yellow-600'
                                  : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                            }`}
                            onClick={() => playRealAudio(item)}
                            title={`Play ${item.titleSunda} audio sample`}
                            disabled={isAudioLoading && currentlyPlaying === item.id}
                          >
                            {isAudioLoading && currentlyPlaying === item.id ? (
                              <div className="h-4 w-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin" />
                            ) : currentlyPlaying === item.id ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Volume2 className="h-4 w-4" />
                            )}
                          </button>
                        )}
                        
                        {/* Show 'Audio Available' badge for instruments with real audio */}
                        {hasAudioFile(item.id, item.type) && (
                          <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs flex items-center gap-1">
                            <Music className="h-3 w-3" />
                            Audio
                          </div>
                        )}
                        
                        {/* Legacy audio button - for items without real audio files */}
                        {item.audioAvailable && !hasAudioFile(item.id, item.type) && (
                          <button 
                            className={`p-2 rounded-lg transition-colors group ${
                              currentlyPlaying === item.id
                                ? 'bg-emerald-200 text-emerald-800' 
                                : isAudioLoading && currentlyPlaying === item.id
                                  ? 'bg-yellow-100 text-yellow-600'
                                  : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                            }`}
                            onClick={() => playRealAudio(item)}
                            title={`Play ${item.titleSunda} pronunciation (Text-to-Speech)`}
                            disabled={isAudioLoading && currentlyPlaying === item.id}
                          >
                            {isAudioLoading && currentlyPlaying === item.id ? (
                              <div className="h-4 w-4 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin" />
                            ) : currentlyPlaying === item.id ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Volume2 className="h-4 w-4" />
                            )}
                          </button>
                        )}
                        
                        <button className="p-2 bg-teal-100 text-teal-600 rounded-lg hover:bg-teal-200 transition-colors">
                          <Play className="h-4 w-4" />
                        </button>
                        <button className="p-2 bg-sky-100 text-sky-600 rounded-lg hover:bg-sky-200 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                      <button className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors text-sm">
                        Learn More
                      </button>
                    </div>

                    {/* Cultural Context */}
                    {item.type === 'instrument' && (
                      <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                        <p className="text-xs text-emerald-700">
                          <strong>Cultural Note:</strong> Traditional instruments play a vital role in Sundanese ceremonies and daily life.
                        </p>
                      </div>
                    )}
                    
                    {item.type === 'story' && (
                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <p className="text-xs text-slate-700">
                          <strong>Legend:</strong> This story has been passed down through generations and reflects Sundanese values.
                        </p>
                      </div>
                    )}

                    {/* Interactive Learning Options */}
                    <div className="flex gap-2 pt-2 border-t border-gray-100">
                      <button className="flex-1 py-2 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 text-teal-700 rounded-lg hover:from-teal-100 hover:to-emerald-100 transition-all text-sm font-medium">
                        📚 Study
                      </button>
                      <button className="flex-1 py-2 bg-gradient-to-r from-slate-50 to-sky-50 border border-slate-200 text-slate-700 rounded-lg hover:from-slate-100 hover:to-sky-100 transition-all text-sm font-medium">
                        🎯 Practice
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cultural Learning Path */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-teal-100 mt-8">
              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Target className="h-6 w-6 text-teal-600" />
                Cultural Learning Journey
                <span className="text-sm font-normal text-gray-600">Jalur Budaya</span>
              </h4>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-slate-50 to-teal-50 rounded-xl border border-slate-200">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Music className="h-6 w-6 text-slate-600" />
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">Musical Heritage</h5>
                  <p className="text-sm text-gray-600 mb-4">Explore traditional instruments and their cultural significance</p>
                  <div className="bg-slate-200 rounded-full h-2 mb-2">
                    <div className="bg-slate-600 h-2 rounded-full w-3/4"></div>
                  </div>
                  <span className="text-xs text-gray-500">75% explored</span>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl border border-teal-200">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-6 w-6 text-teal-600" />
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">Oral Traditions</h5>
                  <p className="text-sm text-gray-600 mb-4">Discover legends, stories, and their moral teachings</p>
                  <div className="bg-teal-200 rounded-full h-2 mb-2">
                    <div className="bg-teal-600 h-2 rounded-full w-1/2"></div>
                  </div>
                  <span className="text-xs text-gray-500">50% explored</span>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-sky-50 rounded-xl border border-emerald-200">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h5 className="font-semibold text-gray-900 mb-2">Sacred Places</h5>
                  <p className="text-sm text-gray-600 mb-4">Visit virtual landmarks and historical sites</p>
                  <div className="bg-emerald-200 rounded-full h-2 mb-2">
                    <div className="bg-emerald-600 h-2 rounded-full w-1/4"></div>
                  </div>
                  <span className="text-xs text-gray-500">25% explored</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'media' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Audio & Video Library</h3>
              <p className="text-gray-600">Immerse yourself in authentic Sundanese sounds and visuals</p>
            </div>

            {/* Featured Content */}
            <div className="bg-gradient-to-r from-slate-600 to-teal-600 rounded-2xl p-8 text-white mb-8">
              <div>
                <div>
                  <h4 className="text-2xl font-bold mb-2">🎵 Featured: Traditional Angklung Performance</h4>
                  <p className="text-slate-100 mb-4">Experience the UNESCO World Heritage bamboo orchestra</p>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => window.open('https://youtu.be/rYg-OglYXXM?si=VsukHIcKRblrWh_R', '_blank')}
                      className="px-6 py-3 bg-white text-teal-600 rounded-lg font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
                    >
                      <Play className="h-5 w-5" />
                      Watch Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Categories */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Traditional Music */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-teal-100 rounded-lg">
                    <Music className="h-6 w-6 text-teal-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Traditional Music</h4>
                </div>
                
                {/* Audio Player Info */}
                {currentTrack && (
                  <div className="mb-4 p-3 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg border border-teal-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Volume2 className="h-4 w-4 text-teal-600" />
                        <span className="text-sm font-medium text-teal-800">Now Playing: {currentTrack}</span>
                      </div>
                      <button
                        onClick={stopAudio}
                        className="p-1 bg-teal-100 hover:bg-teal-200 rounded transition-colors"
                      >
                        <X className="h-3 w-3 text-teal-600" />
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="space-y-3">
                  {Object.keys(audioFiles).map((trackName, idx) => {
                    // Create engaging descriptions for each instrument
                    const instrumentDescriptions: Record<string, string> = {
                      'Kacapi Suling': 'Meditative string & flute ensemble',
                      'Angklung Melodies': 'UNESCO bamboo orchestra magic',
                      'Kendang Rhythms': 'Powerful ceremonial drum beats',
                      'Gamelan Degung': 'Royal bronze ensemble elegance',
                      'Suling Flute': 'Soulful bamboo flute melodies',
                      'Rebab Strings': 'Mystical two-string violin',
                      'Bonang Melodies': 'Glistening bronze kettle gongs'
                    };
                    
                    return (
                      <div key={idx} className="flex items-center justify-between p-3 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg transition-colors ${
                            currentTrack === trackName && isPlaying 
                              ? 'bg-teal-200' 
                              : 'bg-teal-100 group-hover:bg-teal-200'
                          }`}>
                            {currentTrack === trackName && isPlaying ? (
                              <Pause className="h-4 w-4 text-teal-600" />
                            ) : (
                              <Play className="h-4 w-4 text-teal-600" />
                            )}
                          </div>
                          <div>
                            <span className="text-sm font-medium text-gray-900">{trackName}</span>
                            <div className="text-xs text-gray-600">{instrumentDescriptions[trackName]}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if (currentTrack === trackName && isPlaying) {
                              pauseAudio();
                            } else {
                              playAudio(trackName);
                            }
                          }}
                          className="p-2 bg-teal-100 hover:bg-teal-200 rounded-lg transition-colors"
                        >
                          {currentTrack === trackName && isPlaying ? (
                            <Pause className="h-4 w-4 text-teal-600" />
                          ) : (
                            <Play className="h-4 w-4 text-teal-600" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                  
                  {/* Gong - Coming Soon */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Music className="h-4 w-4 text-gray-400" />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">Gong Rhythms</span>
                        <div className="text-xs text-gray-400">Coming Soon</div>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                      Upcoming
                    </div>
                  </div>
                </div>
                
                {/* Featured Spotify Playlist */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-500 rounded-lg">
                      <Music className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-green-800">🎧 Traditional Sundanese Music</h5>
                      <p className="text-xs text-green-600">Curated Spotify Playlist</p>
                    </div>
                  </div>
                  <p className="text-sm text-green-700 mb-3">Discover authentic Sundanese music collection featuring traditional instruments and melodies</p>
                  <button
                    onClick={() => window.open('https://open.spotify.com/album/17HaMG2jOBXKAbCn1bCpfP?si=4o-1LnaIQbmb6FYA1d_2FA', '_blank')}
                    className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                  >
                    <Headphones className="h-4 w-4" />
                    Listen on Spotify
                  </button>
                </div>

                {/* Audio Library Stats */}
                <div className="mt-4 p-3 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg border border-teal-200">
                  <div className="text-center">
                    <div className="text-lg font-bold text-teal-800">{Object.keys(audioFiles).length} + 1</div>
                    <div className="text-xs text-teal-600">Audio Samples Available</div>
                    <div className="text-xs text-gray-600 mt-1">High-quality traditional recordings</div>
                  </div>
                </div>

                {/* Audio File Information */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <h6 className="text-sm font-semibold text-gray-800 mb-2">📁 Audio Library Info</h6>
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>Format:</span>
                      <span className="font-medium">MP3 (Web Optimized)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quality:</span>
                      <span className="font-medium">High-Definition Audio</span>
                    </div>
                    <div className="flex justify-between">
                      <span>File Sizes:</span>
                      <span className="font-medium">240KB - 670KB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Collection:</span>
                      <span className="font-medium text-teal-600">7 instruments ready</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-amber-600">
                    🔔 Gong audio sample will be added soon
                  </div>
                </div>
              </div>

              {/* Pronunciation Guide */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <Volume2 className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Pronunciation Guide</h4>
                    <p className="text-sm text-emerald-600">Panduan Lafal</p>
                  </div>
                </div>
                
                {/* Pronunciation Categories */}
                <div className="space-y-4">
                  {/* Basic Greetings */}
                  <div className="border border-emerald-200 rounded-lg p-4 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => setExpandedPronunciation(expandedPronunciation === 'greetings' ? null : 'greetings')}>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <Heart className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900">Basic Greetings</h5>
                          <p className="text-xs text-emerald-600">Salam Dasar • 6 phrases</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playPronunciation('greetings');
                          }}
                          className="p-2 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
                        >
                          <Volume2 className="h-4 w-4 text-emerald-600" />
                        </button>
                        <ChevronRight className={`h-4 w-4 text-gray-400 transition-transform ${expandedPronunciation === 'greetings' ? 'rotate-90' : ''}`} />
                      </div>
                    </div>
                    
                    {expandedPronunciation === 'greetings' && (
                      <div className="space-y-3 pl-4 border-l-2 border-emerald-200">
                        {[
                          { sunda: 'Wilujeng énjing', english: 'Good morning', phonetic: '/wi-lu-jeng é-njing/' },
                          { sunda: 'Wilujeng wengi', english: 'Good evening', phonetic: '/wi-lu-jeng wen-gi/' },
                          { sunda: 'Kumaha damang?', english: 'How are you?', phonetic: '/ku-ma-ha da-mang/' },
                          { sunda: 'Damang, hatur nuhun', english: "I'm fine, thank you", phonetic: '/da-mang ha-tur nu-hun/' },
                          { sunda: 'Punten', english: 'Excuse me/Sorry', phonetic: '/pun-ten/' },
                          { sunda: 'Hatur nuhun', english: 'Thank you', phonetic: '/ha-tur nu-hun/' }
                        ].map((phrase, idx) => (
                          <div key={idx} className="bg-gradient-to-r from-emerald-50 to-green-50 p-3 rounded-lg hover:from-emerald-100 hover:to-green-100 transition-all cursor-pointer group">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-emerald-800">{phrase.sunda}</span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      playPronunciation('greetings', phrase.sunda);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 p-1 bg-emerald-200 hover:bg-emerald-300 rounded transition-all"
                                  >
                                    <Volume2 className="h-3 w-3 text-emerald-700" />
                                  </button>
                                </div>
                                <p className="text-sm text-gray-600">{phrase.english}</p>
                                <p className="text-xs text-emerald-600 font-mono">{phrase.phonetic}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Numbers & Counting */}
                  <div className="border border-sky-200 rounded-lg p-4 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => setExpandedPronunciation(expandedPronunciation === 'numbers' ? null : 'numbers')}>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-sky-100 rounded-lg">
                          <Hash className="h-4 w-4 text-sky-600" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900">Numbers & Counting</h5>
                          <p className="text-xs text-sky-600">Angka jeung Ngitung • 10 numbers</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playPronunciation('numbers');
                          }}
                          className="p-2 bg-sky-100 hover:bg-sky-200 rounded-lg transition-colors"
                        >
                          <Volume2 className="h-4 w-4 text-sky-600" />
                        </button>
                        <ChevronRight className={`h-4 w-4 text-gray-400 transition-transform ${expandedPronunciation === 'numbers' ? 'rotate-90' : ''}`} />
                      </div>
                    </div>
                    
                    {expandedPronunciation === 'numbers' && (
                      <div className="space-y-3 pl-4 border-l-2 border-sky-200">
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { sunda: 'hiji', english: 'one', phonetic: '/hi-ji/' },
                            { sunda: 'dua', english: 'two', phonetic: '/du-a/' },
                            { sunda: 'tilu', english: 'three', phonetic: '/ti-lu/' },
                            { sunda: 'opat', english: 'four', phonetic: '/o-pat/' },
                            { sunda: 'lima', english: 'five', phonetic: '/li-ma/' },
                            { sunda: 'genep', english: 'six', phonetic: '/ge-nep/' },
                            { sunda: 'tujuh', english: 'seven', phonetic: '/tu-juh/' },
                            { sunda: 'dalapan', english: 'eight', phonetic: '/da-la-pan/' },
                            { sunda: 'salapan', english: 'nine', phonetic: '/sa-la-pan/' },
                            { sunda: 'sapuluh', english: 'ten', phonetic: '/sa-pu-luh/' }
                          ].map((number, idx) => (
                            <div key={idx} className="bg-gradient-to-r from-sky-50 to-blue-50 p-3 rounded-lg hover:from-sky-100 hover:to-blue-100 transition-all cursor-pointer group">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-sky-800 text-lg">{idx + 1}.</span>
                                    <span className="font-medium text-sky-800">{number.sunda}</span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        playPronunciation('numbers', number.sunda);
                                      }}
                                      className="opacity-0 group-hover:opacity-100 p-1 bg-sky-200 hover:bg-sky-300 rounded transition-all"
                                    >
                                      <Volume2 className="h-3 w-3 text-sky-700" />
                                    </button>
                                  </div>
                                  <p className="text-xs text-gray-600">{number.english}</p>
                                  <p className="text-xs text-sky-600 font-mono">{number.phonetic}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Family Terms */}
                  <div className="border border-teal-200 rounded-lg p-4 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => setExpandedPronunciation(expandedPronunciation === 'family' ? null : 'family')}>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-teal-100 rounded-lg">
                          <Users className="h-4 w-4 text-teal-600" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900">Family Terms</h5>
                          <p className="text-xs text-teal-600">Istilah Kulawarga • 8 terms</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playPronunciation('family');
                          }}
                          className="p-2 bg-teal-100 hover:bg-teal-200 rounded-lg transition-colors"
                        >
                          <Volume2 className="h-4 w-4 text-teal-600" />
                        </button>
                        <ChevronRight className={`h-4 w-4 text-gray-400 transition-transform ${expandedPronunciation === 'family' ? 'rotate-90' : ''}`} />
                      </div>
                    </div>
                    
                    {expandedPronunciation === 'family' && (
                      <div className="space-y-3 pl-4 border-l-2 border-teal-200">
                        {[
                          { sunda: 'Bapa/Ayah', english: 'Father', phonetic: '/ba-pa/ /a-yah/' },
                          { sunda: 'Ibu/Indung', english: 'Mother', phonetic: '/i-bu/ /in-dung/' },
                          { sunda: 'Lanceuk', english: 'Older sibling', phonetic: '/lan-ceuk/' },
                          { sunda: 'Adi', english: 'Younger sibling', phonetic: '/a-di/' },
                          { sunda: 'Aki', english: 'Grandfather', phonetic: '/a-ki/' },
                          { sunda: 'Nini', english: 'Grandmother', phonetic: '/ni-ni/' },
                          { sunda: 'Paman', english: 'Uncle', phonetic: '/pa-man/' },
                          { sunda: 'Bibi', english: 'Aunt', phonetic: '/bi-bi/' }
                        ].map((term, idx) => (
                          <div key={idx} className="bg-gradient-to-r from-teal-50 to-cyan-50 p-3 rounded-lg hover:from-teal-100 hover:to-cyan-100 transition-all cursor-pointer group">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-teal-800">{term.sunda}</span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      playPronunciation('family', term.sunda);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 p-1 bg-teal-200 hover:bg-teal-300 rounded transition-all"
                                  >
                                    <Volume2 className="h-3 w-3 text-teal-700" />
                                  </button>
                                </div>
                                <p className="text-sm text-gray-600">{term.english}</p>
                                <p className="text-xs text-teal-600 font-mono">{term.phonetic}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Daily Expressions */}
                  <div className="border border-amber-200 rounded-lg p-4 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => setExpandedPronunciation(expandedPronunciation === 'daily' ? null : 'daily')}>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-100 rounded-lg">
                          <MessageCircle className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <h5 className="font-semibold text-gray-900">Daily Expressions</h5>
                          <p className="text-xs text-amber-600">Ungkapan Poean • 10 phrases</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playPronunciation('daily');
                          }}
                          className="p-2 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
                        >
                          <Volume2 className="h-4 w-4 text-amber-600" />
                        </button>
                        <ChevronRight className={`h-4 w-4 text-gray-400 transition-transform ${expandedPronunciation === 'daily' ? 'rotate-90' : ''}`} />
                      </div>
                    </div>
                    
                    {expandedPronunciation === 'daily' && (
                      <div className="space-y-3 pl-4 border-l-2 border-amber-200">
                        {[
                          { sunda: 'Hayang tuang', english: 'Want to eat', phonetic: '/ha-yang tu-ang/' },
                          { sunda: 'Hayang inuman', english: 'Want to drink', phonetic: '/ha-yang i-nu-man/' },
                          { sunda: 'Dimana WC?', english: 'Where is the toilet?', phonetic: '/di-ma-na we-ce/' },
                          { sunda: 'Sabaraha hargana?', english: 'How much does it cost?', phonetic: '/sa-ba-ra-ha har-ga-na/' },
                          { sunda: 'Teu nyaho', english: "I don't know", phonetic: '/teu nya-ho/' },
                          { sunda: 'Bisa nulung?', english: 'Can you help?', phonetic: '/bi-sa nu-lung/' },
                          { sunda: 'Abdi hoyong...', english: 'I want...', phonetic: '/ab-di ho-yong/' },
                          { sunda: 'Nyaah pisan', english: 'Love very much', phonetic: '/nya-ah pi-san/' },
                          { sunda: 'Mangga', english: 'Please (come in)', phonetic: '/mang-ga/' },
                          { sunda: 'Sampurasun', english: 'Traditional greeting', phonetic: '/sam-pu-ra-sun/' }
                        ].map((phrase, idx) => (
                          <div key={idx} className="bg-gradient-to-r from-amber-50 to-yellow-50 p-3 rounded-lg hover:from-amber-100 hover:to-yellow-100 transition-all cursor-pointer group">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-amber-800">{phrase.sunda}</span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      playPronunciation('daily', phrase.sunda);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 p-1 bg-amber-200 hover:bg-amber-300 rounded transition-all"
                                  >
                                    <Volume2 className="h-3 w-3 text-amber-700" />
                                  </button>
                                </div>
                                <p className="text-sm text-gray-600">{phrase.english}</p>
                                <p className="text-xs text-amber-600 font-mono">{phrase.phonetic}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Pronunciation Practice Stats */}
                <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                  <div className="flex items-center justify-between mb-3">
                    <h6 className="font-semibold text-emerald-800">📊 Your Pronunciation Progress</h6>
                    <span className="text-xs text-emerald-600">Updated daily</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-emerald-700">34</div>
                      <div className="text-xs text-emerald-600">Words Practiced</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-emerald-700">85%</div>
                      <div className="text-xs text-emerald-600">Accuracy Rate</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-emerald-600 mb-1">
                      <span>Overall Progress</span>
                      <span>68%</span>
                    </div>
                    <div className="w-full bg-emerald-200 rounded-full h-2">
                      <div className="bg-emerald-600 h-2 rounded-full w-[68%]"></div>
                    </div>
                  </div>
                </div>

                {/* Quick Practice Button */}
                <div className="mt-4">
                  <button 
                    onClick={() => setActiveTab('practice')}
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2"
                  >
                    <Mic className="h-5 w-5" />
                    Start Pronunciation Practice
                  </button>
                </div>
              </div>

              {/* Cultural Videos */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-sky-100 rounded-lg">
                    <Video className="h-6 w-6 text-sky-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Cultural Videos</h4>
                </div>
                
                {/* Featured Live Performances */}
                <div className="space-y-4 mb-6">
                  {/* Video 1 - 2Xgw0-aQkRo */}
                  <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg p-4 border border-sky-200 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-md">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">▶</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                          🎵 POTRET MANEHNA - SWARANTARA (LIVE PERFORMANCE)
                        </h5>
                        <p className="text-xs text-gray-600 mb-2">Traditional Sundanese live musical performance</p>
                        <button
                          onClick={() => window.open('https://youtu.be/2Xgw0-aQkRo?si=jUQdXpX7C9jUWEcI', '_blank')}
                          className="px-3 py-1 bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600 transition-colors flex items-center gap-1"
                        >
                          <Play className="h-3 w-3" />
                          Watch on YouTube
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Video 2 - P_S_cHFUpEQ */}
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-md">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">▶</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                          🎵 LEUNGITEUN - MAYANG KRIS - ALIVIA - RIDWAN &apos;ONE&apos; X (SWARANTARA)
                        </h5>
                        <p className="text-xs text-gray-600 mb-2">Sundanese collaborative musical performance by Swarantara artists</p>
                        <button
                          onClick={() => window.open('https://youtu.be/P_S_cHFUpEQ?si=eirmYbSDW66qEFli', '_blank')}
                          className="px-3 py-1 bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600 transition-colors flex items-center gap-1"
                        >
                          <Play className="h-3 w-3" />
                          Watch on YouTube
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Video 3 - 03HV_Y1dtYE */}
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4 border border-emerald-200 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-md">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">▶</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                          🎵 KALANGKANG || COVER BY RITA TILA FEAT SULE & ANTON ABOX
                        </h5>
                        <p className="text-xs text-gray-600 mb-2">Popular Sundanese song cover performance featuring Rita Tila, Sule, and Anton Abox</p>
                        <button
                          onClick={() => window.open('https://youtu.be/03HV_Y1dtYE?si=yYKLSn0jK1VlLAsG', '_blank')}
                          className="px-3 py-1 bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600 transition-colors flex items-center gap-1"
                        >
                          <Play className="h-3 w-3" />
                          Watch on YouTube
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Video 4 - YMRs1wb6Uok */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-md">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">▶</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                          🎵 EMUT BAE || COVER BY SULE FEAT RITA TILA
                        </h5>
                        <p className="text-xs text-gray-600 mb-2">Heartfelt Sundanese song cover featuring Sule and Rita Tila collaboration</p>
                        <button
                          onClick={() => window.open('https://youtu.be/YMRs1wb6Uok?si=nYYG5Mz_TYkO0Hzg', '_blank')}
                          className="px-3 py-1 bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600 transition-colors flex items-center gap-1"
                        >
                          <Play className="h-3 w-3" />
                          Watch on YouTube
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Video 5 - DZzsFyP43tY */}
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4 border border-indigo-200 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <div className="w-16 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-md">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">▶</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                          🎵 RAHWANA GANDRUNG - SWARANTARA
                        </h5>
                        <p className="text-xs text-gray-600 mb-2">Traditional Sundanese musical performance by Swarantara group</p>
                        <button
                          onClick={() => window.open('https://youtu.be/DZzsFyP43tY?si=1LrEJKmqpSTbMHkf', '_blank')}
                          className="px-3 py-1 bg-red-500 text-white rounded text-xs font-medium hover:bg-red-600 transition-colors flex items-center gap-1"
                        >
                          <Play className="h-3 w-3" />
                          Watch on YouTube
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Video Library Stats */}
                <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-lg p-3 border border-sky-200">
                  <div className="text-center">
                    <div className="text-lg font-bold text-sky-800">5</div>
                    <div className="text-xs text-sky-600">Live Performance Videos</div>
                    <div className="text-xs text-gray-600 mt-1">Authentic cultural experiences</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Interactive Practice Tools</h3>
              <p className="text-gray-600">Master Sundanese through engaging exercises and games</p>
            </div>

            {/* Enhanced Featured Practice Tools */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* Vocabulary Games - Enhanced */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-emerald-200 hover:border-emerald-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-emerald-100 rounded-2xl">
                    <Zap className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Vocabulary Games</h4>
                    <p className="text-sm text-emerald-600 font-medium">Kaulinan Kosakata</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                  Master Sundanese words through interactive flashcards, memory games, matching challenges, and timed quizzes. 
                  Progress from basic to advanced vocabulary with gamified learning.
                </p>
                
                {/* Game Types Preview */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-white bg-opacity-70 rounded-lg hover:bg-white hover:bg-opacity-90 transition-all cursor-pointer">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">Flashcard Memory</span>
                    <span className="ml-auto text-xs text-emerald-600">500+ words</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white bg-opacity-70 rounded-lg hover:bg-white hover:bg-opacity-90 transition-all cursor-pointer">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">Word Matching</span>
                    <span className="ml-auto text-xs text-teal-600">10 levels</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white bg-opacity-70 rounded-lg hover:bg-white hover:bg-opacity-90 transition-all cursor-pointer">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">Speed Quiz</span>
                    <span className="ml-auto text-xs text-emerald-600">Timed</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white bg-opacity-70 rounded-lg hover:bg-white hover:bg-opacity-90 transition-all cursor-pointer">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">Picture Match</span>
                    <span className="ml-auto text-xs text-teal-600">Visual</span>
                  </div>
                </div>
                
                {/* Progress Indicator */}
                <div className="mb-4 p-3 bg-white bg-opacity-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-700">Your Progress</span>
                    <span className="text-xs text-emerald-600">Level 3</span>
                  </div>
                  <div className="w-full bg-emerald-200 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-600">245 words mastered</span>
                    <span className="text-xs text-gray-600">65%</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setActiveTab('games')}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 hover:scale-105 transform"
                >
                  <Play className="h-5 w-5" />
                  Start Playing Games
                </button>
              </div>

              {/* Cultural Quiz - Enhanced */}
              <div className="bg-gradient-to-br from-teal-50 to-sky-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-teal-200 hover:border-teal-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-teal-100 rounded-2xl">
                    <Trophy className="h-8 w-8 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Cultural Quiz</h4>
                    <p className="text-sm text-teal-600 font-medium">Kuis Budaya Sunda</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                  Test your knowledge of Sundanese traditions, history, music, food, and customs. 
                  Earn badges and compete on leaderboards while learning cultural insights.
                </p>
                
                {/* Quiz Categories Preview */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-white bg-opacity-70 rounded-lg hover:bg-white hover:bg-opacity-90 transition-all cursor-pointer">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">Traditional Music</span>
                    <span className="ml-auto text-xs text-teal-600">25 questions</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white bg-opacity-70 rounded-lg hover:bg-white hover:bg-opacity-90 transition-all cursor-pointer">
                    <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">Food & Cuisine</span>
                    <span className="ml-auto text-xs text-sky-600">30 questions</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white bg-opacity-70 rounded-lg hover:bg-white hover:bg-opacity-90 transition-all cursor-pointer">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">History & Legends</span>
                    <span className="ml-auto text-xs text-teal-600">40 questions</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white bg-opacity-70 rounded-lg hover:bg-white hover:bg-opacity-90 transition-all cursor-pointer">
                    <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">Arts & Crafts</span>
                    <span className="ml-auto text-xs text-sky-600">20 questions</span>
                  </div>
                </div>
                
                {/* Achievement Badges */}
                <div className="mb-4 p-3 bg-white bg-opacity-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-700">Recent Achievements</span>
                    <span className="text-xs text-teal-600">3 Badges</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 rounded-full">
                      <span className="text-xs">🎵</span>
                      <span className="text-xs font-medium text-yellow-700">Music Expert</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 rounded-full">
                      <span className="text-xs">🍽️</span>
                      <span className="text-xs font-medium text-orange-700">Food Lover</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-purple-100 rounded-full">
                      <span className="text-xs">📚</span>
                      <span className="text-xs font-medium text-purple-700">Historian</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => setActiveTab('quiz')}
                  className="w-full py-3 bg-gradient-to-r from-teal-600 to-sky-600 text-white rounded-xl hover:from-teal-700 hover:to-sky-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 hover:scale-105 transform"
                >
                  <Target className="h-5 w-5" />
                  Take Cultural Quiz
                </button>
              </div>

              {/* Conversation AI - Enhanced */}
              <div className="bg-gradient-to-br from-slate-50 to-emerald-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-slate-200 hover:border-slate-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-slate-100 rounded-2xl">
                    <MessageCircle className="h-8 w-8 text-slate-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Conversation AI</h4>
                    <p className="text-sm text-slate-600 font-medium">AI Obrolan Sunda</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-6 leading-relaxed">
                  Practice real conversations with AI in various scenarios. From market shopping to cultural discussions, 
                  improve your speaking confidence with instant feedback and pronunciation tips.
                </p>
                
                {/* Conversation Scenarios Preview */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-white bg-opacity-70 rounded-lg hover:bg-white hover:bg-opacity-90 transition-all cursor-pointer">
                    <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">Market Shopping</span>
                    <span className="ml-auto text-xs text-slate-600">Beginner</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white bg-opacity-70 rounded-lg hover:bg-white hover:bg-opacity-90 transition-all cursor-pointer">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">Family Dinner</span>
                    <span className="ml-auto text-xs text-emerald-600">Intermediate</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white bg-opacity-70 rounded-lg hover:bg-white hover:bg-opacity-90 transition-all cursor-pointer">
                    <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">Cultural Events</span>
                    <span className="ml-auto text-xs text-slate-600">Advanced</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white bg-opacity-70 rounded-lg hover:bg-white hover:bg-opacity-90 transition-all cursor-pointer">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-800">Job Interview</span>
                    <span className="ml-auto text-xs text-emerald-600">Expert</span>
                  </div>
                </div>
                
                {/* AI Features */}
                <div className="mb-4 p-3 bg-white bg-opacity-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-700">AI Features</span>
                    <span className="text-xs text-slate-600">Real-time</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-lg">
                      <span className="text-xs">🎯</span>
                      <span className="text-xs font-medium text-slate-700">Pronunciation</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-emerald-100 rounded-lg">
                      <span className="text-xs">💬</span>
                      <span className="text-xs font-medium text-emerald-700">Grammar Tips</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-lg">
                      <span className="text-xs">🔊</span>
                      <span className="text-xs font-medium text-slate-700">Voice Analysis</span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-emerald-100 rounded-lg">
                      <span className="text-xs">📈</span>
                      <span className="text-xs font-medium text-emerald-700">Progress Track</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => setActiveTab('conversation')}
                  className="w-full py-3 bg-gradient-to-r from-slate-600 to-emerald-600 text-white rounded-xl hover:from-slate-700 hover:to-emerald-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 hover:scale-105 transform"
                >
                  <Mic className="h-5 w-5" />
                  Start AI Conversation
                </button>
              </div>
            </div>

            {/* Additional Practice Tools - Coming Soon */}
            <div className="bg-gradient-to-r from-slate-100 to-teal-100 rounded-2xl p-8">
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">🚀 More Practice Tools Coming Soon</h4>
                <p className="text-gray-600">We&apos;re developing additional interactive features for your learning journey</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Speaking Practice - Coming Soon */}
                <div className="bg-white bg-opacity-60 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gray-100 rounded-xl">
                      <Mic className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Speaking Practice</h5>
                      <p className="text-sm text-gray-500">Latihan Nyarita</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">AI voice recognition for pronunciation training</p>
                  <button disabled className="w-full py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed">
                    Coming Soon
                  </button>
                </div>

                {/* Writing Practice - Coming Soon */}
                <div className="bg-white bg-opacity-60 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gray-100 rounded-xl">
                      <PenTool className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">Writing Practice</h5>
                      <p className="text-sm text-gray-500">Latihan Nulis</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">Learn Sundanese script and sentence construction</p>
                  <button disabled className="w-full py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed">
                    Coming Soon
                  </button>
                </div>

                {/* VR Experience - Coming Soon */}
                <div className="bg-white bg-opacity-60 rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gray-100 rounded-xl">
                      <Eye className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900">VR Experience</h5>
                      <p className="text-sm text-gray-500">Pangalaman VR</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">Immersive virtual tours of West Java</p>
                  <button disabled className="w-full py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed">
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dictionary' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Comprehensive Sundanese Dictionary</h3>
              <p className="text-gray-600">Kamus Sunda Lengkap - Your complete language reference with cultural context</p>
              <div className="flex justify-center gap-4 mt-4 text-sm">
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full">2000+ Words</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">15 Categories</span>
                <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full">Audio Pronunciation</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                  {(() => {
                    const stats = getAudioStats();
                    return `${stats.nativeFiles} Native Audio`;
                  })()}
                </span>
              </div>
              
              {/* Audio Guide */}
              <div className="mt-6 bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-teal-600" />
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Native speaker audio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-teal-600" />
                    <span className="text-gray-700">AI text-to-speech</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-teal-300 rounded animate-pulse"></div>
                    <span className="text-gray-700">Playing audio</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Search & Filters */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-teal-100">
              <div className="mb-6">
                {/* Quick Access to Full Dictionary */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-6 w-6 text-amber-600" />
                      <div>
                        <h4 className="font-bold text-amber-900">Complete Historical Dictionary</h4>
                        <p className="text-sm text-amber-700">Jonathan Rigg&apos;s 1862 Comprehensive Dictionary (A-Z)</p>
                      </div>
                    </div>
                    <button
                      onClick={() => window.open('https://en.wikisource.org/wiki/A_Dictionary_of_the_Sunda_language', '_blank')}
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
                    >
                      Browse Full Dictionary →
                    </button>
                  </div>
                  <div className="mt-3 grid grid-cols-6 md:grid-cols-13 gap-2">
                    {['A', 'B', 'C', 'D', 'E', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'W', 'Y'].map((letter) => (
                      <button
                        key={letter}
                        onClick={() => window.open(`https://en.wikisource.org/wiki/A_Dictionary_of_the_Sunda_language/${letter}`, '_blank')}
                        className="w-8 h-8 bg-amber-100 text-amber-800 rounded text-sm font-bold hover:bg-amber-200 transition-colors"
                      >
                        {letter}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative mb-4">
                  <input
                    type="text"
                    value={dictionarySearchQuery}
                    onChange={handleDictionarySearchChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search Sundanese or English words... / Paluruh kecap Sunda atawa Inggris..."
                    className="w-full px-6 py-4 border-2 border-teal-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-lg"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-2">
                    {dictionarySearchQuery && (
                      <button 
                        onClick={clearDictionarySearch}
                        className="text-gray-500 hover:text-gray-700 p-2 bg-gray-100 rounded-lg"
                        title="Clear search (Esc)"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                    <button className="text-teal-600 hover:text-teal-700 p-2 bg-teal-100 rounded-lg">
                      <Volume2 className="h-5 w-5" />
                    </button>
                    <button className="text-emerald-600 hover:text-emerald-700 p-2 bg-emerald-100 rounded-lg">
                      <Search className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {/* Quick Search Suggestions */}
                  {!dictionarySearchQuery && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-teal-200 rounded-lg p-4 shadow-lg z-10">
                      <p className="text-sm text-gray-600 mb-3">Quick searches:</p>
                      <div className="flex flex-wrap gap-2">
                        {quickSearchTerms.map((term) => (
                          <button
                            key={term}
                            onClick={() => {
                              setDictionarySearchQuery(term);
                              performDictionarySearch(term);
                            }}
                            className="text-xs px-3 py-1 bg-teal-100 text-teal-700 rounded-full hover:bg-teal-200 transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        💡 Tip: Press Esc to clear search, Enter to select first result
                      </p>
                    </div>
                  )}
                </div>

                {/* Search Suggestions Dropdown */}
                {showSuggestions && searchResults.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border-2 border-teal-200 rounded-xl shadow-lg mt-1 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b border-teal-100">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-teal-800">
                          Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                        </span>
                        <button 
                          onClick={() => setShowSuggestions(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {searchResults.slice(0, 8).map((item) => (
                        <div
                          key={item.id}
                          className="p-4 hover:bg-teal-50 border-b border-teal-50 cursor-pointer transition-colors"
                          onClick={() => {
                            setDictionarySearchQuery(item.sunda);
                            setShowSuggestions(false);
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <h4 className="font-semibold text-teal-900">{item.sunda}</h4>
                              <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full">
                                {item.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  playDictionaryAudio(item);
                                }}
                                className={`p-2 rounded-lg transition-colors flex items-center gap-1 ${
                                  currentlyPlaying === item.id 
                                    ? 'bg-teal-200 text-teal-800' 
                                    : 'text-teal-600 hover:text-teal-700 hover:bg-teal-50'
                                }`}
                                title={`Play pronunciation${hasRealAudio(item) ? ' (native audio)' : ' (text-to-speech)'}`}
                              >
                                <Volume2 className="h-4 w-4" />
                                {hasRealAudio(item) && (
                                  <div className="w-2 h-2 bg-green-500 rounded-full" title="Native audio available" />
                                )}
                              </button>
                              {currentlyPlaying === item.id && (
                                <div className="text-xs text-teal-600 animate-pulse">Playing...</div>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-700 mb-1"><strong>{item.english}</strong></p>
                          <p className="text-sm text-teal-600 mb-1">{item.pronunciation}</p>
                          <p className="text-sm text-gray-600">{item.definition}</p>
                        </div>
                      ))}
                      {searchResults.length > 8 && (
                        <div className="p-4 text-center text-sm text-gray-500 bg-gray-50">
                          {searchResults.length - 8} more results available...
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Category Filters */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {['All', 'Greetings', 'Family', 'Food', 'Culture', 'Traditional Arts', 'Nature', 'Emotions', 'Historical'].map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryFilter(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-teal-600 text-white'
                          : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Search Filters */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={searchFilters.showCulturalContext}
                      onChange={() => handleFilterChange('showCulturalContext')}
                      className="text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-gray-700">Show cultural context</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={searchFilters.audioOnly}
                      onChange={() => handleFilterChange('audioOnly')}
                      className="text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-gray-700">Audio available only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={searchFilters.includeEtymology}
                      onChange={() => handleFilterChange('includeEtymology')}
                      className="text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-gray-700">Show etymology & historical notes</span>
                  </label>
                </div>
                
                {/* Category Filters */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    { name: 'All', count: '2000+', color: 'gray' },
                    { name: 'Greetings', count: '50', color: 'teal' },
                    { name: 'Family', count: '80', color: 'emerald' },
                    { name: 'Food', count: '200', color: 'orange' },
                    { name: 'Nature', count: '150', color: 'green' },
                    { name: 'Culture', count: '120', color: 'purple' },
                    { name: 'Traditional Arts', count: '90', color: 'indigo' },
                    { name: 'Emotions', count: '70', color: 'pink' },
                    { name: 'Actions', count: '180', color: 'blue' },
                    { name: 'Time', count: '60', color: 'yellow' },
                    { name: 'Places', count: '100', color: 'red' }
                  ].map((category) => (
                    <button key={category.name} className={`px-4 py-2 bg-${category.color}-100 text-${category.color}-700 rounded-lg hover:bg-${category.color}-200 transition-colors text-sm font-medium flex items-center gap-2`}>
                      {category.name}
                      <span className="text-xs bg-white bg-opacity-70 px-2 py-1 rounded-full">{category.count}</span>
                    </button>
                  ))}
                </div>
                
                {/* Search Options */}
                <div className="flex gap-4 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-teal-300 text-teal-600 focus:ring-teal-500" />
                    <span className="text-gray-700">Include etymology</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500" />
                    <span className="text-gray-700">Show cultural context</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-sky-300 text-sky-600 focus:ring-sky-500" />
                    <span className="text-gray-700">Audio available only</span>
                  </label>
                </div>
              </div>

              {/* Search Results Display */}
              {dictionarySearchQuery && searchResults.length > 0 && !showSuggestions && (
                <div className="bg-white border-2 border-teal-200 rounded-xl p-6 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-teal-900">
                      Search Results for &quot;{dictionarySearchQuery}&quot;
                    </h4>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-teal-600">
                        {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                      </span>
                      <button
                        onClick={clearDictionarySearch}
                        className="text-gray-500 hover:text-gray-700 p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((item) => (
                      <div
                        key={item.id}
                        className="border border-teal-100 rounded-lg p-4 hover:border-teal-300 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-teal-900">{item.sunda}</h5>
                            <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full">
                              {item.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => playDictionaryAudio(item)}
                              className={`p-2 rounded-lg transition-colors flex items-center gap-1 ${
                                currentlyPlaying === item.id 
                                  ? 'bg-teal-200 text-teal-800' 
                                  : 'text-teal-600 hover:text-teal-700 hover:bg-teal-50'
                              }`}
                              title={`Play pronunciation${hasRealAudio(item) ? ' (native audio)' : ' (text-to-speech)'}`}
                            >
                              <Volume2 className="h-4 w-4" />
                              {hasRealAudio(item) && (
                                <div className="w-2 h-2 bg-green-500 rounded-full" title="Native audio available" />
                              )}
                            </button>
                            {currentlyPlaying === item.id && (
                              <div className="text-xs text-teal-600 animate-pulse">Playing...</div>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-800 font-medium mb-2">{item.english}</p>
                        <p className="text-sm text-teal-600 mb-2">{item.pronunciation}</p>
                        <p className="text-sm text-gray-600 mb-3">{item.definition}</p>
                        {item.example && (
                          <div className="text-sm">
                            <p className="font-medium text-teal-800 mb-1">Example:</p>
                            <p className="text-teal-700 italic mb-1">&quot;{item.example}&quot;</p>
                            <p className="text-gray-600">&quot;{item.exampleTranslation}&quot;</p>
                          </div>
                        )}
                        {item.etymology && (
                          <div className="mt-3 p-2 bg-amber-50 rounded border-l-4 border-amber-300">
                            <p className="text-xs text-amber-800">
                              <strong>Etymology:</strong> {item.etymology}
                            </p>
                          </div>
                        )}
                        {item.cultural && searchFilters.showCulturalContext && (
                          <div className="mt-3 p-2 bg-emerald-50 rounded border-l-4 border-emerald-300">
                            <p className="text-xs text-emerald-800">
                              <strong>Cultural Note:</strong> {item.cultural}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results Message */}
              {dictionarySearchQuery && searchResults.length === 0 && !showSuggestions && (
                <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 mb-8 text-center">
                  <Search className="h-12 w-12 text-orange-400 mx-auto mb-3" />
                  <h4 className="text-lg font-bold text-orange-800 mb-2">No results found</h4>
                  <p className="text-orange-600 mb-4">
                    No words found for &quot;{dictionarySearchQuery}&quot;. Try different keywords or check the spelling.
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={clearDictionarySearch}
                      className="px-4 py-2 bg-orange-200 text-orange-800 rounded-lg hover:bg-orange-300 transition-colors"
                    >
                      Clear search
                    </button>
                    <button
                      onClick={() => handleCategoryFilter('All')}
                      className="px-4 py-2 bg-teal-200 text-teal-800 rounded-lg hover:bg-teal-300 transition-colors"
                    >
                      Browse all words
                    </button>
                  </div>
                </div>
              )}

              {/* Featured Word of the Day */}
              <div className="bg-gradient-to-r from-teal-100 to-emerald-100 rounded-xl p-6 border border-teal-200 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Star className="h-6 w-6 text-teal-600" />
                  <h4 className="text-xl font-bold text-gray-900">Word of the Day - Kecap Poé Ieu</h4>
                  <span className="ml-auto text-sm text-teal-600 bg-white bg-opacity-70 px-3 py-1 rounded-full">Featured</span>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <h5 className="text-3xl font-bold text-teal-900">Someah</h5>
                      <button className="p-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                        <Volume2 className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-teal-700 text-lg mb-2">/so.me.ah/ • adjective</p>
                    <p className="text-gray-800 text-lg mb-4"><strong>Friendly, hospitable, welcoming</strong></p>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <span className="text-xs px-2 py-1 bg-teal-200 text-teal-800 rounded">Cultural Value</span>
                        <span className="text-xs px-2 py-1 bg-emerald-200 text-emerald-800 rounded">Core Trait</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-70 p-4 rounded-lg">
                    <p className="text-gray-700 mb-3">
                      <strong>Example:</strong> &quot;Urang Sunda téh someah ka sémah&quot;<br/>
                      <em>Sundanese people are hospitable to guests</em>
                    </p>
                    <p className="text-sm text-teal-600 mb-3">
                      <strong>Cultural Context:</strong> Someah reflects the core Sundanese value of warmth and hospitality, deeply embedded in traditional culture
                    </p>
                    <div className="flex gap-2">
                      <button className="text-xs px-3 py-1 bg-teal-200 text-teal-800 rounded-full">Save Word</button>
                      <button className="text-xs px-3 py-1 bg-emerald-200 text-emerald-800 rounded-full">Practice</button>
                      <button className="text-xs px-3 py-1 bg-sky-200 text-sky-800 rounded-full">Share</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rich Dictionary Entries Grid */}
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                {/* Greetings Section */}
                <div className="border-2 border-teal-200 rounded-xl p-6 hover:border-teal-300 transition-colors">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-teal-900">Daily Greetings - Salam Poéan</h4>
                    <span className="text-sm bg-teal-100 text-teal-700 px-3 py-1 rounded-full">Essential</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { sunda: 'Wilujeng enjing', english: 'Good morning', time: 'Morning (5-10 AM)', pronunciation: '/wi.lu.jəŋ ən.jiŋ/' },
                      { sunda: 'Wilujeng wengi', english: 'Good night', time: 'Night (9 PM+)', pronunciation: '/wi.lu.jəŋ wə.ŋi/' },
                      { sunda: 'Kumaha damang?', english: 'How are you?', time: 'Anytime', pronunciation: '/ku.ma.ha da.maŋ/' },
                      { sunda: 'Damang waé', english: 'I am fine', time: 'Response', pronunciation: '/da.maŋ wa.eʔ/' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-teal-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-teal-900">{item.sunda}</h5>
                          <button className="text-teal-600 hover:text-teal-700 p-1">
                            <Volume2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-teal-700 mb-1">{item.pronunciation}</p>
                        <p className="text-gray-700 mb-1"><strong>{item.english}</strong></p>
                        <p className="text-xs text-teal-600">{item.time}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Family Terms Section */}
                <div className="border-2 border-emerald-200 rounded-xl p-6 hover:border-emerald-300 transition-colors">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-emerald-900">Family Terms - Kulawarga</h4>
                    <span className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">Basic</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { sunda: 'Kolot', english: 'Parents', detail: 'Both father and mother', pronunciation: '/ko.lot/' },
                      { sunda: 'Bapa', english: 'Father', detail: 'Formal term', pronunciation: '/ba.pa/' },
                      { sunda: 'Indung', english: 'Mother', detail: 'Traditional term', pronunciation: '/in.duŋ/' },
                      { sunda: 'Akang', english: 'Older brother', detail: 'Respectful address', pronunciation: '/a.kaŋ/' },
                      { sunda: 'Teteh', english: 'Older sister', detail: 'Affectionate term', pronunciation: '/tə.təh/' },
                      { sunda: 'Adi', english: 'Younger sibling', detail: 'Gender neutral', pronunciation: '/a.di/' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-emerald-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-emerald-900">{item.sunda}</h5>
                          <button className="text-emerald-600 hover:text-emerald-700 p-1">
                            <Volume2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-emerald-700 mb-1">{item.pronunciation}</p>
                        <p className="text-gray-700 mb-1"><strong>{item.english}</strong></p>
                        <p className="text-xs text-emerald-600">{item.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Food & Cuisine Section */}
                <div className="border-2 border-orange-200 rounded-xl p-6 hover:border-orange-300 transition-colors">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-orange-900">Traditional Food - Kadaharan Tradisional</h4>
                    <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full">Cultural</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { sunda: 'Nasi timbel', english: 'Rice wrapped in banana leaf', region: 'West Java', pronunciation: '/na.si tim.bəl/' },
                      { sunda: 'Karedok', english: 'Raw vegetable salad', region: 'Bandung area', pronunciation: '/ka.rə.doʔ/' },
                      { sunda: 'Lotek', english: 'Mixed vegetable with peanut sauce', region: 'Traditional', pronunciation: '/lo.təʔ/' },
                      { sunda: 'Peuyeum', english: 'Fermented cassava', region: 'Bandung specialty', pronunciation: '/pəy.jəm/' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-orange-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-orange-900">{item.sunda}</h5>
                          <button className="text-orange-600 hover:text-orange-700 p-1">
                            <Volume2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-orange-700 mb-1">{item.pronunciation}</p>
                        <p className="text-gray-700 mb-1"><strong>{item.english}</strong></p>
                        <p className="text-xs text-orange-600">{item.region}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cultural & Traditional Terms */}
                <div className="border-2 border-purple-200 rounded-xl p-6 hover:border-purple-300 transition-colors">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-purple-900">Cultural Values - Ajén Budaya</h4>
                    <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">Philosophy</span>
                  </div>
                  <div className="space-y-4">
                    {[
                      { sunda: 'Gotong royong', english: 'Mutual assistance', concept: 'Community cooperation', pronunciation: '/go.toŋ ro.joŋ/' },
                      { sunda: 'Silih asah', english: 'Mutual learning', concept: 'Educational philosophy', pronunciation: '/si.lih a.sah/' },
                      { sunda: 'Silih asih', english: 'Mutual love', concept: 'Social harmony', pronunciation: '/si.lih a.sih/' },
                      { sunda: 'Silih asuh', english: 'Mutual care', concept: 'Community support', pronunciation: '/si.lih a.suh/' }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-purple-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold text-purple-900">{item.sunda}</h5>
                          <button className="text-purple-600 hover:text-purple-700 p-1">
                            <Volume2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-purple-700 mb-1">{item.pronunciation}</p>
                        <p className="text-gray-700 mb-1"><strong>{item.english}</strong></p>
                        <p className="text-xs text-purple-600">{item.concept}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Extended Quick Reference */}
              <div className="bg-gradient-to-r from-slate-50 to-teal-50 rounded-xl p-6 border border-slate-200">
                <h4 className="text-lg font-bold text-gray-900 mb-6">Extended Quick Reference - Rujukan Lengkap</h4>
                <div className="grid md:grid-cols-4 gap-6">
                  <div>
                    <h5 className="font-semibold text-teal-800 mb-3 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Time Expressions
                    </h5>
                    <ul className="text-sm space-y-2">
                      <li className="flex justify-between">
                        <span>Isuk</span>
                        <span className="text-gray-600">Morning</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Siang</span>
                        <span className="text-gray-600">Noon</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Sonten</span>
                        <span className="text-gray-600">Afternoon</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Wengi</span>
                        <span className="text-gray-600">Night</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Emotions
                    </h5>
                    <ul className="text-sm space-y-2">
                      <li className="flex justify-between">
                        <span>Bagja</span>
                        <span className="text-gray-600">Happy</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Seuri</span>
                        <span className="text-gray-600">Smile</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Hariwang</span>
                        <span className="text-gray-600">Worry</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Someah</span>
                        <span className="text-gray-600">Friendly</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-sky-800 mb-3 flex items-center gap-2">
                      <Mountain className="h-4 w-4" />
                      Nature
                    </h5>
                    <ul className="text-sm space-y-2">
                      <li className="flex justify-between">
                        <span>Gunung</span>
                        <span className="text-gray-600">Mountain</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Situ</span>
                        <span className="text-gray-600">Lake</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Leuweung</span>
                        <span className="text-gray-600">Forest</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Sawah</span>
                        <span className="text-gray-600">Rice field</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-indigo-800 mb-3 flex items-center gap-2">
                      <Music className="h-4 w-4" />
                      Traditional Arts
                    </h5>
                    <ul className="text-sm space-y-2">
                      <li className="flex justify-between">
                        <span>Angklung</span>
                        <span className="text-gray-600">Bamboo music</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Wayang golek</span>
                        <span className="text-gray-600">Puppet show</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Jaipong</span>
                        <span className="text-gray-600">Traditional dance</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Kacapi suling</span>
                        <span className="text-gray-600">String & flute</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vocabulary Games Tab */}
        {activeTab === 'games' && (
          <div className="space-y-6">
            {!activeGame ? (
              // Game Selection Screen
              <>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Vocabulary Games</h3>
                  <p className="text-gray-600">Kaulinan Kosakata - Master Sundanese words through fun interactive games</p>
                  <div className="flex justify-center gap-4 mt-4 text-sm">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">500+ Words</span>
                    <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full">4 Game Types</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">Progressive Levels</span>
                  </div>
                </div>

                {/* Game Selection */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Flashcard Memory Game */}
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 border-2 border-emerald-200 hover:border-emerald-300 transition-all cursor-pointer hover:shadow-xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-emerald-100 rounded-2xl">
                        <Brain className="h-10 w-10 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Flashcard Memory</h4>
                        <p className="text-sm text-emerald-600 font-medium">Kartu Memori</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6">Learn and memorize Sundanese words using interactive flashcards with audio pronunciation and visual cues.</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center p-3 bg-white bg-opacity-70 rounded-lg">
                        <span className="text-sm font-medium">Basic Words</span>
                        <span className="text-xs text-emerald-600">10 cards</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white bg-opacity-70 rounded-lg">
                        <span className="text-sm font-medium">Food & Drink</span>
                        <span className="text-xs text-emerald-600">10 cards</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white bg-opacity-70 rounded-lg">
                        <span className="text-sm font-medium">Nature</span>
                        <span className="text-xs text-emerald-600">10 cards</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => startGame('flashcard', 'easy')}
                      className="w-full py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-semibold"
                    >
                      Start Flashcards
                    </button>
                  </div>

                  {/* Word Matching Game */}
                  <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 border-2 border-teal-200 hover:border-teal-300 transition-all cursor-pointer hover:shadow-xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-teal-100 rounded-2xl">
                        <Puzzle className="h-10 w-10 text-teal-600" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Word Matching</h4>
                        <p className="text-sm text-teal-600 font-medium">Pasangkeun Kecap</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6">Match Sundanese words with their English meanings in this engaging memory game.</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center p-3 bg-white bg-opacity-70 rounded-lg">
                        <span className="text-sm font-medium">Easy Level</span>
                        <span className="text-xs text-teal-600">6 pairs</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white bg-opacity-70 rounded-lg">
                        <span className="text-sm font-medium">Medium Level</span>
                        <span className="text-xs text-teal-600">10 pairs</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white bg-opacity-70 rounded-lg">
                        <span className="text-sm font-medium">Hard Level</span>
                        <span className="text-xs text-teal-600">15 pairs</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => startGame('matching', 'easy')}
                      className="w-full py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-colors font-semibold"
                    >
                      Start Matching Game
                    </button>
                  </div>

                  {/* Speed Quiz Game */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border-2 border-amber-200 hover:border-amber-300 transition-all cursor-pointer hover:shadow-xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-amber-100 rounded-2xl">
                        <Timer className="h-10 w-10 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Speed Quiz</h4>
                        <p className="text-sm text-amber-600 font-medium">Kuis Gancang</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6">Test your vocabulary knowledge in fast-paced timed quizzes. Challenge yourself and compete for high scores!</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center p-3 bg-white bg-opacity-70 rounded-lg">
                        <span className="text-sm font-medium">30 Second Sprint</span>
                        <span className="text-xs text-amber-600">Quick fire</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white bg-opacity-70 rounded-lg">
                        <span className="text-sm font-medium">2 Minute Challenge</span>
                        <span className="text-xs text-amber-600">Standard</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white bg-opacity-70 rounded-lg">
                        <span className="text-sm font-medium">5 Minute Marathon</span>
                        <span className="text-xs text-amber-600">Endurance</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => startGame('speed', 'easy')}
                      className="w-full py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors font-semibold"
                    >
                      Start Speed Quiz
                    </button>
                  </div>

                  {/* Picture Match Game */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200 hover:border-purple-300 transition-all cursor-pointer hover:shadow-xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-purple-100 rounded-2xl">
                        <ImageIcon className="h-10 w-10 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Picture Match</h4>
                        <p className="text-sm text-purple-600 font-medium">Cocokkeun Gambar</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6">Associate Sundanese words with beautiful emojis representing objects and concepts.</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between items-center p-3 bg-white bg-opacity-70 rounded-lg">
                        <span className="text-sm font-medium">Basic Objects</span>
                        <span className="text-xs text-purple-600">6 images</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white bg-opacity-70 rounded-lg">
                        <span className="text-sm font-medium">Food & Nature</span>
                        <span className="text-xs text-purple-600">10 images</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white bg-opacity-70 rounded-lg">
                        <span className="text-sm font-medium">Advanced Mix</span>
                        <span className="text-xs text-purple-600">15 images</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => startGame('picture', 'easy')}
                      className="w-full py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors font-semibold"
                    >
                      Start Picture Match
                    </button>
                  </div>
                </div>

                {/* Progress Tracking */}
                <div className="bg-gradient-to-r from-gray-50 to-emerald-50 rounded-2xl p-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">Your Gaming Progress</h4>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-white bg-opacity-70 rounded-xl">
                      <div className="text-2xl font-bold text-emerald-600">{gameWordsLearned.length}</div>
                      <div className="text-sm text-gray-600">Words Mastered</div>
                    </div>
                    <div className="text-center p-4 bg-white bg-opacity-70 rounded-xl">
                      <div className="text-2xl font-bold text-teal-600">18</div>
                      <div className="text-sm text-gray-600">Games Completed</div>
                    </div>
                    <div className="text-center p-4 bg-white bg-opacity-70 rounded-xl">
                      <div className="text-2xl font-bold text-amber-600">{totalXP}</div>
                      <div className="text-sm text-gray-600">Total Points</div>
                    </div>
                    <div className="text-center p-4 bg-white bg-opacity-70 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600">{dailyStreak}</div>
                      <div className="text-sm text-gray-600">Day Streak</div>
                    </div>
                  </div>
                </div>
              </>
            ) : showGameResult ? (
              // Game Results Screen
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <div className="text-6xl mb-4">
                    {gameScore >= 80 ? '🏆' : gameScore >= 60 ? '🎉' : '📚'}
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Game Completed!</h2>
                  <p className="text-xl text-gray-600 mb-6 capitalize">
                    {activeGame} Game - {gameLevel} Level
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600">{gameScore}</div>
                      <div className="text-sm text-gray-600">Final Score</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-600">{gameAnswers.length}</div>
                      <div className="text-sm text-gray-600">Items Completed</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-purple-600">
                        {Math.floor(gameScore * 0.3)}
                      </div>
                      <div className="text-sm text-gray-600">XP Earned</div>
                    </div>
                  </div>
                  
                  {earnedBadges.includes('Vocabulary Master') && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">New Badge Earned!</h3>
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        🏅 Vocabulary Master
                      </span>
                    </div>
                  )}
                  
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={resetGame}
                      className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                    >
                      Back to Games
                    </button>
                    <button
                      onClick={() => startGame(activeGame, gameLevel)}
                      className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                    >
                      Play Again
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Active Game Interface
              <div className="max-w-4xl mx-auto">
                {/* Game Header */}
                <div className="bg-white rounded-xl shadow-lg mb-6 overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold capitalize">
                        {activeGame} Game - {gameLevel} Level
                      </h2>
                      <button
                        onClick={resetGame}
                        className="text-white hover:text-gray-200 transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm opacity-80">
                        Score: {gameScore}
                      </div>
                      {activeGame === 'speed' && (
                        <div className="text-sm opacity-80">
                          Time: {gameTimeLeft}s
                        </div>
                      )}
                      {activeGame === 'flashcard' && (
                        <div className="text-sm opacity-80">
                          Card {currentFlashcard + 1} of {getCurrentGameData().length}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Game Content */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  {activeGame === 'flashcard' && (
                    // Flashcard Game
                    <div className="text-center">
                      <div 
                        className="mx-auto w-80 h-48 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 flex items-center justify-center mb-8"
                        onClick={flipFlashcard}
                      >
                        {(() => {
                          const currentCard = getCurrentGameData()[currentFlashcard];
                          return (
                            <div className="text-center">
                              {flashcardSide === 'front' ? (
                                <>
                                  <div className="text-4xl mb-4">{currentCard.image}</div>
                                  <div className="text-2xl font-bold text-gray-800">{currentCard.sunda}</div>
                                  <div className="text-sm text-gray-600 mt-2">{currentCard.pronunciation}</div>
                                </>
                              ) : (
                                <>
                                  <div className="text-2xl font-bold text-gray-800 mb-2">{currentCard.english}</div>
                                  <div className="text-sm text-gray-600">{currentCard.category}</div>
                                </>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                      
                      <p className="text-gray-600 mb-6">Click the card to flip it!</p>
                      
                      <div className="flex gap-4 justify-center mb-6">
                        <button
                          onClick={prevFlashcard}
                          disabled={currentFlashcard === 0}
                          className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>
                        <button
                          onClick={() => markWordLearned(getCurrentGameData()[currentFlashcard].sunda)}
                          className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                        >
                          I Know This!
                        </button>
                        <button
                          onClick={nextFlashcard}
                          className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}

                  {activeGame === 'matching' && (
                    // Matching Game
                    <div>
                      <h3 className="text-xl font-bold text-center mb-6">Match the pairs!</h3>
                      <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
                        {generateMatchingPairs().map((card) => (
                          <div
                            key={card.id}
                            onClick={() => handleCardClick(card.id)}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 text-center ${
                              matchedPairs.includes(card.id)
                                ? 'bg-green-100 border-green-500 text-green-800'
                                : selectedCards.includes(card.id)
                                ? 'bg-blue-100 border-blue-500 text-blue-800'
                                : 'bg-gray-100 border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <div className="text-sm font-medium">{card.content}</div>
                            <div className="text-xs text-gray-500 mt-1">{card.type}</div>
                          </div>
                        ))}
                      </div>
                      <div className="text-center mt-6">
                        <p className="text-gray-600">Matched: {matchedPairs.length / 2} pairs</p>
                      </div>
                    </div>
                  )}

                  {activeGame === 'speed' && (
                    // Speed Quiz Game
                    <div>
                      {(() => {
                        const currentWord = getCurrentGameData()[currentGameQuestion];
                        const options = shuffleArray([
                          { text: currentWord.english, correct: true },
                          { text: 'House', correct: false },
                          { text: 'Water', correct: false },
                          { text: 'Beautiful', correct: false }
                        ].slice(0, 4));
                        
                        return (
                          <>
                            <div className="text-center mb-8">
                              <div className="text-4xl mb-4">{currentWord.image}</div>
                              <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentWord.sunda}</h3>
                              <p className="text-gray-600">{currentWord.pronunciation}</p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                              {options.map((option, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleGameAnswer(option)}
                                  className="p-4 bg-gray-100 hover:bg-gray-200 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors"
                                >
                                  {option.text}
                                </button>
                              ))}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}

                  {activeGame === 'picture' && (
                    // Picture Matching Game
                    <div>
                      {(() => {
                        const currentWord = getCurrentGameData()[currentGameQuestion];
                        const imageOptions = shuffleArray([
                          { emoji: currentWord.image, correct: true },
                          { emoji: '🏠', correct: false },
                          { emoji: '🌸', correct: false },
                          { emoji: '🍚', correct: false }
                        ].slice(0, 4));
                        
                        return (
                          <>
                            <div className="text-center mb-8">
                              <h3 className="text-2xl font-bold text-gray-800 mb-2">{currentWord.sunda}</h3>
                              <p className="text-gray-600 mb-2">{currentWord.english}</p>
                              <p className="text-sm text-gray-500">{currentWord.pronunciation}</p>
                            </div>
                            
                            <p className="text-center text-gray-600 mb-6">Which picture matches this word?</p>
                            
                            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                              {imageOptions.map((option, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleGameAnswer(option)}
                                  className="p-8 bg-gray-100 hover:bg-gray-200 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors text-4xl"
                                >
                                  {option.emoji}
                                </button>
                              ))}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cultural Quiz Tab */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            {!activeQuizCategory ? (
              // Quiz Category Selection
              <>
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Cultural Quiz</h2>
                  <p className="text-gray-600">Test your knowledge of Sundanese culture</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(quizCategories).map(([key, category]) => (
                    <div
                      key={key}
                      className={`bg-gradient-to-br ${getQuizCategoryColor(category.color)} border-2 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105`}
                      onClick={() => startQuiz(key)}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-3xl">{category.icon}</div>
                        <div className="text-sm font-medium text-gray-600">
                          {category.questions.length} Questions
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          Difficulty: {category.difficulty}
                        </div>
                        <button className={`px-4 py-2 text-white rounded-lg font-medium ${getQuizButtonColor(category.color)} transition-colors`}>
                          Start Quiz
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : showQuizResult ? (
              // Quiz Results
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <div className="text-6xl mb-4">
                    {quizScore >= 80 ? '🏆' : quizScore >= 60 ? '🎉' : '📚'}
                  </div>
                  
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
                  <p className="text-xl text-gray-600 mb-6">
                    {quizCategories[activeQuizCategory as keyof typeof quizCategories].name}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600">{quizScore}</div>
                      <div className="text-sm text-gray-600">Total Score</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-600">
                        {quizAnswers.filter((answer, index) => {
                          const category = quizCategories[activeQuizCategory as keyof typeof quizCategories];
                          return answer === category.questions[index].correctAnswer;
                        }).length}
                      </div>
                      <div className="text-sm text-gray-600">Correct</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-purple-600">
                        {Math.floor(quizScore * 0.5)}
                      </div>
                      <div className="text-sm text-gray-600">XP Earned</div>
                    </div>
                  </div>
                  
                  {earnedBadges.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">New Badges Earned!</h3>
                      <div className="flex justify-center gap-2">
                        {earnedBadges.slice(-1).map((badge, index) => (
                          <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                            🏅 {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={resetQuiz}
                      className="px-6 py-3 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
                    >
                      Back to Categories
                    </button>
                    <button
                      onClick={() => startQuiz(activeQuizCategory)}
                      className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Active Quiz
              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  {/* Quiz Header */}
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold">
                        {quizCategories[activeQuizCategory as keyof typeof quizCategories].name}
                      </h2>
                      <button
                        onClick={resetQuiz}
                        className="text-white hover:text-gray-200 transition-colors"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm opacity-80">
                        Question {currentQuizQuestion + 1} of {quizCategories[activeQuizCategory as keyof typeof quizCategories].questions.length}
                      </div>
                      <div className="text-sm opacity-80">
                        Score: {quizScore}
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mt-4">
                      <div
                        className="bg-white h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${((currentQuizQuestion + 1) / quizCategories[activeQuizCategory as keyof typeof quizCategories].questions.length) * 100}%`
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Quiz Content */}
                  <div className="p-8">
                    {(() => {
                      const category = quizCategories[activeQuizCategory as keyof typeof quizCategories];
                      const question = category.questions[currentQuizQuestion];
                      
                      return (
                        <>
                          <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                              {question.question}
                            </h3>
                            {question.questionSunda && (
                              <p className="text-gray-600 italic mb-4">
                                &ldquo;{question.questionSunda}&rdquo;
                              </p>
                            )}
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {question.points} points
                              </span>
                              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                                {question.difficulty}
                              </span>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            {question.options.map((option, index) => (
                              <button
                                key={index}
                                onClick={() => handleQuizAnswer(index)}
                                disabled={selectedAnswer !== null}
                                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                                  selectedAnswer === null
                                    ? 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                    : selectedAnswer === index
                                    ? index === question.correctAnswer
                                      ? 'border-green-500 bg-green-50 text-green-800'
                                      : 'border-red-500 bg-red-50 text-red-800'
                                    : index === question.correctAnswer
                                    ? 'border-green-500 bg-green-50 text-green-800'
                                    : 'border-gray-200 bg-gray-50'
                                }`}
                              >
                                <div className="flex items-center">
                                  <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium mr-3">
                                    {String.fromCharCode(65 + index)}
                                  </span>
                                  {option}
                                </div>
                              </button>
                            ))}
                          </div>
                          
                          {showExplanation && (
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                              <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
                              <p className="text-blue-700">{question.explanation}</p>
                            </div>
                          )}
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Conversation AI Tab */}
        {activeTab === 'conversation' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Conversation Practice</h3>
              <p className="text-gray-600">AI Obrolan Sunda - Practice real conversations with intelligent AI tutors</p>
              <div className="flex justify-center gap-4 mt-4 text-sm">
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full">12 Scenarios</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">Voice Recognition</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">Real-time Feedback</span>
              </div>
            </div>

            {/* Conversation Scenarios */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Beginner Scenarios */}
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-green-500" />
                  Beginner Level
                </h4>
                
                {/* Market Shopping */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 hover:border-green-300 transition-all cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-green-100 rounded-xl">
                      <ShoppingCart className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <h5 className="text-lg font-bold text-gray-900">Market Shopping</h5>
                      <p className="text-sm text-green-600 font-medium">Balanja di Pasar</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-4">Practice buying fruits, vegetables, and daily necessities from a friendly market vendor.</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">10-15 minutes</span>
                    <span className="text-xs text-green-600">✓ Completed 3 times</span>
                  </div>
                  <button className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium">
                    Start Conversation
                  </button>
                </div>

                {/* Family Dinner */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200 hover:border-emerald-300 transition-all cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-emerald-100 rounded-xl">
                      <Home className="h-8 w-8 text-emerald-600" />
                    </div>
                    <div>
                      <h5 className="text-lg font-bold text-gray-900">Family Dinner</h5>
                      <p className="text-sm text-emerald-600 font-medium">Dahar Bareng Kulawarga</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-4">Join a warm family dinner conversation, discussing food and sharing daily stories.</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">15-20 minutes</span>
                    <span className="text-xs text-emerald-600">✓ Completed 1 time</span>
                  </div>
                  <button className="w-full py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-medium">
                    Start Conversation
                  </button>
                </div>
              </div>

              {/* Advanced Scenarios */}
              <div className="space-y-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-orange-500" />
                  Advanced Level
                </h4>
                
                {/* Cultural Events */}
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200 hover:border-purple-300 transition-all cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <Calendar className="h-8 w-8 text-purple-600" />
                    </div>
                    <div>
                      <h5 className="text-lg font-bold text-gray-900">Cultural Events</h5>
                      <p className="text-sm text-purple-600 font-medium">Acara Budaya</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-4">Discuss traditional ceremonies, festivals, and cultural practices with cultural experts.</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">20-30 minutes</span>
                    <span className="text-xs text-gray-500">Not yet attempted</span>
                  </div>
                  <button className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium">
                    Start Conversation
                  </button>
                </div>

                {/* Job Interview */}
                <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl p-6 border-2 border-slate-200 hover:border-slate-300 transition-all cursor-pointer hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-slate-100 rounded-xl">
                      <Briefcase className="h-8 w-8 text-slate-600" />
                    </div>
                    <div>
                      <h5 className="text-lg font-bold text-gray-900">Job Interview</h5>
                      <p className="text-sm text-slate-600 font-medium">Wawancara Karya</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm mb-4">Practice professional conversations in formal Sundanese for business and career contexts.</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">25-35 minutes</span>
                    <span className="text-xs text-gray-500">Locked - Complete 5 scenarios first</span>
                  </div>
                  <button disabled className="w-full py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed font-medium">
                    Locked
                  </button>
                </div>
              </div>
            </div>

            {/* AI Features & Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* AI Features */}
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-cyan-500" />
                  AI Features
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-white bg-opacity-60 rounded-lg">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <span className="text-sm font-medium">Real-time pronunciation feedback</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-white bg-opacity-60 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium">Grammar correction</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-white bg-opacity-60 rounded-lg">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    <span className="text-sm font-medium">Cultural context tips</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-white bg-opacity-60 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium">Adaptive difficulty</span>
                  </div>
                </div>
              </div>

              {/* Progress Stats */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Your Progress
                </h4>
                <div className="space-y-4">
                  <div className="text-center p-3 bg-white bg-opacity-60 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">4</div>
                    <div className="text-sm text-gray-600">Scenarios Completed</div>
                  </div>
                  <div className="text-center p-3 bg-white bg-opacity-60 rounded-lg">
                    <div className="text-2xl font-bold text-emerald-600">85%</div>
                    <div className="text-sm text-gray-600">Average Accuracy</div>
                  </div>
                  <div className="text-center p-3 bg-white bg-opacity-60 rounded-lg">
                    <div className="text-2xl font-bold text-teal-600">2.5h</div>
                    <div className="text-sm text-gray-600">Total Practice Time</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Settings className="h-5 w-5 text-amber-500" />
                  Quick Actions
                </h4>
                <div className="space-y-3">
                  <button className="w-full py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg transition-colors text-sm font-medium">
                    Practice Pronunciation
                  </button>
                  <button className="w-full py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-lg transition-colors text-sm font-medium">
                    Review Mistakes
                  </button>
                  <button className="w-full py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg transition-colors text-sm font-medium">
                    Voice Settings
                  </button>
                  <button className="w-full py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-lg transition-colors text-sm font-medium">
                    Download Progress
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Daily Challenge */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 border-2 border-indigo-200">
              {!challengeStarted ? (
                // Challenge Preview
                <div className="text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                    <Sparkles className="h-6 w-6 text-indigo-500" />
                    Today&apos;s AI Challenge
                  </h4>
                  {currentChallenge && (
                    <>
                      <h5 className="text-lg font-semibold text-indigo-800 mb-2">{currentChallenge.title}</h5>
                      <p className="text-sm text-indigo-600 mb-3">{currentChallenge.titleSunda}</p>
                      <p className="text-gray-600 mb-6">{currentChallenge.description}</p>
                      
                      <div className="flex justify-center gap-4 mb-6">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                          {currentChallenge.duration} minutes
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                          +{currentChallenge.xpReward} XP
                        </span>
                        <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">
                          {currentChallenge.specialBadge}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyBadgeColor(currentChallenge.difficulty)}`}>
                          {currentChallenge.difficulty}
                        </span>
                      </div>
                      
                      <div className="flex justify-center gap-4">
                        <button 
                          onClick={startChallenge}
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all font-semibold flex items-center gap-2"
                        >
                          <Play className="h-5 w-5" />
                          Accept Challenge
                        </button>
                        <button 
                          onClick={() => setCurrentChallenge(dailyChallenges[(dailyChallenges.indexOf(currentChallenge) + 1) % dailyChallenges.length])}
                          className="bg-white text-indigo-600 border-2 border-indigo-200 px-6 py-3 rounded-xl hover:bg-indigo-50 transition-all font-semibold"
                        >
                          Try Different Challenge
                        </button>
                      </div>
                      
                      {/* Today's Stats */}
                      <div className="mt-6 pt-6 border-t border-indigo-200">
                        <div className="flex justify-center gap-6 text-sm">
                          <div className="text-center">
                            <div className="text-lg font-bold text-indigo-600">{dailyStreak}</div>
                            <div className="text-gray-600">Day Streak</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-purple-600">{totalXP}</div>
                            <div className="text-gray-600">Total XP</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-pink-600">12</div>
                            <div className="text-gray-600">Badges Earned</div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                // Active Challenge Interface
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      <Sparkles className="h-6 w-6 text-indigo-500" />
                      {currentChallenge?.title}
                    </h4>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-gray-600">
                        Score: {challengeScore} pts
                      </span>
                      <button 
                        onClick={resetChallenge}
                        className="text-gray-500 hover:text-gray-700 p-2"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Conversation Area */}
                  <div className="bg-white rounded-xl p-6 mb-6 max-h-96 overflow-y-auto">
                    <div className="space-y-4">
                      {challengeMessages.map((msg, idx) => (
                        <div 
                          key={idx} 
                          className={`flex ${msg.speaker === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-3/4 p-4 rounded-2xl ${
                            msg.speaker === 'user' 
                              ? 'bg-indigo-500 text-white' 
                              : msg.speaker === 'system'
                              ? 'bg-green-100 text-green-800 border-2 border-green-200'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            <div className="font-medium text-sm mb-1">
                              {msg.name}
                            </div>
                            <div className="text-lg">
                              {msg.message}
                            </div>
                            {msg.translation && (
                              <div className="text-sm opacity-75 mt-2 italic">
                                {msg.translation}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Input Area */}
                  {!challengeCompleted && (
                    <div className="space-y-4">
                      {/* Hints */}
                      {currentChallenge?.conversation[challengeProgress]?.hints && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                          <div className="text-sm font-medium text-amber-800 mb-2">💡 Hints:</div>
                          <ul className="text-sm text-amber-700 space-y-1">
                            {currentChallenge.conversation[challengeProgress].hints.map((hint: string, idx: number) => (
                              <li key={idx}>• {hint}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Response Input */}
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && userInput.trim() && handleChallengeResponse(userInput.trim())}
                          placeholder="Type your response in Sundanese..."
                          className="flex-1 px-4 py-3 border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <button
                          onClick={() => userInput.trim() && handleChallengeResponse(userInput.trim())}
                          disabled={!userInput.trim()}
                          className="px-6 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                          Send
                        </button>
                      </div>

                      {/* Quick Response Buttons */}
                      {currentChallenge?.conversation[challengeProgress]?.expectedResponse && (
                        <div className="flex flex-wrap gap-2">
                          <div className="text-sm text-gray-600 mb-2 w-full">Quick responses:</div>
                          {currentChallenge.conversation[challengeProgress].expectedResponse.slice(0, 3).map((response: string, idx: number) => (
                            <button
                              key={idx}
                              onClick={() => handleChallengeResponse(response)}
                              className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm"
                            >
                              {response}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Completion State */}
                  {challengeCompleted && (
                    <div className="text-center pt-6 border-t border-indigo-200">
                      <div className="text-2xl mb-4">🎉</div>
                      <h5 className="text-lg font-bold text-green-700 mb-2">Challenge Completed!</h5>
                      <p className="text-gray-600 mb-4">
                        Final Score: {challengeScore} points | XP Earned: +{currentChallenge?.xpReward}
                      </p>
                      <div className="flex justify-center gap-4">
                        <button 
                          onClick={resetChallenge}
                          className="px-6 py-3 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors font-medium"
                        >
                          Try Again
                        </button>
                        <button 
                          onClick={() => {
                            resetChallenge();
                            setCurrentChallenge(dailyChallenges[(dailyChallenges.indexOf(currentChallenge) + 1) % dailyChallenges.length]);
                          }}
                          className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors font-medium"
                        >
                          Next Challenge
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
