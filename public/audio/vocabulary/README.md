# Sundanese Vocabulary Audio Files

This directory contains authentic Sundanese pronunciation audio files for dictionary words.

## Directory Structure

- `greetings/` - Common greetings and polite expressions
- `family/` - Family member terms and relationships
- `food/` - Food, drinks, and cooking terms
- `nature/` - Animals, plants, and natural phenomena
- `culture/` - Traditional culture, arts, and customs
- `emotions/` - Feelings and emotional expressions
- `daily/` - Daily activities and common phrases
- `numbers/` - Numbers and counting
- `time/` - Time-related expressions
- `body/` - Body parts and health terms

## Audio File Naming Convention

Audio files should be named using the Sundanese word in lowercase, with special characters replaced:
- `hallo.mp3` for "Halo"
- `wilujeng_enjing.mp3` for "Wilujeng enjing"
- `nuhun.mp3` for "Nuhun"

## Audio Quality Guidelines

- Format: MP3, 128kbps minimum
- Sample rate: 44.1kHz
- Duration: 1-3 seconds per word
- Clear pronunciation by native speaker
- Minimal background noise
- Consistent volume levels

## Usage in Application

The audio files are automatically loaded by the dictionary component when available. If no audio file exists for a word, the system falls back to text-to-speech synthesis.

Example usage:
```typescript
const audioPath = `/audio/vocabulary/${category}/${word.toLowerCase().replace(/\s+/g, '_')}.mp3`;
```

## Contributing Audio

To add new vocabulary audio:
1. Record clear pronunciation by native Sundanese speaker
2. Save as MP3 with appropriate filename
3. Place in correct category folder
4. Update vocabulary data with `audioFile` property
