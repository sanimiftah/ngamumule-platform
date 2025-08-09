import { MessageSquare, BookOpen, Globe, ChevronRight } from 'lucide-react';
import { SpecializedAgentChat } from '@/components/SpecializedAgentChat';
import { LanguageLearningChat } from '@/components/LanguageLearningChat';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section - Language Learning Focus */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-full shadow-lg border border-gray-200">
              <Globe className="h-6 w-6 text-blue-500" />
              <span className="font-semibold text-gray-700">Master Any Language with AI</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Personal
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Language Tutor</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Learn languages faster with AI-powered interactive lessons, real conversation practice, 
            and personalized coaching. From vocabulary to cultural insights, master any language naturally.
          </p>

          {/* Language Learning Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Conversations</h3>
              <p className="text-gray-600 text-sm">Practice real-world scenarios like ordering food, asking directions, or job interviews</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Vocabulary Building</h3>
              <p className="text-gray-600 text-sm">Learn words with spaced repetition, context examples, and memory techniques</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Globe className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cultural Context</h3>
              <p className="text-gray-600 text-sm">Understand etiquette, customs, and appropriate language use in different situations</p>
            </div>
          </div>

          {/* Supported Languages */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Languages</h3>
            
            {/* Major Languages */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">🌍 Major World Languages</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { name: 'Spanish', flag: '🇪🇸' },
                  { name: 'French', flag: '🇫🇷' },
                  { name: 'German', flag: '🇩🇪' },
                  { name: 'Italian', flag: '🇮🇹' },
                  { name: 'Portuguese', flag: '🇵🇹' },
                  { name: 'Chinese', flag: '🇨🇳' },
                  { name: 'Japanese', flag: '🇯🇵' },
                  { name: 'Korean', flag: '🇰🇷' }
                ].map((lang) => (
                  <div key={lang.name} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-sm font-medium text-gray-700">{lang.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Indonesian Traditional Languages */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
              <h4 className="text-sm font-medium text-orange-800 mb-3 flex items-center gap-2">
                🇮🇩 Traditional Indonesian Languages 
                <span className="px-2 py-1 bg-orange-200 text-orange-800 text-xs rounded-full">COMPREHENSIVE COURSES</span>
              </h4>
              <div className="flex flex-wrap justify-center gap-3 mb-4">
                {[
                  { name: 'Indonesian (Bahasa)', flag: '🇮🇩', course: false },
                  { name: 'Sundanese (Basa Sunda)', flag: '🏔️', course: true },
                  { name: 'Javanese (Basa Jawa)', flag: '🏛️', course: false },
                  { name: 'Balinese (Basa Bali)', flag: '🏝️', course: false },
                  { name: 'Minangkabau', flag: '🏕️', course: false },
                  { name: 'Batak', flag: '🌋', course: false },
                  { name: 'Betawi', flag: '🏙️', course: false }
                ].map((lang) => (
                  <div key={lang.name} className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-orange-200 relative">
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-sm font-medium text-orange-800">{lang.name}</span>
                    {lang.course && (
                      <a 
                        href="/learn/sundanese"
                        target="_blank"
                        className="ml-2 px-2 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600 transition-colors"
                      >
                        Full Course
                      </a>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Sundanese Feature Highlight */}
              <div className="bg-white rounded-lg p-4 border border-orange-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    🏔️
                  </div>
                  <div>
                    <h5 className="font-semibold text-orange-900">Featured: Complete Sundanese Learning Experience</h5>
                    <p className="text-sm text-orange-700">Puseur Diajar Basa Sunda</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-orange-800 mb-3">
                  <div className="flex items-center gap-1">
                    <span>📚</span>
                    <span>77 Lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🎵</span>
                    <span>Traditional Music</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🏛️</span>
                    <span>Cultural Heritage</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>📜</span>
                    <span>Poetry & Arts</span>
                  </div>
                </div>
                <a 
                  href="/learn/sundanese"
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm font-medium"
                >
                  🎓 Start Complete Course
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
              
              <p className="text-xs text-orange-700 mt-3 text-center">
                🌟 Preserving Indonesian cultural heritage through comprehensive language learning
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Language Learning Chat Interface */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Start Learning Now</h2>
            <p className="text-lg text-gray-600">
              Experience interactive language learning with your AI tutor
            </p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <LanguageLearningChat />
          </div>
        </div>
      </section>

      {/* Other AI Agents Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete AI Assistant Suite</h2>
            <p className="text-lg text-gray-600">
              Beyond language learning, explore our specialized AI agents for every aspect of your life
            </p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <SpecializedAgentChat />
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Ngamumule AI?</h2>
            <p className="text-lg text-gray-600">
              See how our agentic AI approach compares to traditional solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Traditional AI Assistants</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                  <span className="text-gray-600">Black box responses</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                  <span className="text-gray-600">Limited tool integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                  <span className="text-gray-600">Generic, one-size-fits-all</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                  <span className="text-gray-600">No learning progression</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Ngamumule Agentic AI</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span className="text-gray-600">Transparent reasoning process</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span className="text-gray-600">Advanced tool ecosystem</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span className="text-gray-600">Specialized domain experts</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span className="text-gray-600">Adaptive learning algorithms</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience the Future of AI?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who are already learning and growing with specialized AI agents
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Start Learning Languages
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Explore All Agents
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
