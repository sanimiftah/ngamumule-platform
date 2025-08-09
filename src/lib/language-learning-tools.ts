// Advanced Language Learning Tools

import type { Tool } from '@/types/agent';

// Vocabulary Builder Tool
export const vocabularyBuilderTool: Tool = {
  name: 'vocabulary_builder',
  description: 'Build vocabulary with spaced repetition, context, and memory techniques',
  parameters: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        description: 'Vocabulary action to perform',
        enum: ['add_word', 'practice_session', 'review_due', 'word_details', 'progress_check']
      },
      word: {
        type: 'string',
        description: 'The word to work with'
      },
      language: {
        type: 'string',
        description: 'Target language',
        enum: ['spanish', 'french', 'german', 'italian', 'portuguese', 'chinese', 'japanese', 'korean', 'indonesian', 'sundanese', 'javanese', 'balinese', 'minangkabau', 'batak', 'betawi']
      },
      difficulty: {
        type: 'string',
        description: 'Word difficulty level',
        enum: ['beginner', 'intermediate', 'advanced']
      },
      context: {
        type: 'string',
        description: 'Context or example sentence for the word'
      }
    },
    required: ['action', 'language']
  },
  execute: async (params) => {
    const { action, word, language, difficulty, context } = params;
    
    switch (action) {
      case 'add_word':
        return `📚 Added "${word}" to your ${language} vocabulary!\n\n✨ Definition: [AI-generated definition]\n📝 Example: "${context || 'AI-generated example sentence'}"\n🎯 Difficulty: ${difficulty}\n⏰ Next review: Tomorrow\n\n💡 Memory tip: Try to use this word 3 times today!`;
        
      case 'practice_session':
        if (language === 'sundanese') {
          return `🎯 Latihan Kosakata - SUNDANESE (Basa Sunda)\n\n📚 Kecap dinten ieu (5/10):\n\n1. 📍 "Kumaha damang?" = ?\n   a) Selamat tinggal  b) Apa kabar?  c) Terima kasih\n\n2. 🔄 Tarjamahkeun: "Selamat pagi"\n   Jawaban anjeun: ____________\n\n3. 🎭 Eusian titik-titik: "Abdi _____ Ujang" (Nama saya Ujang)\n\n💪 Skor ayeuna: 8/10 leres\n⭐ Streak: 5 poé!\n\n🌟 Catetan budaya: Basa Sunda ngagunakeun tingkatan basa (undak usuk basa)`;
        } else if (language === 'javanese') {
          return `🎯 Latihan Kosakata - JAVANESE (Basa Jawa)\n\n📚 Tembung dina (5/10):\n\n1. 📍 "Piye kabare?" = ?\n   a) Sampai jumpa  b) Apa kabar?  c) Terima kasih\n\n2. 🔄 Gantine: "Selamat pagi"\n   Wangsulan: ____________\n\n3. 🎭 Isinana: "Jenengku _____ Budi" (Nama saya Budi)\n\n💪 Skor saiki: 8/10 bener\n⭐ Streak: 5 dina!\n\n🌟 Catatan budaya: Basa Jawa duwe unggah-ungguh (tingkatan bahasa)`;
        } else if (language === 'balinese') {
          return `🎯 Latihan Kosakata - BALINESE (Basa Bali)\n\n📚 Kruna rahina (5/10):\n\n1. 📍 "Kenken kabare?" = ?\n   a) Pamit  b) Apa kabar?  c) Suksma\n\n2. 🔄 Alihang: "Selamat pagi"\n   Surat: ____________\n\n3. 🎭 Isinang: "Wastané titiyang _____ Made" (Nama saya Made)\n\n💪 Angka mangkin: 8/10 patut\n⭐ Streak: 5 rahina!\n\n🌟 Catatan budaya: Basa Bali nganggo sor singgih (tingkatan bahasa)`;
        }
        return `🎯 Vocabulary Practice Session - ${language.toUpperCase()}\n\n📚 Today's words (5/10):\n\n1. 📍 "Hola" = ?\n   a) Goodbye  b) Hello  c) Thank you\n\n2. 🔄 Translate: "Good morning"\n   Your answer: ____________\n\n3. 🎭 Fill the blank: "Me _____ Juan" (My name is Juan)\n\n💪 Score so far: 8/10 correct\n⭐ Streak: 5 days!\n\nType your answers or say "next" for the next question!`;
        
      case 'review_due':
        return `⏰ Review Time! - ${language.toUpperCase()}\n\n📋 Words due for review (12 total):\n\n🟢 Strong memory (6 words):\n• Hola, Gracias, Por favor, Agua, Casa, Amigo\n\n🟡 Needs practice (4 words):\n• Restaurante, Trabajo, Familia, Escuela\n\n🔴 Struggling with (2 words):\n• Necesario, Desarrollar\n\n🎯 Recommended: Start with struggling words, then practice the yellow ones!`;
        
      case 'word_details':
        return `📖 Word Deep Dive: "${word}" (${language})\n\n🔤 Pronunciation: [Audio guide would be here]\n📝 Definition: [Detailed definition]\n\n💫 Usage Examples:\n• Formal: [Example sentence]\n• Casual: [Example sentence]\n• Question: [Example question]\n\n🎭 Related Words:\n• Synonyms: [Similar words]\n• Antonyms: [Opposite words]\n• Word family: [Related forms]\n\n🧠 Memory tricks:\n• Visual: [Image association]\n• Sound: [Pronunciation tip]\n• Story: [Memorable story using the word]`;
        
      case 'progress_check':
        return `📊 Vocabulary Progress - ${language.toUpperCase()}\n\n📈 Overall Stats:\n• Total words learned: 247\n• Words mastered: 156 (63%)\n• Currently learning: 91\n• Daily streak: 12 days 🔥\n\n🎯 This Week:\n• New words added: 28\n• Practice sessions: 9\n• Accuracy rate: 87%\n• Time spent: 3.5 hours\n\n🏆 Achievements:\n• 🥉 100 Words Milestone\n• 🎯 7-Day Streak\n• 📚 Grammar Beginner\n\nNext goal: 500 words by end of month!`;
        
      default:
        return `Unknown vocabulary action: ${action}`;
    }
  }
};

// Grammar Coach Tool
export const grammarCoachTool: Tool = {
  name: 'grammar_coach',
  description: 'Interactive grammar instruction with exercises and explanations',
  parameters: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        description: 'Grammar coaching action',
        enum: ['lesson', 'exercise', 'check_sentence', 'explain_rule', 'practice_conjugation']
      },
      topic: {
        type: 'string',
        description: 'Grammar topic to focus on',
        enum: ['verbs', 'nouns', 'adjectives', 'articles', 'pronouns', 'tenses', 'sentence_structure']
      },
      language: {
        type: 'string',
        description: 'Target language',
        enum: ['spanish', 'french', 'german', 'italian', 'portuguese', 'indonesian', 'sundanese', 'javanese', 'balinese', 'minangkabau', 'batak', 'betawi']
      },
      sentence: {
        type: 'string',
        description: 'Sentence to check or work with'
      },
      level: {
        type: 'string',
        description: 'Grammar complexity level',
        enum: ['beginner', 'intermediate', 'advanced']
      }
    },
    required: ['action', 'language']
  },
  execute: async (params) => {
    const { action, topic, language, sentence, level } = params;
    
    switch (action) {
      case 'lesson':
        if (language === 'sundanese') {
          return `📖 Palajaran Tata Basa: ${topic?.toUpperCase()} dina SUNDANESE\n\n🎯 Fokus Dinten Ieu: Kecap Pagawéan Kiwari\n\n📚 Aturan Pokok:\n1. Kecap pagawéan aktip: nginum, ngadahar, ngalakukeun\n2. Kecap pagawéan pasip: diinum, didahar, dilakukeun\n3. Awalan: nga-, di-, ka-\n\n💡 Cara nginget: "Sundanese nganggo awalan pikeun ngarobah hartina kecap"\n\n✨ Conto:\n• Nga + dahar = ngadahar (makan)\n• Di + tulis = ditulis (ditulis)\n• Ka + bawa = kabawa (terbawa)\n\n🎯 Latihan: Coba robah "tulis" jadi kecap pagawéan aktip`;
        } else if (language === 'javanese') {
          return `📖 Pelajaran Tata Basa: ${topic?.toUpperCase()} ing JAVANESE\n\n🎯 Fokus Dina Iki: Tembung Kriya Saiki\n\n📚 Aturan Dhasar:\n1. Kriya aktif: mangan, ngombe, nindakake\n2. Kriya pasif: dipangan, diombe, ditindakake\n3. Ater-ater: ng-, di-, ke-\n\n💡 Cara eling: "Basa Jawa nganggo ater-ater kanggo ngganti teges"\n\n✨ Tuladha:\n• Ng + tulis = nulis (menulis)\n• Di + tulis = ditulis (ditulis)\n• Ke + tulis = ketulis (tertulis)\n\n🎯 Gladhen: Coba owahi "maca" dadi kriya aktif`;
        }
        return `📖 Grammar Lesson: ${topic?.toUpperCase()} in ${language.toUpperCase()}\n\n🎯 Today's Focus: Present Tense Verbs\n\n📚 Key Rules:\n1. Regular -AR verbs: hablar → hablo, hablas, habla...\n2. Regular -ER verbs: comer → como, comes, come...\n3. Regular -IR verbs: vivir → vivo, vives, vive...\n\n💡 Memory Trick: "AR, ER, IR - learn the endings and you'll go far!"\n\n✨ Examples:\n• Yo hablo español (I speak Spanish)\n• Tú comes pizza (You eat pizza)\n• Él vive en México (He lives in Mexico)\n\n🎯 Practice: Try conjugating "estudiar" (to study)`;
        
      case 'exercise':
        return `💪 Grammar Exercise: ${topic} - ${language.toUpperCase()}\n\n🎯 Fill in the correct verb form:\n\n1. Yo _____ (hablar) español.\n2. Mi hermana _____ (comer) frutas.\n3. Nosotros _____ (vivir) en España.\n4. ¿Tú _____ (estudiar) medicina?\n5. Ellos _____ (trabajar) en el hospital.\n\n⏰ Time limit: 3 minutes\n💡 Hint: Remember the endings for each verb type!\n\nType your answers like: 1. hablo, 2. come, etc.`;
        
      case 'check_sentence':
        return `🔍 Grammar Check: "${sentence}"\n\n✅ Analysis:\n• Structure: Subject + Verb + Object ✓\n• Verb conjugation: Correct ✓\n• Article agreement: "la casa" ✓\n• Word order: Perfect ✓\n\n⭐ Overall: Excellent sentence!\n\n💡 Alternative ways to say this:\n• More formal: [Alternative sentence]\n• More casual: [Alternative sentence]\n• Past tense: [Past tense version]\n\n🎯 Next challenge: Try using this sentence with different subjects (tú, él, nosotros)`;
        
      case 'explain_rule':
        return `🧠 Grammar Rule Explanation: ${topic} in ${language.toUpperCase()}\n\n📚 The Rule:\nIn Spanish, adjectives must agree with the noun in both gender and number.\n\n🎯 Examples:\n• Masculine singular: El gato negro (the black cat)\n• Feminine singular: La casa blanca (the white house)\n• Masculine plural: Los gatos negros (the black cats)\n• Feminine plural: Las casas blancas (the white houses)\n\n❌ Common Mistakes:\n• "La gato negro" → Wrong gender!\n• "El casa blanco" → Wrong gender agreement!\n\n✅ Remember: Look at the noun's ending (-a usually feminine, -o usually masculine)`;
        
      case 'practice_conjugation':
        return `🔄 Conjugation Practice: HABLAR (to speak) - ${language.toUpperCase()}\n\n🎯 Present Tense:\n• Yo: hablo\n• Tú: hablas\n• Él/Ella: habla\n• Nosotros: hablamos\n• Vosotros: habláis\n• Ellos: hablan\n\n💪 Your turn! Conjugate "COMER" (to eat):\n\nYo: _____\nTú: _____\nÉl: _____\n\n⏰ Quick tip: -ER verbs use: -o, -es, -e, -emos, -éis, -en\n\nTry it and I'll check your work!`;
        
      default:
        return `Unknown grammar action: ${action}`;
    }
  }
};

// Conversation Practice Tool
export const conversationPracticeTool: Tool = {
  name: 'conversation_practice',
  description: 'Interactive conversation scenarios with real-time feedback',
  parameters: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        description: 'Conversation practice action',
        enum: ['start_scenario', 'respond', 'get_feedback', 'suggest_phrases', 'change_scenario']
      },
      scenario: {
        type: 'string',
        description: 'Conversation scenario',
        enum: ['restaurant', 'shopping', 'directions', 'hotel', 'doctor', 'job_interview', 'casual_chat']
      },
      language: {
        type: 'string',
        description: 'Target language for conversation',
        enum: ['spanish', 'french', 'german', 'italian', 'portuguese', 'indonesian', 'sundanese', 'javanese', 'balinese', 'minangkabau', 'batak', 'betawi']
      },
      user_response: {
        type: 'string',
        description: 'User\'s response in the conversation'
      },
      difficulty: {
        type: 'string',
        description: 'Conversation difficulty',
        enum: ['beginner', 'intermediate', 'advanced']
      }
    },
    required: ['action', 'language']
  },
  execute: async (params) => {
    const { action, scenario, language, user_response, difficulty } = params;
    
    switch (action) {
      case 'start_scenario':
        if (language === 'sundanese') {
          return `🎭 Skenario Paguneman: ${scenario?.toUpperCase()} - SUNDANESE\n\n📍 Tempat: Anjeun di warung makan di Bandung\n🎯 Tujuan: Mesen dahareun jeung inuman\n⭐ Tingkat kasusah: ${difficulty}\n\n🤵 Juragan Warung: "Sugeng enjing! Punten, badé naon?"\n(Selamat pagi! Maaf, mau pesan apa?)\n\n💡 Saran jawaban:\n• "Abdi hoyong mesen nasi gudeg" (Saya mau pesan nasi gudeg)\n• "Naon nu seeur dipesen?" (Apa yang banyak dipesan?)\n• "Sabaraha regana?" (Berapa harganya?)\n\n🎙️ Waleran anjeun: [Ketik jawaban dina Basa Sunda]`;
        } else if (language === 'javanese') {
          return `🎭 Skenario Pacelathon: ${scenario?.toUpperCase()} - JAVANESE\n\n📍 Panggonan: Sampeyan ing warung makan neng Yogyakarta\n🎯 Target: Pesen panganan lan omben-omben\n⭐ Tingkat angel: ${difficulty}\n\n🤵 Bakul: "Sugeng enjing! Arep pesen apa nggih?"\n(Selamat pagi! Mau pesan apa ya?)\n\n💡 Saran wangsulan:\n• "Kula pengen gudeg setunggal piring" (Saya mau gudeg satu piring)\n• "Punapa ingkang kathah dipesen?" (Apa yang banyak dipesan?)\n• "Pinten regine?" (Berapa harganya?)\n\n🎙️ Wangsulan panjenengan: [Ketik jawaban neng Basa Jawa]`;
        } else if (language === 'balinese') {
          return `🎭 Skenario Parindikan: ${scenario?.toUpperCase()} - BALINESE\n\n📍 Genah: Ida di warung sate di Denpasar\n🎯 Maksud: Pesen tetedahan lan inum\n⭐ Tingkat susah: ${difficulty}\n\n🤵 Pemilik Warung: "Om swastiastu! Nayen lakar nyen?"\n(Om swastiastu! Mau pesan apa?)\n\n💡 Usulan surat:\n• "Tiang lakar sate ayam" (Saya mau sate ayam)\n• "Apa sane akeh kapesen?" (Apa yang banyak dipesan?)\n• "Kuda pipis?" (Berapa harganya?)\n\n🎙️ Surat ida: [Ketik jawaban ring Basa Bali]`;
        }
        return `🎭 Conversation Scenario: ${scenario?.toUpperCase()} - ${language.toUpperCase()}\n\n📍 Setting: You're at a restaurant in Madrid\n🎯 Goal: Order food and drinks\n⭐ Difficulty: ${difficulty}\n\n🤵 Waiter: "¡Buenas tardes! ¿Mesa para cuántas personas?"\n(Good afternoon! Table for how many people?)\n\n💡 Suggested responses:\n• "Mesa para dos, por favor" (Table for two, please)\n• "Solo para una persona" (Just for one person)\n• "Somos tres personas" (We are three people)\n\n🎙️ Your response: [Type your answer in Spanish]`;
        
      case 'respond':
        return `💬 Conversation continues...\n\n👤 You said: "${user_response}"\n\n✅ Grammar check: Excellent!\n🎯 Pronunciation tip: Stress on "CUA-tro"\n⭐ Cultural note: Very polite - well done!\n\n🤵 Waiter: "Perfecto. Aquí tiene la carta. ¿Qué les gustaría beber?"\n(Perfect. Here's the menu. What would you like to drink?)\n\n💡 Drink vocabulary:\n• Agua (water) • Vino tinto (red wine) • Cerveza (beer)\n• Café (coffee) • Jugo de naranja (orange juice)\n\n🎙️ How do you respond?`;
        
      case 'get_feedback':
        return `📊 Conversation Feedback - ${scenario} scenario\n\n🎯 Performance Summary:\n• Fluency: 8/10 - Great flow!\n• Grammar: 7/10 - Minor conjugation error\n• Vocabulary: 9/10 - Excellent word choice\n• Pronunciation: 8/10 - Very clear\n• Cultural awareness: 10/10 - Perfect politeness\n\n✅ Strengths:\n• Used formal register appropriately\n• Great use of "por favor" and "gracias"\n• Confident sentence structure\n\n🎯 Areas to improve:\n• Practice subjunctive mood\n• Work on rolling R's\n• Learn more food vocabulary\n\n⭐ Overall grade: B+ (87%)\n🏆 Achievement unlocked: Restaurant Regular!`;
        
      case 'suggest_phrases':
        return `💡 Useful Phrases for ${scenario?.toUpperCase()} - ${language.toUpperCase()}\n\n🗣️ Essential Expressions:\n\n🔹 Asking questions:\n• "¿Podría ayudarme?" (Could you help me?)\n• "¿Cuánto cuesta?" (How much does it cost?)\n• "¿Dónde está...?" (Where is...?)\n\n🔹 Being polite:\n• "Disculpe" (Excuse me)\n• "Lo siento" (I'm sorry)\n• "Con permiso" (With your permission)\n\n🔹 Emergency phrases:\n• "No entiendo" (I don't understand)\n• "¿Puede repetir?" (Can you repeat?)\n• "Más despacio, por favor" (More slowly, please)\n\n💪 Practice tip: Use 3 of these phrases in your next conversation!`;
        
      case 'change_scenario':
        return `🎭 Available Conversation Scenarios - ${language.toUpperCase()}\n\n🍽️ Restaurant (Current)\n• Order food, ask about ingredients, pay the bill\n• Difficulty: Beginner to Intermediate\n\n🛍️ Shopping\n• Buy clothes, negotiate prices, ask for sizes\n• Difficulty: Beginner to Advanced\n\n🗺️ Asking for Directions\n• Navigate the city, use transportation, find landmarks\n• Difficulty: Intermediate\n\n🏨 Hotel Check-in\n• Make reservations, complain about room, request services\n• Difficulty: Intermediate to Advanced\n\n👨‍⚕️ Doctor Visit\n• Describe symptoms, understand medical advice\n• Difficulty: Advanced\n\nWhich scenario interests you? Type the name to switch!`;
        
      default:
        return `Unknown conversation action: ${action}`;
    }
  }
};

// Pronunciation Coach Tool
export const pronunciationCoachTool: Tool = {
  name: 'pronunciation_coach',
  description: 'Audio pronunciation guidance and practice exercises',
  parameters: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        description: 'Pronunciation coaching action',
        enum: ['sound_guide', 'word_practice', 'sentence_drill', 'accent_tips', 'record_feedback']
      },
      language: {
        type: 'string',
        description: 'Target language for pronunciation',
        enum: ['spanish', 'french', 'german', 'italian', 'portuguese', 'chinese', 'japanese', 'indonesian', 'sundanese', 'javanese', 'balinese', 'minangkabau', 'batak', 'betawi']
      },
      word: {
        type: 'string',
        description: 'Specific word to practice'
      },
      sound: {
        type: 'string',
        description: 'Specific sound or phoneme to focus on'
      },
      difficulty: {
        type: 'string',
        description: 'Pronunciation difficulty for native English speakers',
        enum: ['easy', 'medium', 'challenging']
      }
    },
    required: ['action', 'language']
  },
  execute: async (params) => {
    const { action, language, word, sound, difficulty } = params;
    
    switch (action) {
      case 'sound_guide':
        return `🎵 Pronunciation Guide: ${language.toUpperCase()} Sounds\n\n🔤 Challenging sounds for English speakers:\n\n${language === 'spanish' ? 
          `🎯 SPANISH:\n• RR (rolling R): "perro" - tip of tongue vibrates\n• Ñ: "niño" - like "ny" in canyon\n• J: "joven" - like "h" but stronger\n• V: "vivir" - softer than English V\n• B: "bueno" - softer than English B` :
          language === 'sundanese' ?
          `🎯 SUNDANESE (Basa Sunda):\n• EU: "eureun" - unique Sundanese vowel sound\n• NY: "nyanyi" - palatal nasal like Spanish ñ\n• NG: "ngaran" - starts words unlike English\n• R: soft trill, lighter than Spanish RR\n• Stress: usually on second-to-last syllable\n\n🌟 Tip budaya: Intonasi penting pikeun sopan santun` :
          language === 'javanese' ?
          `🎯 JAVANESE (Basa Jawa):\n• DH: "dhuwur" - retroflex D, tongue curled back\n• TH: "thole" - retroflex T, tongue curled back\n• NG: "nganti" - can start words\n• A: "basa" - more central than English "a"\n• E: two types - "e" (schwa) and "é" (open)\n\n🌟 Tip budaya: Unggah-ungguh basa ngaruh marang lafal` :
          language === 'balinese' ?
          `🎯 BALINESE (Basa Bali):\n• R: soft trill like Italian\n• NY: "nyanyi" - palatal nasal\n• NG: "ngomong" - can start syllables\n• E: "ené" - clear "e" sound\n• U: "ulu" - pure vowel, don't glide\n\n🌟 Tip budaya: Sor singgih basa ngaruh ring intonasi` :
          `🎯 FRENCH:\n• R: "rouge" - throat sound, not tongue\n• U: "tu" - round lips, say "ee"\n• EU: "peu" - unique French sound\n• Nasal vowels: "bon" - air through nose\n• Silent letters: "parlez" - don't say the "z"`
        }\n\n🎧 Audio guide: [Would include actual audio]\n💪 Practice: Start with individual sounds, then words, then sentences!`;
        
      case 'word_practice':
        return `🗣️ Word Pronunciation Practice: "${word}" (${language})\n\n🔊 Breakdown:\n• Syllables: ${word?.split('').join(' - ') || 'ex-am-ple'}\n• Stress: Second syllable (${word || 'example'})\n• Sounds: [Phonetic breakdown would be here]\n\n🎯 Step-by-step:\n1. Say each syllable slowly\n2. Combine syllables at normal speed\n3. Practice in a sentence\n4. Record yourself and compare\n\n💡 Memory trick: Think of English word "${word?.slice(0,3) || 'example'}" for the first sound\n\n📝 Practice sentence: "Yo quiero ${word || 'ejemplo'} por favor"\n\n🎤 Ready to record your attempt?`;
        
      case 'sentence_drill':
        return `🎭 Sentence Pronunciation Drill - ${language.toUpperCase()}\n\n📝 Target sentence:\n"Me gustaría una mesa para dos personas, por favor"\n(I would like a table for two people, please)\n\n🎯 Focus points:\n• "gustaría" - stress on "RI"\n• "personas" - roll the R slightly\n• "por favor" - clear separation\n\n⚡ Speed levels:\n1. 🐌 Slow: Me... gus-ta-RÍ-a... u-na... me-sa...\n2. 🚶 Normal: Me gustaría una mesa para dos personas\n3. 🏃 Fast: Natural conversational speed\n\n🎧 Listen → Repeat → Record → Compare\nStart with slow speed and work up!`;
        
      case 'accent_tips':
        return `🌟 Accent Improvement Tips - ${language.toUpperCase()}\n\n🎯 Key strategies for better accent:\n\n🔤 Sound production:\n• Listen to native speakers 20 min/day\n• Shadow speaking (repeat immediately)\n• Focus on mouth position and airflow\n• Record yourself weekly to track progress\n\n🎵 Rhythm and intonation:\n• Spanish: More even rhythm than English\n• Statements: Fall at the end\n• Questions: Rise at the end\n• Emphasis: Use stress, not volume\n\n🧠 Mental techniques:\n• Think in ${language} when possible\n• Mimic favorite movie/TV characters\n• Practice emotional expressions\n• Don't be afraid to exaggerate at first\n\n⭐ Pro tip: Accent is 70% rhythm, 30% individual sounds!`;
        
      case 'record_feedback':
        return `🎤 Recording Analysis - "${word || 'practice session'}"\n\n📊 Pronunciation Assessment:\n• Accuracy: 8.5/10 - Very good!\n• Fluency: 7/10 - Natural pace\n• Intonation: 9/10 - Excellent rising/falling\n• Confidence: 8/10 - Clear and strong\n\n✅ Strengths:\n• Perfect vowel sounds\n• Good rhythm and stress\n• Clear consonants\n\n🎯 Areas to improve:\n• Rolling R - practice daily for 5 minutes\n• Word linking - connect words more smoothly\n• Ending consonants - don't drop them\n\n📈 Progress: 15% improvement since last week!\n🏆 Achievement: Native-like vowels unlocked!\n\n💪 Next goal: Master the rolling R in sentences`;
        
      default:
        return `Unknown pronunciation action: ${action}`;
    }
  }
};

// Cultural Context Tool
export const culturalContextTool: Tool = {
  name: 'cultural_context',
  description: 'Learn cultural nuances, customs, and appropriate language use',
  parameters: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        description: 'Cultural learning action',
        enum: ['etiquette_guide', 'cultural_note', 'social_situations', 'regional_differences', 'cultural_quiz']
      },
      language: {
        type: 'string',
        description: 'Target language/culture',
        enum: ['spanish', 'french', 'german', 'italian', 'portuguese', 'chinese', 'japanese', 'indonesian', 'sundanese', 'javanese', 'balinese', 'minangkabau', 'batak', 'betawi']
      },
      situation: {
        type: 'string',
        description: 'Social situation or context',
        enum: ['formal', 'casual', 'business', 'family', 'dating', 'friendship']
      },
      region: {
        type: 'string',
        description: 'Specific region or country'
      }
    },
    required: ['action', 'language']
  },
  execute: async (params) => {
    const { action, language, situation, region } = params;
    
    switch (action) {
      case 'etiquette_guide':
        if (language === 'sundanese') {
          return `🌍 Etika Budaya: SUNDANESE (Basa Sunda)\n\n🤝 Salametan:\n• Formal: "Wilujeng enjing" + salaman hormat\n• Casual: "Kumaha damang?" + senyum\n• Sepuh: Cium tangan "Nuhun sepuh"\n• Peer: Salaman biasa\n\n⏰ Konsep waktu:\n• "Jam karet" - telat 15-30 menit wajar untuk sosial\n• Acara adat: tepat waktu sangat penting\n• Silaturahmi: waktu fleksibel\n\n🍽️ Makan bareng:\n• Tunggu "Mangga tuang" sebelum makan\n• Tangan kanan untuk makan\n• Sisakan sedikit sebagai tanda kenyang\n• "Hatur nuhun" setelah makan\n\n🎯 Undak usuk basa: Gunakan bahasa halus untuk orang tua/atasan`;
        } else if (language === 'javanese') {
          return `🌍 Etika Budaya: JAVANESE (Basa Jawa)\n\n🤝 Salam:\n• Formal: "Sugeng enjing" + salam hormat\n• Casual: "Piye kabare?" + senyum\n• Wong tuwa: Sungkem "Nuwun sewu"\n• Kanca: Salaman biasa\n\n⏰ Konsep wektu:\n• "Jam karet" - telat wajar kanggo acara sosial\n• Upacara adat: kudu tepat waktu\n• Kumpul-kumpul: santai wae\n\n🍽️ Nedha bareng:\n• Enteni "Monggo dhahar" sadurunge mangan\n• Tangan tengen kanggo mangan\n• Sisa sithik tandane wis wareg\n• "Matur nuwun" sawise mangan\n\n🎯 Unggah-ungguh: Nggo basa alus kanggo wong tuwa/atasan`;
        } else if (language === 'balinese') {
          return `🌍 Etika Budaya: BALINESE (Basa Bali)\n\n🤝 Pamedek:\n• Formal: "Om swastiastu" + sembah\n• Santai: "Kenken kabare?" + senyum\n• Ida bagus/ayu: Sembah hormat\n• Timpal: Salaman biasa\n\n⏰ Konsep galah:\n• Acara agama: tepat waktu\n• Banjar meeting: agak telat wajar\n• Ngumpul-ngumpul: santai\n\n🍽️ Ngunyah bareng:\n• Entosang "Om swastiastu" sadereng tedun\n• Lima tengen kangge ngunyah\n• Sisa akidik tanda sampun wareg\n• "Suksma" raris ngunyah\n\n🎯 Sor singgih: Sor kangge ida senior/pemimpin`;
        }
        return `🌍 Cultural Etiquette: ${language.toUpperCase()} Speaking Countries\n\n🤝 Greetings:\n• Formal: "Buenos días" + handshake\n• Casual: "Hola" + cheek kiss (varies by region)\n• Business: Firm handshake + eye contact\n• Family: Warm embrace + kiss on both cheeks\n\n⏰ Time concepts:\n• Punctuality: Varies by country\n• Spain: 15 minutes late is normal\n• Mexico: "Mexican time" can be 30+ minutes\n• Business: Always be on time\n\n🍽️ Dining:\n• Wait for "Buen provecho" before eating\n• Keep hands visible on table\n• Don't start eating until everyone is served\n• Leave small amount on plate to show satisfaction\n\n💡 Remember: When in doubt, observe locals first!`;
        
      case 'cultural_note':
        return `📚 Cultural Insight: ${situation?.toUpperCase()} Situations in ${language.toUpperCase()}\n\n🎯 Key cultural point:\nIn Spanish-speaking cultures, personal relationships are highly valued. This affects language use significantly.\n\n💬 Language implications:\n• More small talk before business\n• Family and personal questions are normal\n• "¿Cómo está la familia?" (How's the family?) is common\n• Formal titles show respect: "Don/Doña" + first name\n\n🚫 Avoid:\n• Getting straight to business\n• Being overly direct with criticism\n• Ignoring social hierarchies\n• Rushing conversations\n\n✅ Do:\n• Ask about well-being\n• Show interest in personal life\n• Use appropriate formal/informal speech\n• Take time for relationship building`;
        
      case 'social_situations':
        return `🎭 Social Situation Guide: ${situation} Context - ${language.toUpperCase()}\n\n📍 FORMAL BUSINESS MEETING:\n\n🗣️ Language register:\n• Use "usted" (formal you)\n• "Señor/Señora" + last name\n• "Me gustaría" instead of "quiero"\n• "¿Podríamos?" instead of "¿Podemos?"\n\n💼 Phrases to know:\n• "Encantado de conocerle" (Pleased to meet you)\n• "¿Podríamos programar una reunión?" (Could we schedule a meeting?)\n• "Me parece una excelente idea" (That seems like an excellent idea)\n\n🎯 Cultural tips:\n• Arrive exactly on time\n• Dress conservatively\n• Exchange business cards with both hands\n• Maintain professional distance\n\n⚠️ Avoid casual slang or overly familiar language!`;
        
      case 'regional_differences':
        return `🗺️ Regional Variations: ${language.toUpperCase()} Around the World\n\n🌎 SPANISH VARIATIONS:\n\n🇪🇸 Spain:\n• "Vale" (okay) vs "Está bien"\n• "Ordenador" (computer) vs "Computadora"\n• Vosotros form used\n• Pronunciation: "Ce/Ci" as "th" sound\n\n🇲🇽 Mexico:\n• "¿Mande?" (pardon?) vs "¿Cómo?"\n• "Platicar" (to chat) vs "Charlar"\n• More formal register generally\n• "Ch" and "Ll" pronounced differently\n\n🇦🇷 Argentina:\n• "Che" (hey) - very common\n• "Vos" instead of "tú"\n• Italian influence in pronunciation\n• "Ll" and "Y" sound like "sh"\n\n💡 Language tip: Learn the most common version first (usually Mexican or Peninsular Spanish), then adapt!`;
        
      case 'cultural_quiz':
        return `🧠 Cultural Knowledge Quiz: ${language.toUpperCase()}\n\n❓ Question 1/5:\nYou're invited to dinner at a Spanish family's home at 9 PM. What time should you arrive?\n\na) 9:00 PM exactly\nb) 8:45 PM (15 minutes early)\nc) 9:15 PM (15 minutes late)\nd) 9:30 PM (30 minutes late)\n\n💡 Think about cultural attitudes toward time!\n\n❓ Question 2/5:\nIn a Mexican restaurant, the waiter says "Buen provecho" to you. This means:\n\na) "Good luck"\nb) "Enjoy your meal"\nc) "Thank you for coming"\nd) "Please pay now"\n\n🎯 Cultural context matters for language comprehension!\n\nType a, b, c, or d for your answers!`;
        
      default:
        return `Unknown cultural action: ${action}`;
    }
  }
};
