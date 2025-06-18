// app/preview/[portfolioId]/page.tsx

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPortfolioById } from '@/lib/actions';
import PortfolioRenderer from './_components/PortfolioRenderer'; // <-- Import the new wrapper

// Props type remains the same
type PortfolioPageProps = {
params: Promise<{ portfolioId: string }>
};

// --- Part 1: Corrected Dynamic SEO Metadata ---
export async function generateMetadata({ params }: PortfolioPageProps): Promise<Metadata> {
  const { portfolioId } = await params
  const portfolio = await getPortfolioById(portfolioId);

  if (!portfolio) {
    return {
      title: 'Portfolio Not Found',
    };
  }

  // Sanitize bio by removing HTML for a clean description
  const descriptionText = portfolio.bio.replace(/<[^>]*>?/gm, '');

  return {
    title: `${portfolio.name} | Portfolio`,
    description: descriptionText,
    openGraph: {
      title: `${portfolio.name} | Portfolio`,
      description: descriptionText,
      // The `profile` type is specific, so we map our data to it.
      // We'll also provide a fallback for the full name.
      images: [
        {
          url: portfolio.profileImage, // Ensure this is an absolute URL
          width: 800,
          height: 800,
          alt: `Profile picture of ${portfolio.name}`,
        },
      ],
      type: 'profile', // 'profile' is a valid type for openGraph
    },
    // Adding Twitter card metadata for better sharing on Twitter
    twitter: {
      card: 'summary_large_image',
      title: `${portfolio.name} | Portfolio`,
      description: descriptionText,
      images: [portfolio.profileImage],
    }
  };
}

// --- Part 2: Simplified Page Component ---
export default async function PortfolioPage({ params }: PortfolioPageProps) {
  // 1. Fetch data on the server
  const { portfolioId } = await params
  const portfolio = await getPortfolioById(portfolioId);

  // 2. Handle not found case
  if (!portfolio) {
    notFound();
  }

  // 3. Render the Client Component, passing the serializable data as a prop
  return <PortfolioRenderer portfolio={portfolio} />;
}