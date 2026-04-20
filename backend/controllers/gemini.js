const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// How many words each option means
const WORD_COUNT_MAP = {
  short: '150-250',
  medium: '300-500',
  long: '600-900'
};

// Instructions for each content type
const CONTENT_TYPE_INSTRUCTIONS = {
  'blog-post': 'Write a well-structured blog post with a compelling headline, introduction, body sections with subheadings, and conclusion.',
  'linkedin-post': 'Write a LinkedIn post with a strong hook first line, personal insight or story, actionable takeaway, and 3-5 relevant hashtags at the end.',
  'tweet-thread': 'Write a Twitter/X thread. Start with a hook tweet (1/N), then numbered tweets (2/, 3/...). Each tweet max 280 characters. End with a summary/CTA tweet.',
  'email': 'Write a professional email with Subject line, greeting, clear body paragraphs, call to action, and signature.',
  'product-description': 'Write a compelling product description with headline, key benefits in bullet points, features, and a persuasive call to action.',
  'youtube-script': 'Write a YouTube video script with HOOK (0-15s), INTRO (15-45s), MAIN CONTENT with timestamps, and OUTRO with CTA.',
  'instagram-caption': 'Write an Instagram caption with an attention-grabbing first line, engaging story or value, call to action, and 10-15 relevant hashtags.',
  'cold-outreach': 'Write a cold outreach email. Personalized opener, clear value proposition, social proof, specific CTA. Keep it under 150 words.'
};

// Tone instructions
const TONE_INSTRUCTIONS = {
  professional: 'Use formal, authoritative language. Data-backed statements. Industry terminology where appropriate.',
  casual: 'Write like you are talking to a friend. Conversational, warm, relatable. Use contractions freely.',
  witty: 'Be clever and funny. Use wordplay, unexpected analogies, light humor. Keep it smart, not silly.',
  inspirational: 'Motivating and uplifting tone. Use powerful verbs, emotionally resonant language, empowering statements.',
  formal: 'Strictly professional. No contractions. Precise vocabulary. Structured and conservative.',
  conversational: 'Natural dialogue feel. Short sentences. Questions to engage reader. Approachable and friendly.'
};

// This is the core prompt engineering function
function buildPrompt({ topic, contentType, tone, targetAudience, wordCount, language }) {
  return `You are an expert content writer specializing in ${contentType.replace('-', ' ')}.

TASK: Create ${contentType.replace(/-/g, ' ')} content about: "${topic}"

SPECIFICATIONS:
- Content Type Instructions: ${CONTENT_TYPE_INSTRUCTIONS[contentType]}
- Tone: ${TONE_INSTRUCTIONS[tone]}
- Target Audience: ${targetAudience}
- Word Count: Approximately ${WORD_COUNT_MAP[wordCount]} words
- Language: ${language}

QUALITY REQUIREMENTS:
- Make it engaging and original
- Avoid generic AI-sounding phrases
- Include specific details or examples where relevant
- Feel authentically human-written

Generate ONLY the content itself. No explanations, no preamble — just the content directly.`;
}

// Prompt for AI improvement suggestions
function buildImprovementPrompt(content, contentType) {
  return `You are a professional content editor. Review this ${contentType.replace(/-/g, ' ')} and provide exactly 3 specific improvement suggestions.

CONTENT:
${content}

Respond in this exact JSON format (no markdown, no backticks, just raw JSON):
{
  "score": <number 1-10>,
  "summary": "<one sentence overall assessment>",
  "improvements": [
    {"title": "<short title>", "suggestion": "<specific actionable advice>"},
    {"title": "<short title>", "suggestion": "<specific actionable advice>"},
    {"title": "<short title>", "suggestion": "<specific actionable advice>"}
  ]
}`;
}

// Generate content using Gemini
async function generateContent(params) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
  const prompt = buildPrompt(params);

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // Estimate tokens used
  const estimatedTokens = Math.ceil(text.split(' ').length * 1.3);

  return { text, tokensUsed: estimatedTokens };
}

// Get AI improvement suggestions
async function generateImprovements(content, contentType) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });
  const prompt = buildImprovementPrompt(content, contentType);

  const result = await model.generateContent(prompt);
  const raw = result.response.text().trim();

  try {
    return JSON.parse(raw);
  } catch {
    // Fallback if JSON parsing fails
    return {
      score: 7,
      summary: 'Content looks good overall.',
      improvements: [
        { title: 'Add specificity', suggestion: 'Include concrete examples or data points to support your main claims.' },
        { title: 'Strengthen CTA', suggestion: 'Make your call-to-action more specific and compelling.' },
        { title: 'Improve hook', suggestion: 'The opening could be more attention-grabbing to immediately engage readers.' }
      ]
    };
  }
}

module.exports = { generateContent, generateImprovements };