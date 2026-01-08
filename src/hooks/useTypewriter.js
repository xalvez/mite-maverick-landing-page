import { useState, useEffect } from "react";

export const useTypewriter = (words, speed = 100, pause = 2000) => {
  const [index, setIndex] = useState(0); // Word index
  const [subIndex, setSubIndex] = useState(0); // Character index
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(false);

  // Handle typing logic
  useEffect(() => {
    // If we finished typing a word
    if (subIndex === words[index].length + 1 && !isDeleting) {
      const timeout = setTimeout(() => setIsDeleting(true), pause);
      return () => clearTimeout(timeout);
    }

    // If we finished deleting a word
    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    // The actual typing/deleting timer
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? speed / 2 : speed); // Deleting is usually faster

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, words, speed, pause]);

  // Return the sliced string directly
  return words[index].substring(0, subIndex);
};