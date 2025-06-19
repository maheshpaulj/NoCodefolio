import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoCodefolio - A No-Code Portfolio Builder",
  description: "Create and deploy your portfolio in seconds — no code required.",
  keywords: [
    "NoCodefolio",
    "portfolio builder",
    "no-code",
    "developer portfolio",
    "Next.js portfolio",
    "free portfolio generator"
  ],
  authors: [
    { name: "Mahesh Paul", url: "https://github.com/maheshpaulj" },
    { name: "Aryan Sharma" }
  ],
  creator: "NoCodefolio Team",
  metadataBase: new URL("https://nocodefolio.vercel.app"),
  openGraph: {
    title: "NoCodefolio - Build Your Portfolio Without Code",
    description: "Generate, customize, and deploy a developer portfolio instantly. 100% free and open source.",
    url: "https://nocodefolio.vercel.app",
    siteName: "NoCodefolio",
    images: [
      {
        url: "/assets/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "NoCodefolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoCodefolio - A No-Code Portfolio Builder",
    description: "Create and deploy your portfolio in seconds — 100% free and open source.",
    creator: "@maheshpaulj",
    images: ["/assets/thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: "bg-slate-800 text-white border border-slate-700",
        }}
      />
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
