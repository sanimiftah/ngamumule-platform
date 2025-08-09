/**
 * Sundanese Vocabulary Audio Management
 * 
 * This utility helps manage audio files for the Sundanese dictionary.
 * It provides functions to check audio availability, generate paths, and manage playback.
 */

export interface VocabularyItem {
  id: number;
  sunda: string;
  english: string;
  category: string;
  pronunciation: string;
  definition: string;
  example?: string;
  exampleTranslation?: string;
  audioAvailable: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  cultural?: string;
  etymology?: string;
}

export interface AudioManifest {
  [category: string]: {
    [word: string]: {
      filename: string;
      quality: 'native' | 'synthetic';
      speaker?: string;
      duration?: number;
      fileSize?: number;
    };
  };
}

/**
 * Generate normalized filename for audio files
 */
export function generateAudioFilename(sundaneseWord: string): string {
  return sundaneseWord
    .toLowerCase()
    .replace(/\s+/g, '_')           // Replace spaces with underscores
    .replace(/[^\w\s]/gi, '')       // Remove special characters
    .replace(/_+/g, '_')            // Replace multiple underscores with single
    .replace(/^_|_$/g, '');         // Remove leading/trailing underscores
}

/**
 * Generate audio file path
 */
export function generateAudioPath(item: VocabularyItem): string {
  const filename = generateAudioFilename(item.sunda);
  const categoryFolder = item.category.toLowerCase().replace(/\s+/g, '');
  return `/audio/vocabulary/${categoryFolder}/${filename}.mp3`;
}

/**
 * Check if audio file exists (client-side)
 */
export async function checkAudioExists(path: string): Promise<boolean> {
  try {
    const response = await fetch(path, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Audio manifest for tracking which words have real audio files
 * This should be updated whenever new audio files are added
 */
export const AUDIO_MANIFEST: AudioManifest = {
  greetings: {
    'halo': { filename: 'halo.mp3', quality: 'native', speaker: 'native_speaker_1' },
    'wilujeng_enjing': { filename: 'wilujeng_enjing.mp3', quality: 'native', speaker: 'native_speaker_1' },
    'nuhun': { filename: 'nuhun.mp3', quality: 'native', speaker: 'native_speaker_1' },
    'kumaha_damang': { filename: 'kumaha_damang.mp3', quality: 'native', speaker: 'native_speaker_1' },
    'hatur_nuhun': { filename: 'hatur_nuhun.mp3', quality: 'native', speaker: 'native_speaker_1' },
  },
  family: {
    'kolot': { filename: 'kolot.mp3', quality: 'native', speaker: 'native_speaker_1' },
    'bapa': { filename: 'bapa.mp3', quality: 'native', speaker: 'native_speaker_1' },
    'indung': { filename: 'indung.mp3', quality: 'native', speaker: 'native_speaker_2' },
    'akang': { filename: 'akang.mp3', quality: 'native', speaker: 'native_speaker_1' },
  },
  food: {
    'nasi_timbel': { filename: 'nasi_timbel.mp3', quality: 'native', speaker: 'native_speaker_1' },
    'karedok': { filename: 'karedok.mp3', quality: 'native', speaker: 'native_speaker_2' },
  },
  culture: {
    'someah': { filename: 'someah.mp3', quality: 'native', speaker: 'native_speaker_1' },
  }
};

/**
 * Check if a word has real audio using the manifest
 */
export function hasRealAudio(item: VocabularyItem): boolean {
  const category = item.category.toLowerCase().replace(/\s+/g, '');
  const filename = generateAudioFilename(item.sunda);
  
  return AUDIO_MANIFEST[category]?.[filename]?.quality === 'native' || false;
}

/**
 * Get audio metadata for a word
 */
export function getAudioMetadata(item: VocabularyItem) {
  const category = item.category.toLowerCase().replace(/\s+/g, '');
  const filename = generateAudioFilename(item.sunda);
  
  return AUDIO_MANIFEST[category]?.[filename] || null;
}

/**
 * List all words with available audio files
 */
export function getWordsWithAudio(): Array<{ category: string; word: string; metadata: any }> {
  const result: Array<{ category: string; word: string; metadata: any }> = [];
  
  Object.entries(AUDIO_MANIFEST).forEach(([category, words]) => {
    Object.entries(words).forEach(([word, metadata]) => {
      result.push({ category, word, metadata });
    });
  });
  
  return result;
}

/**
 * Audio statistics
 */
export function getAudioStats() {
  let totalFiles = 0;
  let nativeFiles = 0;
  const categoryCounts: { [key: string]: number } = {};
  
  Object.entries(AUDIO_MANIFEST).forEach(([category, words]) => {
    const categoryCount = Object.keys(words).length;
    categoryCounts[category] = categoryCount;
    totalFiles += categoryCount;
    
    Object.values(words).forEach(metadata => {
      if (metadata.quality === 'native') {
        nativeFiles++;
      }
    });
  });
  
  return {
    totalFiles,
    nativeFiles,
    syntheticFiles: totalFiles - nativeFiles,
    categoryCounts,
    categories: Object.keys(categoryCounts).length
  };
}

/**
 * Generate script for batch audio file creation
 */
export function generateBatchScript(): string {
  const script = ['#!/bin/bash', '# Batch script to organize Sundanese vocabulary audio files', ''];
  
  Object.entries(AUDIO_MANIFEST).forEach(([category, words]) => {
    script.push(`# ${category.charAt(0).toUpperCase() + category.slice(1)} category`);
    script.push(`mkdir -p public/audio/vocabulary/${category}`);
    
    Object.entries(words).forEach(([word, metadata]) => {
      script.push(`# ${word.replace(/_/g, ' ')} -> ${metadata.filename}`);
      script.push(`# Quality: ${metadata.quality}, Speaker: ${metadata.speaker || 'unknown'}`);
    });
    
    script.push('');
  });
  
  return script.join('\n');
}

export default {
  generateAudioFilename,
  generateAudioPath,
  checkAudioExists,
  hasRealAudio,
  getAudioMetadata,
  getWordsWithAudio,
  getAudioStats,
  generateBatchScript,
  AUDIO_MANIFEST
};
