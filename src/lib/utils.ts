import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function generateTableOfContents(html: string): string {
  if (typeof window === 'undefined') return '';
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const headings = doc.querySelectorAll('h1, h2, h3');
  
  return Array.from(headings)
    .map((heading, index) => {
      const text = heading.textContent || '';
      return `${index + 1}. ${text.trim()}`;
    })
    .join('\n');
}
