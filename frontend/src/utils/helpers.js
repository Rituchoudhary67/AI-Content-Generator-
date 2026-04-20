export const CONTENT_TYPE_LABELS = {
  'blog-post': '📝 Blog Post',
  'linkedin-post': '💼 LinkedIn Post',
  'tweet-thread': '🐦 Tweet Thread',
  'email': '📧 Email',
  'product-description': '🛍️ Product Description',
  'youtube-script': '🎬 YouTube Script',
  'instagram-caption': '📸 Instagram Caption',
  'cold-outreach': '🤝 Cold Outreach'
};

export const TONE_LABELS = {
  professional: '🎩 Professional',
  casual: '😎 Casual',
  witty: '😄 Witty',
  inspirational: '✨ Inspirational',
  formal: '📋 Formal',
  conversational: '💬 Conversational'
};

export const WORD_COUNT_LABELS = {
  short: 'Short (150-250w)',
  medium: 'Medium (300-500w)',
  long: 'Long (600-900w)'
};

export function timeAgo(date) {
  const diff = Date.now() - new Date(date).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function exportMarkdown(content, title) {
  const md = `# ${title}\n\n${content}`;
  const blob = new Blob([md], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportText(content, title) {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function copyToClipboard(text) {
  await navigator.clipboard.writeText(text);
}