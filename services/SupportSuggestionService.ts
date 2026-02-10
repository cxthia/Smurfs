// SupportSuggestionService.ts
// Service to generate support group & activity suggestions using LLM
// Uses recent emotions and location, returns framed suggestions

import { classifyEmotion } from './ai';

export type Suggestion = {
  category: 'walk & talk' | 'low-energy hangout' | 'quiet co-working' | 'support space';
  text: string;
  filters: string[];
};

/**
 * Generates support suggestions based on recent emotions and location.
 * @param recentEmotions Array of recent emotion results
 * @param location User location
 */
export async function generateSuggestions(recentEmotions: { primaryEmotion: string }[], location: { latitude: number; longitude: number }): Promise<Suggestion[]> {
  // Compose prompt for LLM
  const prompt = `Suggest normal, shared activities for users feeling ${recentEmotions.map(e => e.primaryEmotion).join(', ')} near (${location.latitude}, ${location.longitude}). Frame as "Others feeling similarly found this helpful". Categories: walk & talk, low-energy hangout, quiet co-working, support space.`;

  // For hackathon, mock LLM call
  // const llmResult = await classifyEmotion({ prompt });
  // Parse and return suggestions
  // For demo, return mock suggestions
  return [
    {
      category: 'walk & talk',
      text: 'Others feeling similarly found a walk & talk helpful.',
      filters: ['solo only', 'low interaction'],
    },
    {
      category: 'quiet co-working',
      text: 'Quiet co-working is a good option for low social energy.',
      filters: ['low interaction'],
    },
  ];
}
