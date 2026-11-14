import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursorClassName?: string;
}

export function TypewriterText({
  words,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseDuration = 2200,
  className = '',
  cursorClassName = '',
}: TypewriterTextProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const currentWord = words[wordIndex % words.length];

    let timer: NodeJS.Timeout;

    if (!isDeleting && displayText === currentWord) {
      // Finished typing full word, pause before deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && displayText === '') {
      // Finished deleting, move to next word
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      // Typing or deleting in progress
      const speed = isDeleting ? deletingSpeed : typingSpeed;
      timer = setTimeout(() => {
        const nextLength = isDeleting
          ? displayText.length - 1
          : displayText.length + 1;
        setDisplayText(currentWord.slice(0, nextLength));
      }, speed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span>{displayText}</span>
      <span
        aria-hidden="true"
        className={`inline-block w-[3px] ml-1 bg-[#0400F5] h-[0.85em] self-center animate-pulse ${cursorClassName}`}
      />
    </span>
  );
}
