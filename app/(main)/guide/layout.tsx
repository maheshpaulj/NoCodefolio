import type { Metadata } from "next";

export const metadata:Metadata = {
  title: "NoCodefolio – Guide",
  description: "Follow these simple steps to launch your stunning, professional portfolio in just a few minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        {children}
    </>
  );
}
