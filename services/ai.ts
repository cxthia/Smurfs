// ai.ts
// Service for emotion classification using OpenAI or Gemini API
// All AI calls go through this service. Returns structured emotion output.

// Replace with your OpenAI/Gemini API key and endpoint
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export type EmotionResult = {
  primaryEmotion: string;
  secondaryEmotion?: string;
  confidence: number;
  tags: string[];
};

/**
 * Classifies user emotion from check-in responses using LLM API.
 * @param input Raw check-in responses (energy, dayType, socialEnergy, text, createdAt)
 * @returns Structured emotion result
 */
export async function classifyEmotion(input: Record<string, unknown>): Promise<EmotionResult> {
  // Compose prompt for emotion classification
  const prompt = `Classify the user's emotions from these responses. Only return emotion, confidence, and tags.\nResponses: ${JSON.stringify(input)}`;

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 60,
      }),
    });
    const data = await response.json();
    // Parse LLM output (mock logic for hackathon)
    // Example output: { primaryEmotion, secondaryEmotion, confidence, tags }
    const result = data.choices?.[0]?.message?.content;
    // For demo, mock parse:
    if (!result) {
      return {
        primaryEmotion: 'okay',
        confidence: 0.7,
        tags: ['demo'],
      };
    }
    // Try to parse JSON from LLM
    try {
      return JSON.parse(result);
    } catch {
      // Fallback: simple parsing
      return {
        primaryEmotion: 'okay',
        confidence: 0.7,
        tags: ['demo'],
      };
    }
  } catch (error) {
    console.error('LLM classification failed:', error);
    // Return mock result for demo
    return {
      primaryEmotion: 'okay',
      confidence: 0.7,
      tags: ['demo'],
    };
  }
}
