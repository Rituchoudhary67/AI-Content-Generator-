const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const WORD_COUNT_MAP = {
  short: '150-250',
  medium: '300-500',
  long: '600-900'
};

const CONTENT_TYPE_INSTRUCTIONS = {
  'blog-post': 'Write a well-structured blog post with a compelling headline, introduction, body sections with subheadings, and conclusion.',
  'linkedin-post': 'Write a LinkedIn post with a strong hook first line, personal insight or story, actionable takeaway, and 3-5 relevant hashtags at the end.',
  'tweet-thread': 'Write a Twitter/X thread. Start with a hook tweet (1/N), then numbered tweets. Each tweet max 280 characters. End with a summary tweet.',
  'email': 'Write a professional email with Subject line, greeting, clear body paragraphs, call to action, and signature.',
  'product-description': 'Write a compelling product description with headline, key benefits in bullet points, features, and a persuasive call to action.',
  'youtube-script': 'Write a YouTube video script with HOOK (0-15s), INTRO (15-45s), MAIN CONTENT with timestamps, and OUTRO with CTA.',
  'instagram-caption': 'Write an Instagram caption with an attention-grabbing first line, engaging story or value, call to action, and 10-15 relevant hashtags.',
  'cold-outreach': 'Write a cold outreach email. Personalized opener, clear value proposition, social proof, specific CTA. Keep it under 150 words.'
};

const TONE_INSTRUCTIONS = {
  professional: 'Use formal, authoritative language. Data-backed statements. Industry terminology where appropriate.',
  casual: 'Write like you are talking to a friend. Conversational, warm, relatable. Use contractions freely.',
  witty: 'Be clever and funny. Use wordplay, unexpected analogies, light humor. Keep it smart not silly.',
  inspirational: 'Motivating and uplifting tone. Use powerful verbs, emotionally resonant language, empowering statements.',
  formal: 'Strictly professional. No contractions. Precise vocabulary. Structured and conservative.',
  conversational: 'Natural dialogue feel. Short sentences. Questions to engage reader. Approachable and friendly.'
};

function buildPrompt({ topic, contentType, tone, targetAudience, wordCount, language }) {
  return `You are an expert content writer specializing in ${contentType.replace(/-/g, ' ')}.

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

Generate ONLY the content itself. No explanations, no preamble, just the content directly.`;
}

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

async function generateContent(params) {
  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: buildPrompt(params) }],
    temperature: 0.8,
    max_tokens: 1024,
  });

  const text = response.choices[0].message.content;
  const estimatedTokens = response.usage?.total_tokens || Math.ceil(text.split(' ').length * 1.3);

  return { text, tokensUsed: estimatedTokens };
}

async function generateImprovements(content, contentType) {
  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: buildImprovementPrompt(content, contentType) }],
    temperature: 0.3,
    max_tokens: 512,
  });

  const raw = response.choices[0].message.content.trim();

  try {
    const clean = raw.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch {
    return {
      score: 7,
      summary: 'Content looks good overall.',
      improvements: [
        { title: 'Add specificity', suggestion: 'Include concrete examples or data points.' },
        { title: 'Strengthen CTA', suggestion: 'Make your call-to-action more specific and compelling.' },
        { title: 'Improve hook', suggestion: 'The opening could be more attention-grabbing.' }
      ]
    };
  }
}

module.exports = { generateContent, generateImprovements };