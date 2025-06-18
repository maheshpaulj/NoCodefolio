import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { createHash } from 'crypto';

/**
 * Generates a unique and stable Vercel project name.
 * @param portfolioName The user-defined name of the portfolio.
 * @param portfolioId The unique, immutable Firestore document ID of the portfolio.
 * @returns A unique string for the Vercel project name (e.g., "my-project-x4f9z1").
 */
export function generateVercelProjectName(portfolioName: string, portfolioId: string): string {
  // 1. Create a clean slug from the portfolio name
  const slug = portfolioName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')      // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-')      // Replace multiple - with single -
    .substring(0, 40);         // Truncate to a reasonable length

  // 2. Create a short, stable hash from the immutable portfolio ID
  const hash = createHash('sha256').update(portfolioId).digest('hex').substring(0, 2);

  // 3. Combine them
  // We no longer need the "-portfolio-builder" suffix as the hash provides uniqueness.
  return `${slug || 'portfolio'}-bp${hash}`;
}