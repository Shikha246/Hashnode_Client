// Average adult reading speed is ~200-250 words per minute; we'll use 200
const WORDS_PER_MINUTE = 200;

export const getReadingTime = (markdownContent) => {
  if (!markdownContent) return 1;

  const plainText = markdownContent
    .replace(/```[\s\S]*?```/g, '') // strip code blocks (not "reading" in the same sense)
    .replace(/[#*_>`~\[\]()!-]/g, '') // strip markdown symbols
    .trim();

  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);

  return Math.max(minutes, 1); // never show "0 min read"
};