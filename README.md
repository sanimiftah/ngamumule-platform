# Ngamumule AI - Sundanese Language Learnin### Cultural Features

- **Traditional Music Player** - Authentic Sundanese instrumental recordings
- **Story Collection** -## Cultural Impact & Mission

Ngamumule AI is more than a language learning app - it's a cultural preservation initiative:

- **Heritage Preservation** - Digitizing and preserving Sundanese cultural knowledge
- **Community Building** - Connecting Sundanese speakers worldwide
- **Educational Innovation** - Modern technology serving traditional wisdom
- **Cultural Bridge** - Making Sundanese culture accessible globally
- **Intergenerational Learning** - Helping families maintain cultural connectionsy tales like Sangkuriang and Lutung Kasarung
- **Cultural Landmarks** - Virtual tours of historical sites
- **Traditional Food** - Culinary culture and recipes
- **Performing Arts** - Wayang Golek, traditional dances, and ceremoniesorm

**Ngamumule** means "to learn" in Sundanese - A comprehensive AI-powered language learning platform dedicated to preserving and teaching the beautiful Sundanese language and culture of West Java, Indonesia.

Built with Next.js 15, TypeScript, and Tailwind CSS, this modern web application combines cutting-edge AI technology with rich cultural content to create an immersive learning experience.

## What We've Built

### Core Features

- **Comprehensive Learning System** - Complete Sundanese language curriculum from basics to advanced
- **AI-Powered Tutoring** - Intelligent language learning assistant with cultural context
- **User Authentication** - Secure sign-up/sign-in with guest mode and progress tracking
- **Cultural Immersion** - Traditional music, instruments, stories, and arts integration
- **Interactive Dictionary** - Searchable Sundanese-English dictionary with pronunciation guides
- **Gamified Learning** - Vocabulary games, quizzes, and challenges for engaging practice
- **Conversation Practice** - AI-powered chat for real-world conversation skills

### Learning Modules

1. **Sundanese Basics** (Dasar-dasar Basa Sunda)
   - Greetings and basic phrases
   - Family members and relationships
   - Numbers, time, and dates
   - Essential vocabulary

2. **Speech Levels** (Undak Usuk Basa)
   - Formal vs informal speech
   - Respectful communication
   - Cultural hierarchy understanding

3. **Traditional Arts & Culture**
   - Music instruments (Angklung, Kacapi, Suling)
   - Traditional stories and legends
   - Poetry (Sisindiran, Pupuh)
   - Cultural values and practices

4. **Interactive Learning Tools**
   - Pronunciation guides with audio
   - Cultural context explanations
   - Progress tracking and achievements
   - Adaptive difficulty levels

### Cultural Features

- **� Traditional Music Player** - Authentic Sundanese instrumental recordings
- **� Story Collection** - Legendary tales like Sangkuriang and Lutung Kasarung
- **🏛️ Cultural Landmarks** - Virtual tours of historical sites
- **🍽️ Traditional Food** - Culinary culture and recipes
- **🎭 Performing Arts** - Wayang Golek, traditional dances, and ceremonies

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/sanimiftah/Ngamumule-AI.git
cd Ngamumule-AI
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main homepage
│   ├── layout.tsx         # Root layout with authentication
│   └── learn/             # Learning routes
│       └── sundanese/     # Sundanese learning page
├── components/            # React components
│   ├── SundaneseLearningPage.tsx      # Main learning interface
│   ├── AuthProvider.tsx              # Authentication context
│   ├── AuthHeader.tsx                # Navigation with auth
│   ├── AuthModal.tsx                 # Sign in/up modal
│   ├── ChatInterface.tsx             # Basic chat component
│   ├── LanguageLearningChat.tsx      # Language learning chat
│   ├── SpecializedAgentChat.tsx      # AI tutoring system
│   ├── AgentChatInterface.tsx        # Agentic AI chat
│   ├── AgentToolsShowcase.tsx        # Tool demonstration
│   ├── FeatureGrid.tsx               # Feature overview
│   └── LessonViewer.tsx              # Lesson content viewer
├── lib/                   # Utility functions and configurations
│   ├── utils.ts                      # Common utilities
│   ├── agent.ts                      # Main agent logic
│   ├── agent-tools.ts                # Available AI tools
│   ├── specialized-agents.ts         # Language tutoring agents
│   ├── language-learning-config.ts   # Learning configuration
│   ├── language-learning-tools.ts    # Learning-specific tools
│   ├── sundanese-content.ts          # Cultural content data
│   ├── sundanese-basics-lessons.ts   # Lesson content
│   ├── education-tutor-tools.ts      # Educational tools
│   └── personal-assistant-tools.ts   # Assistant capabilities
├── types/                 # TypeScript type definitions
│   ├── index.ts          # Common types
│   └── agent.ts          # Agent-specific types
└── public/               # Static assets
    ├── audio/            # Sundanese audio files
    │   ├── instruments/  # Traditional music recordings
    │   │   ├── angklung/
    │   │   ├── kacapi/
    │   │   ├── suling/
    │   │   ├── kendang/
    │   │   ├── rebab/
    │   │   ├── bonang/
    │   │   └── gamelan-degung/
    │   └── songs/        # Traditional songs
    └── icons/            # Cultural icons and images
```

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Authentication**: React Context with localStorage
- **Audio**: HTML5 Audio API with Web Speech API fallback
- **Icons**: Lucide React & Heroicons
- **AI Integration**: AI SDK (OpenAI compatible)
- **Development**: ESLint, Turbopack

## Key Dependencies

- `next` - React framework with App Router
- `typescript` - Type safety
- `tailwindcss` - Utility-first CSS framework
- `@ai-sdk/openai` - AI integration
- `lucide-react` - Modern icon library
- `@heroicons/react` - Additional icon set
- `@headlessui/react` - Accessible UI components
- `clsx` - Conditional styling utility

## � Cultural Impact & Mission

Ngamumule AI is more than a language learning app - it's a cultural preservation initiative:

- **🏛️ Heritage Preservation** - Digitizing and preserving Sundanese cultural knowledge
- **👥 Community Building** - Connecting Sundanese speakers worldwide
- **📚 Educational Innovation** - Modern technology serving traditional wisdom
- **🌐 Cultural Bridge** - Making Sundanese culture accessible globally
- **👨‍👩‍👧‍👦 Intergenerational Learning** - Helping families maintain cultural connections

## Evolution Journey

### Phase 1: AI Foundation
- Started as a general-purpose AI chat interface
- Implemented agentic AI with tool integration
- Built modern React/Next.js architecture

### Phase 2: Language Focus
- Specialized in language learning capabilities
- Added multi-language support framework
- Developed educational AI tutoring system

### Phase 3: Sundanese Specialization (Current)
- Deep dive into Sundanese language and culture
- Comprehensive learning modules and cultural content
- Authentication system with progress tracking
- Rich multimedia integration (audio, cultural artifacts)

### Phase 4: Future Vision
- Advanced speech recognition and pronunciation feedback
- VR/AR cultural immersion experiences
- Community features and social learning
- Mobile app development
- Integration with educational institutions

## Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Development Guidelines

1. **Component Structure**: Follow the established pattern in `SundaneseLearningPage.tsx`
2. **Authentication**: Use the `useAuth` hook for user state management
3. **Audio Integration**: Use the audio utilities for cultural content
4. **TypeScript**: Maintain strict type safety throughout
5. **Cultural Sensitivity**: Ensure accurate representation of Sundanese culture

### Adding New Content

**New Lessons**: Add to `sundanese-basics-lessons.ts` following the established structure
**Cultural Content**: Update `sundanese-content.ts` with new cultural items
**Audio Files**: Place in appropriate `/public/audio/` subdirectories
**Dictionary Entries**: Expand the dictionary in the learning page component

## � Deployment

### Environment Variables

Create a `.env.local` file:
```env
# Optional: Add AI API keys for enhanced features
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### Deploy on Vercel

1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main

### Other Platforms

The app can be deployed on any platform supporting Next.js:
- Netlify
- Railway
- Heroku
- AWS Amplify
- Google Cloud Platform

## Contributing

We welcome contributions to preserve and promote Sundanese culture!

### Areas for Contribution

- **Content Creation**: Add more lessons, cultural stories, and vocabulary
- **Audio Recordings**: Native speaker pronunciations and cultural music
- **Translation**: Improve accuracy of Sundanese-English translations
- **Cultural Accuracy**: Ensure authentic representation of traditions
- **Technical Improvements**: UI/UX enhancements and new features

### Contribution Guidelines

1. Fork the repository
2. Create a feature branch
3. Follow the coding standards
4. Test your changes thoroughly
5. Submit a pull request with detailed description

## License

MIT License - This project is open source to promote cultural preservation and education.

## Acknowledgments

- **Sundanese Cultural Community** - For preserving and sharing this beautiful heritage
- **Language Experts** - For linguistic accuracy and cultural guidance
- **Open Source Community** - For the tools and libraries that made this possible
- **Cultural Institutions** - For supporting digital preservation efforts

## Contact

For questions, suggestions, or cultural accuracy concerns, please:
- Create an issue on GitHub
- Contribute to discussions
- Share your cultural knowledge

---

**Ngamumule AI** - Learning Sundanese culture, one interaction at a time.
