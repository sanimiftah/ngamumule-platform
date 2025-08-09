'use client';

import React, { useState } from 'react';
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
  Zap
} from 'lucide-react';

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
}

interface CulturalContent {
  id: string;
  title: string;
  titleSunda: string;
  type: 'instrument' | 'song' | 'story' | 'landmark' | 'tradition';
  description: string;
  audioAvailable: boolean;
  difficulty: string;
}

export function SundaneseLearningPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'culture' | 'media' | 'practice' | 'dictionary'>('overview');

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
      category: 'language'
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
      category: 'language'
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
      category: 'arts'
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
      category: 'arts'
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
      category: 'arts'
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
      category: 'history'
    }
  ];

  const culturalHighlights: CulturalContent[] = [
    {
      id: 'angklung',
      title: 'Angklung',
      titleSunda: 'Angklung',
      type: 'instrument',
      description: 'UNESCO World Heritage bamboo musical instrument',
      audioAvailable: true,
      difficulty: 'Beginner'
    },
    {
      id: 'kacapi-suling',
      title: 'Kacapi Suling',
      titleSunda: 'Kacapi Suling',
      type: 'instrument',
      description: 'Traditional string and flute ensemble music',
      audioAvailable: true,
      difficulty: 'Intermediate'
    },
    {
      id: 'es-lilin',
      title: 'Es Lilin Song',
      titleSunda: 'Lagu Es Lilin',
      type: 'song',
      description: 'Popular traditional Sundanese children\'s song',
      audioAvailable: true,
      difficulty: 'Beginner'
    },
    {
      id: 'sangkuriang',
      title: 'Sangkuriang Legend',
      titleSunda: 'Legenda Sangkuriang',
      type: 'story',
      description: 'Famous Sundanese legend about the creation of Tangkuban Perahu',
      audioAvailable: true,
      difficulty: 'Intermediate'
    },
    {
      id: 'borobudur',
      title: 'Gedung Sate',
      titleSunda: 'Gedung Sate',
      type: 'landmark',
      description: 'Iconic landmark of Bandung, West Java',
      audioAvailable: false,
      difficulty: 'Beginner'
    },
    {
      id: 'seren-taun',
      title: 'Seren Taun Festival',
      titleSunda: 'Upacara Seren Taun',
      type: 'tradition',
      description: 'Traditional harvest festival celebration',
      audioAvailable: false,
      difficulty: 'Advanced'
    }
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-fuchsia-50">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-fuchsia-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Mountain className="h-10 w-10 animate-pulse" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
                Puseur Diajar Basa Sunda
              </h1>
              <Mountain className="h-10 w-10 animate-pulse" />
            </div>
            <h2 className="text-3xl font-semibold text-pink-100 mb-6">Complete Sundanese Learning Experience</h2>
            <p className="text-xl text-pink-100 max-w-4xl mx-auto mb-8">
              🌸 Welcome to the most comprehensive Sundanese learning platform! Master the beautiful language of West Java 
              through interactive lessons, cultural immersion, traditional music, poetry, and authentic experiences. 
              From basic greetings to advanced literature - your complete journey awaits!
            </p>
            
            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-8 text-pink-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">150+</div>
                <div className="text-sm">Interactive Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-sm">Vocabulary Words</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-sm">Cultural Stories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">25+</div>
                <div className="text-sm">Traditional Songs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">100+</div>
                <div className="text-sm">Audio Recordings</div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-pink-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
                🎯 Start Learning Now
              </button>
              <button className="px-6 py-3 bg-purple-500 bg-opacity-20 border-2 border-white text-white rounded-lg font-semibold hover:bg-opacity-30 transition-all duration-300">
                📖 Take Level Test
              </button>
              <button className="px-6 py-3 bg-pink-500 bg-opacity-20 border-2 border-white text-white rounded-lg font-semibold hover:bg-opacity-30 transition-all duration-300">
                🎵 Listen to Music
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-pink-200 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
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
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                  <div className="text-xs text-purple-600">{tab.sunda}</div>
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
            {/* Personal Progress Dashboard */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Wilujeng Sumping! Welcome Back! 🌸</h3>
                  <p className="text-purple-100">Continue your beautiful Sundanese learning journey</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">Level 3</div>
                  <div className="text-purple-200">Intermediate</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center backdrop-blur-sm">
                  <div className="text-3xl font-bold">127</div>
                  <div className="text-sm text-purple-200">Words Mastered</div>
                  <div className="text-xs text-purple-300">Kecap nu dikawasa</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center backdrop-blur-sm">
                  <div className="text-3xl font-bold">23</div>
                  <div className="text-sm text-purple-200">Lessons Completed</div>
                  <div className="text-xs text-purple-300">Palajaran rampung</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center backdrop-blur-sm">
                  <div className="text-3xl font-bold">12</div>
                  <div className="text-sm text-purple-200">Cultural Stories</div>
                  <div className="text-xs text-purple-300">Carita budaya</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-xl p-4 text-center backdrop-blur-sm">
                  <div className="text-3xl font-bold">15</div>
                  <div className="text-sm text-purple-200">Day Streak</div>
                  <div className="text-xs text-purple-300">Poé berturut-turut</div>
                </div>
              </div>

              <div className="mt-6 bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress to Level 4</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-purple-300 bg-opacity-30 rounded-full h-3">
                  <div className="bg-white h-3 rounded-full transition-all duration-500" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>

            {/* Today's Learning Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-pink-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Calendar className="h-6 w-6 text-purple-600" />
                Today&apos;s Learning Plan
                <span className="text-lg text-purple-600 font-normal">Rencana Diajar Dinten Ayeuna</span>
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {/* Daily Lesson */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                      <BookOpen className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Daily Lesson</h4>
                      <p className="text-sm text-purple-600">Palajaran Poean</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">Learn about Sundanese traditional ceremonies and their cultural significance</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">15 minutes</span>
                    <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium">
                      Continue →
                    </button>
                  </div>
                </div>

                {/* Vocabulary Practice */}
                <div className="bg-gradient-to-br from-pink-50 to-fuchsia-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-pink-100 rounded-xl group-hover:bg-pink-200 transition-colors">
                      <Zap className="h-6 w-6 text-pink-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Vocabulary Drill</h4>
                      <p className="text-sm text-pink-600">Latihan Kosakata</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">Practice 20 new words about family relationships in Sundanese culture</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">10 minutes</span>
                    <button className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors text-sm font-medium">
                      Practice →
                    </button>
                  </div>
                </div>

                {/* Cultural Story */}
                <div className="bg-gradient-to-br from-fuchsia-50 to-purple-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-fuchsia-100 rounded-xl group-hover:bg-fuchsia-200 transition-colors">
                      <Heart className="h-6 w-6 text-fuchsia-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Cultural Story</h4>
                      <p className="text-sm text-fuchsia-600">Carita Budaya</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">Listen to the legend of Lutung Kasarung with audio narration</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">12 minutes</span>
                    <button className="px-4 py-2 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600 transition-colors text-sm font-medium">
                      Listen →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Achievements */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-pink-100">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  Recent Achievements
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Star className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Sisindiran Master</p>
                      <p className="text-sm text-gray-600">Completed 10 traditional poetry lessons</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                    <div className="p-2 bg-pink-100 rounded-lg">
                      <Music className="h-4 w-4 text-pink-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Music Enthusiast</p>
                      <p className="text-sm text-gray-600">Learned 5 traditional songs</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-fuchsia-50 rounded-lg">
                    <div className="p-2 bg-fuchsia-100 rounded-lg">
                      <Award className="h-4 w-4 text-fuchsia-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Cultural Explorer</p>
                      <p className="text-sm text-gray-600">Discovered 8 landmarks</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-xl border border-pink-100">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Bookmark className="h-6 w-6 text-purple-500" />
                  Quick Access
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left">
                    <Volume2 className="h-6 w-6 text-purple-600 mb-2" />
                    <p className="font-medium text-gray-900">Pronunciation</p>
                    <p className="text-xs text-gray-600">Listen & repeat</p>
                  </button>
                  <button className="p-4 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors text-left">
                    <FileText className="h-6 w-6 text-pink-600 mb-2" />
                    <p className="font-medium text-gray-900">Grammar</p>
                    <p className="text-xs text-gray-600">Rules & patterns</p>
                  </button>
                  <button className="p-4 bg-fuchsia-50 rounded-lg hover:bg-fuchsia-100 transition-colors text-left">
                    <Camera className="h-6 w-6 text-fuchsia-600 mb-2" />
                    <p className="font-medium text-gray-900">Virtual Tour</p>
                    <p className="text-xs text-gray-600">Explore places</p>
                  </button>
                  <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left">
                    <Headphones className="h-6 w-6 text-purple-600 mb-2" />
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
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Learning Modules</h3>
              <p className="text-gray-600">Structured learning path from basics to advanced Sundanese mastery</p>
            </div>

            <div className="grid gap-6">
              {learningModules.map((module) => (
                <div key={module.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        {module.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-xl font-semibold text-gray-900">{module.title}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(module.difficulty)}`}>
                            {module.difficulty}
                          </span>
                          <div className="flex items-center gap-1 text-gray-500">
                            {getCategoryIcon(module.category)}
                            <span className="text-xs">{module.category}</span>
                          </div>
                        </div>
                        <p className="text-purple-600 font-medium mb-2">{module.titleSunda}</p>
                        <p className="text-gray-600 mb-4">{module.description}</p>
                        
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{module.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${module.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            {module.lessons} lessons
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            ~{module.lessons * 15} minutes
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2">
                        {module.progress > 0 ? 'Continue' : 'Start'}
                        <ChevronRight className="h-4 w-4" />
                      </button>
                      {module.progress > 0 && (
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          Review
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'culture' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Cultural Treasures</h3>
              <p className="text-gray-600">Discover the rich heritage of Sundanese culture</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {culturalHighlights.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-purple-600 font-medium">{item.titleSunda}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(item.difficulty.toLowerCase())}`}>
                      {item.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 capitalize">{item.type}</span>
                    <div className="flex gap-2">
                      {item.audioAvailable && (
                        <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors">
                          <Volume2 className="h-4 w-4" />
                        </button>
                      )}
                      <button className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors">
                        <Play className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
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
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-2xl font-bold mb-2">🎵 Featured: Traditional Angklung Performance</h4>
                  <p className="text-purple-100 mb-4">Experience the UNESCO World Heritage bamboo orchestra</p>
                  <div className="flex items-center gap-4">
                    <button className="px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center gap-2">
                      <Play className="h-5 w-5" />
                      Watch Now
                    </button>
                    <button className="px-6 py-3 bg-purple-400 bg-opacity-30 border border-white text-white rounded-lg font-semibold hover:bg-opacity-40 transition-colors flex items-center gap-2">
                      <Download className="h-5 w-5" />
                      Download
                    </button>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="w-32 h-32 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                    <Video className="h-16 w-16" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Categories */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Traditional Music */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Music className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Traditional Music</h4>
                </div>
                <div className="space-y-3">
                  {['Kacapi Suling', 'Angklung Melodies', 'Kendang Rhythms', 'Gamelan Degung'].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
                      <span className="text-sm font-medium">{item}</span>
                      <Play className="h-4 w-4 text-purple-600" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Pronunciation Guide */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-pink-100 rounded-lg">
                    <Volume2 className="h-6 w-6 text-pink-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Pronunciation</h4>
                </div>
                <div className="space-y-3">
                  {['Basic Greetings', 'Numbers & Counting', 'Family Terms', 'Daily Expressions'].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors cursor-pointer">
                      <span className="text-sm font-medium">{item}</span>
                      <Volume2 className="h-4 w-4 text-pink-600" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Cultural Videos */}
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-fuchsia-100 rounded-lg">
                    <Video className="h-6 w-6 text-fuchsia-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Cultural Videos</h4>
                </div>
                <div className="space-y-3">
                  {['Traditional Ceremonies', 'Cooking Tutorials', 'Dance Performances', 'Craft Making'].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-fuchsia-50 rounded-lg hover:bg-fuchsia-100 transition-colors cursor-pointer">
                      <span className="text-sm font-medium">{item}</span>
                      <Video className="h-4 w-4 text-fuchsia-600" />
                    </div>
                  ))}
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

            {/* Practice Categories */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Speaking Practice */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border border-purple-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Mic className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Speaking Practice</h4>
                    <p className="text-sm text-purple-600">Latihan Nyarita</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">Practice pronunciation with AI voice recognition and get instant feedback</p>
                <button className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                  Start Speaking
                </button>
              </div>

              {/* Vocabulary Games */}
              <div className="bg-gradient-to-br from-pink-50 to-fuchsia-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border border-pink-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-pink-100 rounded-xl">
                    <Zap className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Vocabulary Games</h4>
                    <p className="text-sm text-pink-600">Kaulinan Kosakata</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">Fun matching games, flashcards, and memory challenges</p>
                <button className="w-full py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                  Play Games
                </button>
              </div>

              {/* Writing Practice */}
              <div className="bg-gradient-to-br from-fuchsia-50 to-purple-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border border-fuchsia-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-fuchsia-100 rounded-xl">
                    <FileText className="h-6 w-6 text-fuchsia-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Writing Practice</h4>
                    <p className="text-sm text-fuchsia-600">Latihan Nulis</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">Learn to write Sundanese script and practice sentence construction</p>
                <button className="w-full py-2 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600 transition-colors">
                  Start Writing
                </button>
              </div>

              {/* Conversation Simulator */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border border-purple-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Conversation AI</h4>
                    <p className="text-sm text-purple-600">Obrolan AI</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">Practice real conversations with AI in different scenarios</p>
                <button className="w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                  Start Chat
                </button>
              </div>

              {/* Cultural Quiz */}
              <div className="bg-gradient-to-br from-pink-50 to-fuchsia-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border border-pink-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-pink-100 rounded-xl">
                    <Trophy className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Cultural Quiz</h4>
                    <p className="text-sm text-pink-600">Kuis Budaya</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">Test your knowledge of Sundanese culture and traditions</p>
                <button className="w-full py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors">
                  Take Quiz
                </button>
              </div>

              {/* Virtual Reality */}
              <div className="bg-gradient-to-br from-fuchsia-50 to-purple-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border border-fuchsia-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-fuchsia-100 rounded-xl">
                    <Eye className="h-6 w-6 text-fuchsia-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">VR Experience</h4>
                    <p className="text-sm text-fuchsia-600">Pangalaman VR</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">Immersive virtual tours of West Java landmarks and markets</p>
                <button className="w-full py-2 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600 transition-colors">
                  Enter VR
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dictionary' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Comprehensive Sundanese Dictionary</h3>
              <p className="text-gray-600">Kamus Sunda Lengkap - Your complete language reference with cultural context</p>
            </div>

            {/* Enhanced Search */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-pink-100">
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search Sundanese or English words... / Paluruh kecap Sunda atawa Inggris..."
                    className="w-full px-6 py-4 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-lg"
                  />
                  <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-600 hover:text-purple-700">
                    <Volume2 className="h-6 w-6" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {['Greetings', 'Family', 'Food', 'Nature', 'Culture', 'Traditional Arts'].map((category) => (
                    <button key={category} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm">
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-6">
                {/* Featured Word of the Day */}
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="h-6 w-6 text-purple-600" />
                    <h4 className="text-xl font-bold text-gray-900">Word of the Day - Kecap Poé Ieu</h4>
                  </div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h5 className="text-2xl font-bold text-purple-900 mb-2">Someah</h5>
                      <p className="text-purple-700 text-lg">/so.me.ah/</p>
                    </div>
                    <button className="p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                      <Volume2 className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-gray-800 mb-4"><strong>Friendly, hospitable, welcoming</strong> - adjective describing the warm Sundanese character</p>
                  <div className="bg-white bg-opacity-70 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Example:</strong> &quot;Urang Sunda téh someah ka sémah&quot; - Sundanese people are hospitable to guests
                    </p>
                    <p className="text-xs text-purple-600 mt-2">Cultural note: Someah reflects the core Sundanese value of warmth and hospitality</p>
                  </div>
                </div>

                {/* Dictionary Entries */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border-2 border-purple-200 rounded-xl p-6 hover:border-purple-300 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">Kumaha</h4>
                      <button className="text-purple-600 hover:text-purple-700 p-2 bg-purple-100 rounded-lg">
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-purple-600 mb-2">/ku.ma.ha/</p>
                    <p className="text-gray-700 mb-3"><strong>How</strong> - interrogative word</p>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Example:</strong> &quot;Kumaha damang?&quot; - How are you?
                      </p>
                      <div className="flex gap-2">
                        <button className="text-xs px-2 py-1 bg-purple-200 text-purple-800 rounded">Save</button>
                        <button className="text-xs px-2 py-1 bg-pink-200 text-pink-800 rounded">Practice</button>
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-pink-200 rounded-xl p-6 hover:border-pink-300 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">Angklung</h4>
                      <button className="text-pink-600 hover:text-pink-700 p-2 bg-pink-100 rounded-lg">
                        <Volume2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-pink-600 mb-2">/aŋ.kluŋ/</p>
                    <p className="text-gray-700 mb-3"><strong>Angklung</strong> - traditional bamboo musical instrument</p>
                    <div className="bg-pink-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Cultural note:</strong> UNESCO World Heritage instrument played by shaking bamboo tubes
                      </p>
                      <div className="flex gap-2">
                        <button className="text-xs px-2 py-1 bg-pink-200 text-pink-800 rounded">Listen</button>
                        <button className="text-xs px-2 py-1 bg-purple-200 text-purple-800 rounded">Learn More</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Reference */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Quick Reference - Rujukan Gancang</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h5 className="font-semibold text-purple-800 mb-2">Common Greetings</h5>
                      <ul className="text-sm space-y-1">
                        <li>Wilujeng enjing - Good morning</li>
                        <li>Kumaha damang? - How are you?</li>
                        <li>Hatur nuhun - Thank you</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-pink-800 mb-2">Family Terms</h5>
                      <ul className="text-sm space-y-1">
                        <li>Kolot - Parents</li>
                        <li>Adi - Younger sibling</li>
                        <li>Akang - Older brother</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-fuchsia-800 mb-2">Cultural Terms</h5>
                      <ul className="text-sm space-y-1">
                        <li>Gotong royong - Mutual help</li>
                        <li>Silih asah - Learning together</li>
                        <li>Someah - Hospitality</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
