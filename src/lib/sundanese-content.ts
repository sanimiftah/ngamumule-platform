// Detailed Sundanese Learning Modules

export interface SundaneseLesson {
  id: string;
  title: string;
  titleSunda: string;
  content: string;
  vocabulary: Array<{
    sunda: string;
    english: string;
    pronunciation: string;
    example: string;
    cultural_note?: string;
  }>;
  cultural_insight: string;
  audio_files?: string[];
}

export const sundaneseLessons: Record<string, SundaneseLesson[]> = {
  basics: [
    {
      id: 'greetings',
      title: 'Basic Greetings',
      titleSunda: 'Salametan Dasar',
      content: 'Learn how to greet people respectfully in Sundanese culture. Greetings are very important in Sundanese society as they show respect and maintain social harmony.',
      vocabulary: [
        {
          sunda: 'Wilujeng enjing',
          english: 'Good morning',
          pronunciation: 'wi-lu-jeng en-jing',
          example: 'Wilujeng enjing, Pak Guru! (Good morning, teacher!)'
        },
        {
          sunda: 'Kumaha damang?',
          english: 'How are you?',
          pronunciation: 'ku-ma-ha da-mang',
          example: 'Kumaha damang, Teh? (How are you, sister?)',
          cultural_note: 'Used for people of similar age or slightly older'
        },
        {
          sunda: 'Hatur nuhun',
          english: 'Thank you',
          pronunciation: 'ha-tur nu-hun',
          example: 'Hatur nuhun pisan! (Thank you very much!)'
        },
        {
          sunda: 'Hapunten',
          english: 'Excuse me / Sorry',
          pronunciation: 'ha-pun-ten',
          example: 'Hapunten, abdi telat. (Sorry, I\'m late.)'
        }
      ],
      cultural_insight: 'In Sundanese culture, greetings establish the social hierarchy and relationship between speakers. Always greet elders first and use appropriate language levels.',
      audio_files: ['greetings_basic.mp3']
    },
    {
      id: 'family',
      title: 'Family Members',
      titleSunda: 'Anggota Kulawarga',
      content: 'Family is central to Sundanese culture. Learn how to address family members with respect and understanding of generational hierarchy.',
      vocabulary: [
        {
          sunda: 'Indung / Emak',
          english: 'Mother',
          pronunciation: 'in-dung / e-mak',
          example: 'Indung nuju masak di dapur. (Mother is cooking in the kitchen.)'
        },
        {
          sunda: 'Bapa',
          english: 'Father',
          pronunciation: 'ba-pa',
          example: 'Bapa geus mulih ti sawah. (Father has returned from the rice field.)'
        },
        {
          sunda: 'Lanceuk',
          english: 'Older brother',
          pronunciation: 'lan-ceuk',
          example: 'Lanceuk keur dahar. (Older brother is eating.)'
        },
        {
          sunda: 'Adi',
          english: 'Younger sibling',
          pronunciation: 'a-di',
          example: 'Adi keur sakola. (Younger sibling is at school.)'
        }
      ],
      cultural_insight: 'Sundanese family structure emphasizes respect for elders. The terms used reflect the hierarchical relationships and show proper cultural respect.',
      audio_files: ['family_terms.mp3']
    }
  ],
  
  'undak-usuk': [
    {
      id: 'speech-levels-intro',
      title: 'Introduction to Speech Levels',
      titleSunda: 'Bubuka Undak Usuk Basa',
      content: 'Undak Usuk Basa is the system of speech levels in Sundanese that shows respect and social hierarchy. There are three main levels: Lemes (formal/respectful), Sedeng (neutral), and Lancaran (informal/rough).',
      vocabulary: [
        {
          sunda: 'Abdi (Lemes)',
          english: 'I/me (respectful)',
          pronunciation: 'ab-di',
          example: 'Abdi badé angkat. (I would like to go.)',
          cultural_note: 'Used when speaking to elders or in formal situations'
        },
        {
          sunda: 'Kuring (Sedeng)',
          english: 'I/me (neutral)',
          pronunciation: 'ku-ring',
          example: 'Kuring geus dahar. (I have eaten.)',
          cultural_note: 'Used with peers or in casual situations'
        },
        {
          sunda: 'Urang (Lancaran)',
          english: 'I/me (informal)',
          pronunciation: 'u-rang',
          example: 'Urang mah teu puguh. (I don\'t know.)',
          cultural_note: 'Used with close friends or younger people'
        }
      ],
      cultural_insight: 'Mastering Undak Usuk Basa is essential for proper Sundanese communication. Using the wrong level can be considered disrespectful or inappropriate.',
      audio_files: ['speech_levels_intro.mp3']
    }
  ],

  sisindiran: [
    {
      id: 'sisindiran-basics',
      title: 'Understanding Sisindiran',
      titleSunda: 'Ngarti Sisindiran',
      content: 'Sisindiran is traditional Sundanese poetry that uses metaphor and allegory. It consists of four lines with a specific ABAB rhyme scheme and often contains moral lessons or social commentary.',
      vocabulary: [
        {
          sunda: 'Sisindiran',
          english: 'Traditional poetry',
          pronunciation: 'si-sin-di-ran',
          example: 'Sisindiran teh puisi tradisional Sunda.',
          cultural_note: 'Often used to convey messages indirectly'
        },
        {
          sunda: 'Papasingan',
          english: 'Metaphor/allegory',
          pronunciation: 'pa-pa-si-ngan',
          example: 'Sisindiran ngagunakeun papasingan.',
        },
        {
          sunda: 'Wawancang',
          english: 'Message/meaning',
          pronunciation: 'wa-wan-cang',
          example: 'Sisindiran mibanda wawancang anu hade.',
        }
      ],
      cultural_insight: 'Sisindiran was traditionally used to communicate sensitive topics indirectly, allowing speakers to express criticism or advice without direct confrontation.',
      audio_files: ['sisindiran_example.mp3']
    }
  ],

  music: [
    {
      id: 'angklung-intro',
      title: 'Angklung - The Voice of Bamboo',
      titleSunda: 'Angklung - Sora Awi',
      content: 'Angklung is a UNESCO World Heritage musical instrument made from bamboo tubes. Each angklung produces two tones when shaken and requires teamwork to create melodies.',
      vocabulary: [
        {
          sunda: 'Angklung',
          english: 'Bamboo musical instrument',
          pronunciation: 'ang-klung',
          example: 'Angklung dijieun tina awi.',
          cultural_note: 'UNESCO World Heritage since 2010'
        },
        {
          sunda: 'Gogoyangan',
          english: 'Shaking motion',
          pronunciation: 'go-go-yang-an',
          example: 'Angklung dimaenkeun ku gogoyangan.',
        },
        {
          sunda: 'Rampak',
          english: 'Ensemble/together',
          pronunciation: 'ram-pak',
          example: 'Angklung dimaenkeun sacara rampak.',
        }
      ],
      cultural_insight: 'Angklung represents the Sundanese philosophy of cooperation (gotong royong) as each player contributes specific notes to create beautiful music together.',
      audio_files: ['angklung_demo.mp3', 'angklung_song.mp3']
    },
    {
      id: 'kacapi-suling',
      title: 'Kacapi Suling Ensemble',
      titleSunda: 'Ensembel Kacapi Suling',
      content: 'Kacapi Suling is a traditional Sundanese chamber music featuring the kacapi (zither) and suling (bamboo flute). This intimate music form is perfect for storytelling and emotional expression.',
      vocabulary: [
        {
          sunda: 'Kacapi',
          english: 'Traditional zither',
          pronunciation: 'ka-ca-pi',
          example: 'Kacapi mangrupa alat musik petik.',
        },
        {
          sunda: 'Suling',
          english: 'Bamboo flute',
          pronunciation: 'su-ling',
          example: 'Suling dijieun tina awi.',
        },
        {
          sunda: 'Kawih',
          english: 'Traditional song',
          pronunciation: 'ka-wih',
          example: 'Kawih Sunda loba pisan.',
        }
      ],
      cultural_insight: 'Kacapi Suling music often accompanies the recitation of pantun and poetry, creating a meditative atmosphere that reflects Sundanese spiritual values.',
      audio_files: ['kacapi_suling_demo.mp3']
    }
  ]
};

export const culturalContent = {
  instruments: [
    {
      name: 'Angklung',
      nameSunda: 'Angklung',
      description: 'UNESCO World Heritage bamboo instrument played by shaking',
      origin: 'West Java, Indonesia',
      materials: ['Bamboo (awi)', 'Rattan bindings'],
      playingTechnique: 'Shaking to produce two-tone pitches',
      culturalSignificance: 'Symbol of cooperation and harmony in Sundanese society',
      audioSample: 'angklung_sample.mp3',
      imageUrl: '/images/angklung.jpg'
    },
    {
      name: 'Kacapi',
      nameSunda: 'Kacapi',
      description: 'Traditional Sundanese zither with multiple strings',
      origin: 'Sunda region, West Java',
      materials: ['Wood body', 'Metal strings'],
      playingTechnique: 'Plucking strings with fingers or picks',
      culturalSignificance: 'Central to classical Sundanese music and storytelling',
      audioSample: 'kacapi_sample.mp3',
      imageUrl: '/images/kacapi.jpg'
    },
    {
      name: 'Suling',
      nameSunda: 'Suling',
      description: 'End-blown bamboo flute with 4-6 finger holes',
      origin: 'Indonesia (various regions)',
      materials: ['Bamboo'],
      playingTechnique: 'Blowing across the end with finger hole control',
      culturalSignificance: 'Represents the human breath and spiritual connection',
      audioSample: 'suling_sample.mp3',
      imageUrl: '/images/suling.jpg'
    }
  ],

  songs: [
    {
      title: 'Es Lilin',
      titleSunda: 'Es Lilin',
      type: 'Children\'s Song',
      lyrics: 'Es lilin, es lilin...',
      meaning: 'A playful children\'s song about ice treats',
      culturalContext: 'Traditional children\'s game song',
      audioFile: 'es_lilin.mp3'
    },
    {
      title: 'Manuk Dadali',
      titleSunda: 'Manuk Dadali',
      type: 'Regional Anthem',
      lyrics: 'Manuk dadali pilihan kuring...',
      meaning: 'Song about the mythical eagle representing West Java',
      culturalContext: 'Unofficial anthem of West Java province',
      audioFile: 'manuk_dadali.mp3'
    }
  ],

  landmarks: [
    {
      name: 'Gedung Sate',
      nameSunda: 'Gedung Sate',
      location: 'Bandung, West Java',
      description: 'Iconic Art Deco building, symbol of Bandung',
      historicalSignificance: 'Built during Dutch colonial period (1920)',
      culturalImportance: 'Center of West Java provincial government',
      imageUrl: '/images/gedung_sate.jpg'
    },
    {
      name: 'Tangkuban Perahu',
      nameSunda: 'Tangkuban Parahu',
      location: 'Subang, West Java',
      description: 'Volcanic crater associated with Sangkuriang legend',
      historicalSignificance: 'Ancient volcano with geological importance',
      culturalImportance: 'Central to Sundanese mythology and folklore',
      imageUrl: '/images/tangkuban_perahu.jpg'
    }
  ],

  traditions: [
    {
      name: 'Seren Taun',
      nameSunda: 'Seren Taun',
      type: 'Harvest Festival',
      description: 'Annual rice harvest celebration in Sundanese communities',
      significance: 'Thanksgiving for successful harvest, community unity',
      rituals: ['Offering ceremonies', 'Traditional performances', 'Community feast'],
      modernPractice: 'Still celebrated in rural West Java communities'
    },
    {
      name: 'Ngalaksa',
      nameSunda: 'Ngalaksa',
      type: 'Traditional Ceremony',
      description: 'Community ritual for important life events',
      significance: 'Blessing and protection from ancestors',
      rituals: ['Ritual meals', 'Traditional prayers', 'Community gathering'],
      modernPractice: 'Adapted for modern celebrations while keeping core values'
    }
  ]
};
