// Complete Sundanese Basics Module Lessons

export interface DetailedLesson {
  id: string;
  title: string;
  titleSunda: string;
  duration: string;
  type: 'video' | 'audio' | 'interactive' | 'reading' | 'practice';
  isCompleted: boolean;
  isUnlocked: boolean;
  description: string;
  objectives: string[];
  content: {
    introduction: string;
    vocabulary: VocabularyItem[];
    grammar?: GrammarPoint[];
    culturalNotes: CulturalNote[];
    examples: ExampleSentence[];
    exercises: Exercise[];
  };
  audioFiles: string[];
  nextLesson?: string;
}

export interface VocabularyItem {
  sunda: string;
  english: string;
  pronunciation: string;
  partOfSpeech: string;
  example: string;
  exampleTranslation: string;
  culturalContext?: string;
  audio?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface GrammarPoint {
  title: string;
  explanation: string;
  pattern: string;
  examples: string[];
  tips: string[];
}

export interface CulturalNote {
  title: string;
  content: string;
  importance: 'high' | 'medium' | 'low';
  category: 'etiquette' | 'tradition' | 'social' | 'religious' | 'historical';
}

export interface ExampleSentence {
  sunda: string;
  english: string;
  pronunciation: string;
  context: string;
  formality: 'casual' | 'polite' | 'formal';
}

export interface Exercise {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'translation' | 'pronunciation' | 'conversation';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  points: number;
}

export const sundaneseBasicsLessons: DetailedLesson[] = [
  {
    id: 'lesson1',
    title: 'Greetings & Basic Phrases',
    titleSunda: 'Salametan jeung Ungkapan Dasar',
    duration: '25 min',
    type: 'interactive',
    isCompleted: false,
    isUnlocked: true,
    description: 'Master essential Sundanese greetings and learn how to make a great first impression in Sundanese culture.',
    objectives: [
      'Learn 15+ essential greetings for different times of day',
      'Understand the importance of respect in Sundanese greetings',
      'Practice proper pronunciation with audio guides',
      'Apply greetings in real conversation scenarios'
    ],
    content: {
      introduction: 'Greetings are the foundation of Sundanese social interaction. They show respect, establish relationships, and reflect the warm, hospitable nature of Sundanese culture. In this lesson, you\'ll learn not just what to say, but when and how to say it appropriately.',
      vocabulary: [
        {
          sunda: 'Wilujeng enjing',
          english: 'Good morning',
          pronunciation: 'wi-lu-jeng en-jing',
          partOfSpeech: 'greeting',
          example: 'Wilujeng enjing, Pak Guru!',
          exampleTranslation: 'Good morning, teacher!',
          culturalContext: 'Used from dawn until around 10 AM. Shows respect and friendliness.',
          difficulty: 'beginner'
        },
        {
          sunda: 'Wilujeng siang',
          english: 'Good afternoon',
          pronunciation: 'wi-lu-jeng si-ang',
          partOfSpeech: 'greeting',
          example: 'Wilujeng siang, Bu!',
          exampleTranslation: 'Good afternoon, Ma\'am!',
          culturalContext: 'Used from 10 AM until around 3 PM.',
          difficulty: 'beginner'
        },
        {
          sunda: 'Wilujeng sonten',
          english: 'Good evening',
          pronunciation: 'wi-lu-jeng son-ten',
          partOfSpeech: 'greeting',
          example: 'Wilujeng sonten, Teh!',
          exampleTranslation: 'Good evening, Sister!',
          culturalContext: 'Used from 3 PM until sunset. \'Teh\' is informal for older sister.',
          difficulty: 'beginner'
        },
        {
          sunda: 'Kumaha damang?',
          english: 'How are you?',
          pronunciation: 'ku-ma-ha da-mang',
          partOfSpeech: 'question',
          example: 'Kumaha damang, Kang?',
          exampleTranslation: 'How are you, Brother?',
          culturalContext: 'Standard way to ask about someone\'s wellbeing. \'Kang\' means older brother.',
          difficulty: 'beginner'
        },
        {
          sunda: 'Damang',
          english: 'I\'m fine/well',
          pronunciation: 'da-mang',
          partOfSpeech: 'response',
          example: 'Alhamdulillah, damang.',
          exampleTranslation: 'Thank God, I\'m well.',
          culturalContext: 'Common response. Often preceded by \'Alhamdulillah\' (Thank God).',
          difficulty: 'beginner'
        },
        {
          sunda: 'Hatur nuhun',
          english: 'Thank you',
          pronunciation: 'ha-tur nu-hun',
          partOfSpeech: 'expression',
          example: 'Hatur nuhun pisan!',
          exampleTranslation: 'Thank you very much!',
          culturalContext: 'Essential polite expression. Add \'pisan\' for emphasis.',
          difficulty: 'beginner'
        },
        {
          sunda: 'Hapunten',
          english: 'Excuse me / Sorry',
          pronunciation: 'ha-pun-ten',
          partOfSpeech: 'expression',
          example: 'Hapunten, abdi telat.',
          exampleTranslation: 'Sorry, I\'m late.',
          culturalContext: 'Used for apologies and to get attention politely.',
          difficulty: 'beginner'
        },
        {
          sunda: 'Dugi heula',
          english: 'See you later',
          pronunciation: 'du-gi heu-la',
          partOfSpeech: 'farewell',
          example: 'Dugi heula, Bu!',
          exampleTranslation: 'See you later, Ma\'am!',
          culturalContext: 'Polite way to say goodbye when you expect to meet again.',
          difficulty: 'beginner'
        }
      ],
      culturalNotes: [
        {
          title: 'Respect Through Greetings',
          content: 'In Sundanese culture, greetings are never just words. They establish social hierarchy, show respect for elders, and demonstrate your understanding of cultural values. Always greet the oldest person first in a group.',
          importance: 'high',
          category: 'etiquette'
        },
        {
          title: 'Time-Based Greetings',
          content: 'Sundanese people are very conscious of time in their greetings. Using the wrong greeting for the time of day shows lack of awareness and can be seen as impolite.',
          importance: 'medium',
          category: 'social'
        },
        {
          title: 'Religious Integration',
          content: 'Many Sundanese responses include Islamic phrases like "Alhamdulillah" (Thanks to God), reflecting the strong Islamic influence in West Java culture.',
          importance: 'medium',
          category: 'religious'
        }
      ],
      examples: [
        {
          sunda: 'Wilujeng enjing, Pak. Kumaha damang?',
          english: 'Good morning, Sir. How are you?',
          pronunciation: 'wi-lu-jeng en-jing, pak. ku-ma-ha da-mang?',
          context: 'Meeting a male elder or authority figure in the morning',
          formality: 'polite'
        },
        {
          sunda: 'Alhamdulillah, damang. Hatur nuhun.',
          english: 'Thank God, I\'m well. Thank you.',
          pronunciation: 'al-ham-du-lil-lah, da-mang. ha-tur nu-hun.',
          context: 'Responding to "How are you?" politely',
          formality: 'polite'
        },
        {
          sunda: 'Hapunten, abdi pamit heula.',
          english: 'Excuse me, I\'d like to take my leave.',
          pronunciation: 'ha-pun-ten, ab-di pa-mit heu-la.',
          context: 'Politely asking permission to leave',
          formality: 'formal'
        }
      ],
      exercises: [
        {
          id: 'ex1',
          type: 'multiple-choice',
          question: 'What greeting would you use at 2 PM?',
          options: ['Wilujeng enjing', 'Wilujeng siang', 'Wilujeng sonten', 'Wilujeng dalu'],
          correctAnswer: 1,
          explanation: 'Wilujeng siang is used from 10 AM to 3 PM.',
          points: 10
        },
        {
          id: 'ex2',
          type: 'translation',
          question: 'Translate to Sundanese: "Good evening, how are you?"',
          correctAnswer: 'Wilujeng sonten, kumaha damang?',
          explanation: 'Wilujeng sonten (good evening) + kumaha damang (how are you)',
          points: 15
        },
        {
          id: 'ex3',
          type: 'pronunciation',
          question: 'Practice saying: "Hatur nuhun pisan"',
          correctAnswer: 'ha-tur nu-hun pi-san',
          explanation: 'Remember to emphasize each syllable clearly.',
          points: 10
        }
      ]
    },
    audioFiles: ['greetings_basic.mp3', 'greetings_practice.mp3'],
    nextLesson: 'lesson2'
  },
  {
    id: 'lesson2',
    title: 'Family Members & Relationships',
    titleSunda: 'Anggota Kulawarga jeung Hubungan',
    duration: '30 min',
    type: 'video',
    isCompleted: false,
    isUnlocked: true,
    description: 'Learn family terms and understand the importance of family hierarchy in Sundanese society.',
    objectives: [
      'Master 20+ family relationship terms',
      'Understand Sundanese family hierarchy',
      'Learn respectful ways to address family members',
      'Practice family introductions and conversations'
    ],
    content: {
      introduction: 'Family is the cornerstone of Sundanese society. Understanding family terms goes beyond vocabulary - it\'s about comprehending social structure, respect, and traditional values that have been passed down for generations.',
      vocabulary: [
        {
          sunda: 'Indung / Emak',
          english: 'Mother',
          pronunciation: 'in-dung / e-mak',
          partOfSpeech: 'noun',
          example: 'Indung keur masak di dapur.',
          exampleTranslation: 'Mother is cooking in the kitchen.',
          culturalContext: '\'Indung\' is more formal, \'Emak\' is casual and affectionate.',
          difficulty: 'beginner'
        },
        {
          sunda: 'Bapa',
          english: 'Father',
          pronunciation: 'ba-pa',
          partOfSpeech: 'noun',
          example: 'Bapa geus mulih ti sawah.',
          exampleTranslation: 'Father has returned from the rice field.',
          culturalContext: 'Traditional term showing respect for the father as family head.',
          difficulty: 'beginner'
        },
        {
          sunda: 'Lanceuk',
          english: 'Older brother',
          pronunciation: 'lan-ceuk',
          partOfSpeech: 'noun',
          example: 'Lanceuk keur diajar.',
          exampleTranslation: 'Older brother is studying.',
          culturalContext: 'Shows respect for age hierarchy within siblings.',
          difficulty: 'beginner'
        },
        {
          sunda: 'Ceuk',
          english: 'Older sister',
          pronunciation: 'ceuk',
          partOfSpeech: 'noun',
          example: 'Ceuk geus nikah.',
          exampleTranslation: 'Older sister is already married.',
          culturalContext: 'Respectful term for older sister, showing family hierarchy.',
          difficulty: 'beginner'
        },
        {
          sunda: 'Adi',
          english: 'Younger sibling',
          pronunciation: 'a-di',
          partOfSpeech: 'noun',
          example: 'Adi keur sakola.',
          exampleTranslation: 'Younger sibling is at school.',
          culturalContext: 'Gender-neutral term for younger siblings.',
          difficulty: 'beginner'
        },
        {
          sunda: 'Aki',
          english: 'Grandfather',
          pronunciation: 'a-ki',
          partOfSpeech: 'noun',
          example: 'Aki carita ngeunaan jaman baheula.',
          exampleTranslation: 'Grandfather tells stories about the old days.',
          culturalContext: 'Grandfathers are highly respected as wisdom keepers.',
          difficulty: 'beginner'
        },
        {
          sunda: 'Nini',
          english: 'Grandmother',
          pronunciation: 'ni-ni',
          partOfSpeech: 'noun',
          example: 'Nini masak sayur asem.',
          exampleTranslation: 'Grandmother cooks sour vegetable soup.',
          culturalContext: 'Grandmothers often teach traditional cooking and values.',
          difficulty: 'beginner'
        }
      ],
      culturalNotes: [
        {
          title: 'Family Hierarchy',
          content: 'Sundanese families follow strict age hierarchy. Older family members are always addressed first and with specific respectful terms. This hierarchy extends to decision-making and social interactions.',
          importance: 'high',
          category: 'social'
        },
        {
          title: 'Extended Family Importance',
          content: 'Sundanese families often include extended relatives living together or nearby. Aunts, uncles, and cousins play significant roles in child-rearing and family decisions.',
          importance: 'high',
          category: 'tradition'
        },
        {
          title: 'Gender Roles in Family',
          content: 'Traditional Sundanese families have defined gender roles, though modern families are evolving. Understanding these helps in proper communication and respect.',
          importance: 'medium',
          category: 'social'
        }
      ],
      examples: [
        {
          sunda: 'Ieu kulawarga abdi. Ieu Indung, ieu Bapa.',
          english: 'This is my family. This is Mother, this is Father.',
          pronunciation: 'i-eu ku-la-war-ga ab-di. i-eu in-dung, i-eu ba-pa.',
          context: 'Introducing family members formally',
          formality: 'formal'
        },
        {
          sunda: 'Lanceuk abdi guru di sakola.',
          english: 'My older brother is a teacher at school.',
          pronunciation: 'lan-ceuk ab-di gu-ru di sa-ko-la.',
          context: 'Talking about family member\'s profession',
          formality: 'polite'
        }
      ],
      exercises: [
        {
          id: 'ex4',
          type: 'multiple-choice',
          question: 'How do you say "younger sibling" in Sundanese?',
          options: ['Lanceuk', 'Ceuk', 'Adi', 'Indung'],
          correctAnswer: 2,
          explanation: 'Adi is the term for younger sibling, regardless of gender.',
          points: 10
        },
        {
          id: 'ex5',
          type: 'fill-blank',
          question: 'Complete: "Ieu _____ abdi." (This is my mother)',
          correctAnswer: 'Indung',
          explanation: 'Indung is the respectful term for mother.',
          points: 10
        }
      ]
    },
    audioFiles: ['family_terms.mp3', 'family_conversations.mp3'],
    nextLesson: 'lesson3'
  },
  {
    id: 'lesson3',
    title: 'Numbers & Counting',
    titleSunda: 'Angka jeung Ngitung',
    duration: '20 min',
    type: 'interactive',
    isCompleted: false,
    isUnlocked: true,
    description: 'Master Sundanese numbers 1-100 and learn practical counting in daily situations.',
    objectives: [
      'Learn numbers 1-20 with perfect pronunciation',
      'Understand number patterns up to 100',
      'Practice counting in real-world contexts',
      'Learn time and money expressions with numbers'
    ],
    content: {
      introduction: 'Numbers in Sundanese follow logical patterns that make them easier to learn once you understand the system. You\'ll use these constantly in daily conversations, shopping, telling time, and expressing quantities.',
      vocabulary: [
        {
          sunda: 'Hiji',
          english: 'One',
          pronunciation: 'hi-ji',
          partOfSpeech: 'number',
          example: 'Abdi gaduh hiji buku.',
          exampleTranslation: 'I have one book.',
          difficulty: 'beginner'
        },
        {
          sunda: 'Dua',
          english: 'Two',
          pronunciation: 'du-a',
          partOfSpeech: 'number',
          example: 'Dua apel di méja.',
          exampleTranslation: 'Two apples on the table.',
          difficulty: 'beginner'
        },
        {
          sunda: 'Tilu',
          english: 'Three',
          pronunciation: 'ti-lu',
          partOfSpeech: 'number',
          example: 'Tilu ucing di kebon.',
          exampleTranslation: 'Three cats in the garden.',
          difficulty: 'beginner'
        },
        {
          sunda: 'Opat',
          english: 'Four',
          pronunciation: 'o-pat',
          partOfSpeech: 'number',
          example: 'Opat roda mobil.',
          exampleTranslation: 'Four car wheels.',
          difficulty: 'beginner'
        },
        {
          sunda: 'Lima',
          english: 'Five',
          pronunciation: 'li-ma',
          partOfSpeech: 'number',
          example: 'Lima ramo leungeun.',
          exampleTranslation: 'Five fingers on a hand.',
          difficulty: 'beginner'
        },
        {
          sunda: 'Genep',
          english: 'Six',
          pronunciation: 'ge-nep',
          partOfSpeech: 'number',
          example: 'Genep botol di kulkas.',
          exampleTranslation: 'Six bottles in the refrigerator.',
          difficulty: 'beginner'
        },
        {
          sunda: 'Tujuh',
          english: 'Seven',
          pronunciation: 'tu-juh',
          partOfSpeech: 'number',
          example: 'Tujuh poé dina saminggu.',
          exampleTranslation: 'Seven days in a week.',
          difficulty: 'beginner'
        },
        {
          sunda: 'Dalapan',
          english: 'Eight',
          pronunciation: 'da-la-pan',
          partOfSpeech: 'number',
          example: 'Dalapan suku lancah.',
          exampleTranslation: 'Eight spider legs.',
          difficulty: 'beginner'
        },
        {
          sunda: 'Salapan',
          english: 'Nine',
          pronunciation: 'sa-la-pan',
          partOfSpeech: 'number',
          example: 'Salapan bulan kandungan.',
          exampleTranslation: 'Nine months of pregnancy.',
          difficulty: 'beginner'
        },
        {
          sunda: 'Sapuluh',
          english: 'Ten',
          pronunciation: 'sa-pu-luh',
          partOfSpeech: 'number',
          example: 'Sapuluh ramo dua leungeun.',
          exampleTranslation: 'Ten fingers on two hands.',
          difficulty: 'beginner'
        }
      ],
      grammar: [
        {
          title: 'Number Patterns 11-19',
          explanation: 'Numbers 11-19 follow the pattern: sa + number + belas',
          pattern: 'sa + [number] + belas',
          examples: [
            'sabelas (11) = sa + hiji + belas',
            'dua belas (12) = dua + belas', 
            'tilu belas (13) = tilu + belas'
          ],
          tips: ['Note that 11 is irregular: "sabelas" not "hiji belas"', 'All others follow the regular pattern']
        },
        {
          title: 'Tens (20, 30, 40...)',
          explanation: 'Multiples of 10 use the pattern: number + puluh',
          pattern: '[number] + puluh',
          examples: [
            'dua puluh (20) = dua + puluh',
            'tilu puluh (30) = tilu + puluh',
            'opat puluh (40) = opat + puluh'
          ],
          tips: ['Remember "sapuluh" (10) is irregular', 'For compound numbers, add the unit: dua puluh hiji (21)']
        }
      ],
      culturalNotes: [
        {
          title: 'Numbers in Traditional Counting',
          content: 'Sundanese people traditionally use numbers in various cultural contexts like counting prayer beads, traditional games, and ceremonial purposes.',
          importance: 'medium',
          category: 'tradition'
        },
        {
          title: 'Market Counting',
          content: 'In traditional markets, Sundanese numbers are essential for bargaining and purchasing. Vendors appreciate when foreigners can count in Sundanese.',
          importance: 'high',
          category: 'social'
        }
      ],
      examples: [
        {
          sunda: 'Sabaraha hargana? Dua puluh rébu rupiah.',
          english: 'How much does it cost? Twenty thousand rupiah.',
          pronunciation: 'sa-ba-ra-ha har-ga-na? du-a pu-luh ré-bu ru-pi-ah.',
          context: 'Shopping conversation',
          formality: 'casual'
        },
        {
          sunda: 'Jam sapuluh abdi ka kantor.',
          english: 'I go to the office at ten o\'clock.',
          pronunciation: 'jam sa-pu-luh ab-di ka kan-tor.',
          context: 'Telling time',
          formality: 'polite'
        }
      ],
      exercises: [
        {
          id: 'ex6',
          type: 'multiple-choice',
          question: 'What is "fifteen" in Sundanese?',
          options: ['Lima belas', 'Tilu belas', 'Opat belas', 'Genep belas'],
          correctAnswer: 0,
          explanation: 'Lima belas (15) = lima + belas',
          points: 10
        },
        {
          id: 'ex7',
          type: 'translation',
          question: 'How do you say "thirty-seven" in Sundanese?',
          correctAnswer: 'Tilu puluh tujuh',
          explanation: 'Tilu puluh (30) + tujuh (7) = tilu puluh tujuh',
          points: 15
        }
      ]
    },
    audioFiles: ['numbers_1_20.mp3', 'counting_practice.mp3'],
    nextLesson: 'lesson4'
  }
  // More lessons will be added...
];

export const getNextLesson = (currentLessonId: string): DetailedLesson | null => {
  const currentIndex = sundaneseBasicsLessons.findIndex(lesson => lesson.id === currentLessonId);
  if (currentIndex !== -1 && currentIndex < sundaneseBasicsLessons.length - 1) {
    return sundaneseBasicsLessons[currentIndex + 1];
  }
  return null;
};

export const getLessonProgress = (completedLessons: string[]): number => {
  return Math.round((completedLessons.length / sundaneseBasicsLessons.length) * 100);
};
