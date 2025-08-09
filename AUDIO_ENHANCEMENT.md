# Enhanced Sundanese Dictionary Audio System

## Overview

The Sundanese learning dictionary now supports **real native speaker audio files** with intelligent fallback to text-to-speech synthesis. This provides users with authentic pronunciation while maintaining full coverage for all vocabulary words.

## Features

### 🎵 Real Audio Support
- Native speaker recordings for key vocabulary words
- High-quality MP3 files organized by category
- Visual indicators showing which words have real audio vs. TTS

### 🔄 Smart Fallback System
- Automatic fallback to text-to-speech if audio file not found
- Seamless user experience regardless of audio availability
- Error handling for network issues or corrupted files

### 📁 Organized File Structure
```
public/audio/vocabulary/
├── greetings/
│   ├── halo.mp3
│   ├── wilujeng_enjing.mp3
│   └── nuhun.mp3
├── family/
│   ├── kolot.mp3
│   ├── bapa.mp3
│   └── indung.mp3
├── food/
│   ├── nasi_timbel.mp3
│   └── karedok.mp3
└── culture/
    └── someah.mp3
```

### 🎯 Visual Indicators
- **Green dot (●)**: Native speaker audio available
- **No dot**: AI text-to-speech will be used
- **Pulsing border**: Audio currently playing
- **Playing...**: Status indicator during playback

## Technical Implementation

### Audio Management
- Centralized audio manifest tracking available files
- Consistent naming convention for audio files
- Metadata tracking (speaker, quality, duration)

### User Experience
- One-click audio playback for any word
- Automatic cleanup of previous audio before playing new
- Loading states and error handling
- Mobile-friendly audio controls

### Performance
- Lazy loading of audio files
- Efficient file organization by category
- Minimal memory footprint with proper cleanup

## Adding New Audio Files

### 1. Record Audio
- Use native Sundanese speakers
- Clear pronunciation, minimal background noise
- MP3 format, 128kbps minimum, 44.1kHz sample rate
- Duration: 1-3 seconds per word

### 2. File Naming
Use the `generateAudioFilename()` function or follow this pattern:
- Convert to lowercase
- Replace spaces with underscores
- Remove special characters
- Example: "Wilujeng enjing" → "wilujeng_enjing.mp3"

### 3. File Organization
Place files in appropriate category folders:
- `/audio/vocabulary/greetings/` - Common greetings
- `/audio/vocabulary/family/` - Family terms
- `/audio/vocabulary/food/` - Food and cooking
- `/audio/vocabulary/nature/` - Animals, plants, nature
- `/audio/vocabulary/culture/` - Cultural terms and customs

### 4. Update Manifest
Add entries to `AUDIO_MANIFEST` in `/src/lib/vocabulary-audio.ts`:
```typescript
greetings: {
  'new_word': { 
    filename: 'new_word.mp3', 
    quality: 'native', 
    speaker: 'native_speaker_1' 
  }
}
```

## Statistics Dashboard

The system provides real-time statistics:
- Total audio files available
- Native vs. synthetic audio breakdown
- Category-wise audio coverage
- Quality metrics and speaker information

## Future Enhancements

### Planned Features
- Multiple speaker options per word
- Regional dialect variations
- User-submitted pronunciations
- Audio quality ratings
- Offline audio downloading
- Pronunciation scoring

### Technical Improvements
- Automatic audio file detection
- Dynamic manifest generation
- Audio compression optimization
- CDN integration for faster loading
- Service worker caching for offline use

## Benefits for Language Learners

### Authentic Pronunciation
- Learn correct Sundanese pronunciation from native speakers
- Hear natural intonation and rhythm
- Develop better listening skills

### Comprehensive Coverage
- Every word has audio (native or TTS)
- No gaps in pronunciation guide
- Consistent learning experience

### Progressive Enhancement
- Start with any word using TTS
- Gradually replace with native recordings
- Maintains backward compatibility

## Integration Examples

### Basic Usage
```typescript
// Play audio for a vocabulary item
playDictionaryAudio(vocabularyItem);

// Check if real audio exists
const hasNativeAudio = hasRealAudio(vocabularyItem);

// Get audio file path
const audioPath = generateAudioPath(vocabularyItem);
```

### Advanced Features
```typescript
// Get detailed audio statistics
const stats = getAudioStats();
console.log(`${stats.nativeFiles} native recordings available`);

// List all words with audio
const audioWords = getWordsWithAudio();
```

This enhanced audio system represents a significant step forward in providing authentic, high-quality pronunciation guidance for Sundanese language learners while maintaining accessibility and ease of use.
