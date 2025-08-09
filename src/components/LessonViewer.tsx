'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Volume2, 
  BookOpen, 
  Target, 
  Lightbulb, 
  Users, 
  Award, 
  CheckCircle,
  Circle,
  Clock,
  Star,
  Brain,
  MessageCircle,
  Headphones,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { DetailedLesson, Exercise } from '@/lib/sundanese-basics-lessons';

interface LessonViewerProps {
  lesson: DetailedLesson;
  onBack: () => void;
  onComplete: () => void;
  onNext: () => void;
}

export function LessonViewer({ lesson, onBack, onComplete, onNext }: LessonViewerProps) {
  const [activeSection, setActiveSection] = useState<'overview' | 'vocabulary' | 'grammar' | 'culture' | 'practice'>('overview');
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string | number | boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

  // Audio pronunciation function
  const playPronunciation = (text: string, isPlaying: boolean) => {
    if (isPlaying) {
      // Stop current audio
      setPlayingAudio(null);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    // Start new audio
    setPlayingAudio(text);
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      
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
      utterance.rate = 0.8; // Slower rate for learning
      utterance.pitch = 1.0;
      
      utterance.onend = () => {
        setPlayingAudio(null);
      };
      
      utterance.onerror = () => {
        setPlayingAudio(null);
        console.log('Audio pronunciation not available');
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback: just reset the playing state
      setTimeout(() => setPlayingAudio(null), 1500);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'interactive': return 'bg-teal-100 text-teal-700';
      case 'video': return 'bg-sky-100 text-sky-700';
      case 'audio': return 'bg-emerald-100 text-emerald-700';
      case 'reading': return 'bg-slate-100 text-slate-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const handleExerciseAnswer = (exerciseId: string, answer: string | number | boolean) => {
    setUserAnswers(prev => ({ ...prev, [exerciseId]: answer }));
  };

  const checkExerciseAnswers = () => {
    setShowResults(true);
    const correctCount = lesson.content.exercises.filter(ex => {
      const userAnswer = userAnswers[ex.id];
      return userAnswer === ex.correctAnswer || userAnswer === ex.correctAnswer.toString();
    }).length;
    
    if (correctCount >= lesson.content.exercises.length * 0.7) {
      setCompletedSections(prev => new Set([...prev, 'practice']));
    }
  };

  const markSectionComplete = (section: string) => {
    setCompletedSections(prev => new Set([...prev, section]));
  };

  const allSectionsComplete = completedSections.size >= 4; // overview, vocabulary, culture, practice

  return (
    <div className="bg-gradient-to-br from-sky-50 via-emerald-50 to-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-teal-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={onBack}
                className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
                <p className="text-teal-600 font-medium">{lesson.titleSunda}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(lesson.type)}`}>
                {lesson.type}
              </span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {lesson.duration}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Lesson Sections</h3>
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: <Target className="h-4 w-4" /> },
                  { id: 'vocabulary', label: 'Vocabulary', icon: <BookOpen className="h-4 w-4" /> },
                  { id: 'grammar', label: 'Grammar', icon: <Brain className="h-4 w-4" /> },
                  { id: 'culture', label: 'Culture', icon: <Users className="h-4 w-4" /> },
                  { id: 'practice', label: 'Practice', icon: <Award className="h-4 w-4" /> }
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id as 'overview' | 'vocabulary' | 'grammar' | 'culture' | 'practice')}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      activeSection === section.id
                        ? 'bg-teal-100 text-teal-700 border border-teal-200'
                        : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    {section.icon}
                    <span className="font-medium">{section.label}</span>
                    {completedSections.has(section.id) && (
                      <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                    )}
                  </button>
                ))}
              </nav>

              {/* Progress */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{Math.round((completedSections.size / 4) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(completedSections.size / 4) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Complete Lesson Button */}
              {allSectionsComplete && (
                <button
                  onClick={onComplete}
                  className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all font-medium flex items-center justify-center gap-2"
                >
                  <Award className="h-4 w-4" />
                  Complete Lesson
                </button>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              {/* Overview Section */}
              {activeSection === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Lesson Overview</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">{lesson.description}</p>
                    <p className="text-gray-700 leading-relaxed">{lesson.content.introduction}</p>
                  </div>

                  {/* Learning Objectives */}
                  <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-6 border border-teal-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Target className="h-5 w-5 text-teal-600" />
                      Learning Objectives
                    </h3>
                    <ul className="space-y-2">
                      {lesson.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-xs font-bold text-teal-600">{index + 1}</span>
                          </div>
                          <span className="text-gray-700">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Audio Files */}
                  {lesson.audioFiles.length > 0 && (
                    <div className="bg-gradient-to-r from-emerald-50 to-sky-50 rounded-lg p-6 border border-emerald-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Headphones className="h-5 w-5 text-emerald-600" />
                        Audio Resources
                      </h3>
                      <div className="space-y-3">
                        {lesson.audioFiles.map((audio, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-emerald-200">
                            <span className="font-medium text-gray-700">{audio}</span>
                            <button 
                              onClick={() => playPronunciation(audio.replace(/\.(mp3|wav|ogg)$/, ''), playingAudio === audio)}
                              className={`p-2 rounded-lg transition-all ${
                                playingAudio === audio
                                  ? 'bg-emerald-200 text-emerald-800' 
                                  : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                              }`}
                              title="Play audio"
                            >
                              {playingAudio === audio ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => markSectionComplete('overview')}
                    className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
                  >
                    Mark as Read
                    <CheckCircle className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Vocabulary Section */}
              {activeSection === 'vocabulary' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Vocabulary</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                      <Volume2 className="h-4 w-4 text-emerald-600" />
                      <span>Click <Volume2 className="h-3 w-3 inline mx-1" /> to hear pronunciation</span>
                    </div>
                  </div>
                  
                  <div className="grid gap-6">
                    {lesson.content.vocabulary.map((item, index) => (
                      <div key={index} className="bg-gradient-to-r from-slate-50 to-teal-50 rounded-lg p-6 border border-slate-200">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-gray-900">{item.sunda}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                                {item.difficulty}
                              </span>
                            </div>
                            <p className="text-teal-600 font-medium mb-1">{item.pronunciation}</p>
                            <p className="text-gray-600 italic">{item.partOfSpeech}</p>
                          </div>
                          <button 
                            onClick={() => playPronunciation(item.sunda, playingAudio === item.sunda)}
                            className={`p-3 rounded-lg transition-all ${
                              playingAudio === item.sunda
                                ? 'bg-emerald-200 text-emerald-800' 
                                : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                            }`}
                            title="Play pronunciation"
                          >
                            {playingAudio === item.sunda ? <Pause className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-lg font-semibold text-gray-900">{item.english}</p>
                          </div>
                          
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm text-gray-600">Example:</p>
                              <button 
                                onClick={() => playPronunciation(item.example, playingAudio === item.example)}
                                className={`p-1 rounded transition-all ${
                                  playingAudio === item.example
                                    ? 'bg-teal-200 text-teal-800' 
                                    : 'bg-teal-100 text-teal-600 hover:bg-teal-200'
                                }`}
                                title="Play example pronunciation"
                              >
                                {playingAudio === item.example ? <Pause className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                              </button>
                            </div>
                            <p className="font-medium text-gray-900">{item.example}</p>
                            <p className="text-gray-600 italic">{item.exampleTranslation}</p>
                          </div>
                          
                          {item.culturalContext && (
                            <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                              <p className="text-sm text-teal-600 mb-1">Cultural Context:</p>
                              <p className="text-teal-800">{item.culturalContext}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => markSectionComplete('vocabulary')}
                    className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
                  >
                    Mark Vocabulary Learned
                    <CheckCircle className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Grammar Section */}
              {activeSection === 'grammar' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Grammar Points</h2>
                  
                  {lesson.content.grammar ? (
                    <div className="space-y-6">
                      {lesson.content.grammar.map((point, index) => (
                        <div key={index} className="bg-gradient-to-r from-sky-50 to-emerald-50 rounded-lg p-6 border border-sky-200">
                          <h3 className="text-lg font-bold text-gray-900 mb-3">{point.title}</h3>
                          <p className="text-gray-700 mb-4">{point.explanation}</p>
                          
                          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                            <p className="text-sm text-gray-600 mb-2">Pattern:</p>
                            <code className="text-teal-600 font-mono bg-teal-50 px-2 py-1 rounded">{point.pattern}</code>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <p className="text-sm font-semibold text-gray-900">Examples:</p>
                            {point.examples.map((example, exIndex) => (
                              <p key={exIndex} className="text-gray-700 pl-4 border-l-2 border-teal-200">{example}</p>
                            ))}
                          </div>
                          
                          <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                            <p className="text-sm font-semibold text-yellow-800 mb-1">Tips:</p>
                            <ul className="text-sm text-yellow-700 space-y-1">
                              {point.tips.map((tip, tipIndex) => (
                                <li key={tipIndex} className="flex items-start gap-2">
                                  <Lightbulb className="h-3 w-3 mt-1 flex-shrink-0" />
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No grammar points for this lesson.</p>
                    </div>
                  )}

                  <button
                    onClick={() => markSectionComplete('grammar')}
                    className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
                  >
                    Mark Grammar Understood
                    <CheckCircle className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Culture Section */}
              {activeSection === 'culture' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Cultural Insights</h2>
                  
                  <div className="space-y-6">
                    {lesson.content.culturalNotes.map((note, index) => (
                      <div key={index} className={`rounded-lg p-6 border-l-4 ${getImportanceColor(note.importance)}`}>
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-bold text-gray-900">{note.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              note.importance === 'high' ? 'bg-red-100 text-red-700' :
                              note.importance === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {note.importance} importance
                            </span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              {note.category}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{note.content}</p>
                      </div>
                    ))}
                  </div>

                  {/* Example Sentences */}
                  <div className="bg-gradient-to-r from-emerald-50 to-sky-50 rounded-lg p-6 border border-emerald-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-emerald-600" />
                      Example Conversations
                    </h3>
                    <div className="space-y-4">
                      {lesson.content.examples.map((example, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              example.formality === 'formal' ? 'bg-slate-100 text-slate-700' :
                              example.formality === 'polite' ? 'bg-teal-100 text-teal-700' :
                              'bg-emerald-100 text-emerald-700'
                            }`}>
                              {example.formality}
                            </span>
                            <span className="text-xs text-gray-500">{example.context}</span>
                            <button 
                              onClick={() => playPronunciation(example.sunda, playingAudio === example.sunda)}
                              className={`ml-auto p-1.5 rounded transition-all ${
                                playingAudio === example.sunda
                                  ? 'bg-emerald-200 text-emerald-800' 
                                  : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                              }`}
                              title="Play pronunciation"
                            >
                              {playingAudio === example.sunda ? <Pause className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                            </button>
                          </div>
                          <p className="font-medium text-gray-900 mb-1">{example.sunda}</p>
                          <p className="text-gray-600 mb-1">{example.english}</p>
                          <p className="text-sm text-teal-600">{example.pronunciation}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => markSectionComplete('culture')}
                    className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
                  >
                    Mark Culture Learned
                    <CheckCircle className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Practice Section */}
              {activeSection === 'practice' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Exercises</h2>
                  
                  {!showResults ? (
                    <div className="space-y-6">
                      {lesson.content.exercises.map((exercise, index) => (
                        <div key={exercise.id} className="bg-gradient-to-r from-slate-50 to-sky-50 rounded-lg p-6 border border-slate-200">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Question {index + 1} ({exercise.points} points)
                              </h3>
                              <p className="text-gray-700">{exercise.question}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              exercise.type === 'multiple-choice' ? 'bg-blue-100 text-blue-700' :
                              exercise.type === 'translation' ? 'bg-green-100 text-green-700' :
                              exercise.type === 'pronunciation' ? 'bg-purple-100 text-purple-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {exercise.type}
                            </span>
                          </div>
                          
                          {exercise.type === 'multiple-choice' && exercise.options && (
                            <div className="space-y-2">
                              {exercise.options.map((option, optIndex) => (
                                <label key={optIndex} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                                  <input
                                    type="radio"
                                    name={exercise.id}
                                    value={optIndex}
                                    onChange={(e) => handleExerciseAnswer(exercise.id, parseInt(e.target.value))}
                                    className="text-teal-600"
                                  />
                                  <span className="text-gray-700">{option}</span>
                                </label>
                              ))}
                            </div>
                          )}
                          
                          {(exercise.type === 'translation' || exercise.type === 'pronunciation') && (
                            <textarea
                              placeholder="Type your answer here..."
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                              rows={3}
                              onChange={(e) => handleExerciseAnswer(exercise.id, e.target.value)}
                            />
                          )}
                        </div>
                      ))}
                      
                      <button
                        onClick={checkExerciseAnswers}
                        className="w-full px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all font-medium flex items-center justify-center gap-2"
                      >
                        <Award className="h-5 w-5" />
                        Check Answers
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="text-center py-8">
                        <Award className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Exercise Complete!</h3>
                        <p className="text-gray-600">
                          You got {lesson.content.exercises.filter(ex => {
                            const userAnswer = userAnswers[ex.id];
                            return userAnswer === ex.correctAnswer || userAnswer === ex.correctAnswer.toString();
                          }).length} out of {lesson.content.exercises.length} correct.
                        </p>
                      </div>
                      
                      {/* Results */}
                      <div className="space-y-4">
                        {lesson.content.exercises.map((exercise, index) => {
                          const userAnswer = userAnswers[exercise.id];
                          const isCorrect = userAnswer === exercise.correctAnswer || userAnswer === exercise.correctAnswer.toString();
                          
                          return (
                            <div key={exercise.id} className={`p-4 rounded-lg border-2 ${
                              isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                            }`}>
                              <div className="flex items-start gap-3">
                                {isCorrect ? (
                                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                                ) : (
                                  <Circle className="h-5 w-5 text-red-500 mt-1" />
                                )}
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900 mb-1">{exercise.question}</p>
                                  <p className="text-sm text-gray-600 mb-2">{exercise.explanation}</p>
                                  {!isCorrect && (
                                    <p className="text-sm text-red-600">
                                      Correct answer: {exercise.correctAnswer}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="flex gap-4">
                        <button
                          onClick={() => {
                            setShowResults(false);
                            setUserAnswers({});
                            setCurrentExercise(0);
                          }}
                          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
                        >
                          <RotateCcw className="h-4 w-4" />
                          Retry
                        </button>
                        <button
                          onClick={onNext}
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 transition-all font-medium flex items-center justify-center gap-2"
                        >
                          Next Lesson
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
