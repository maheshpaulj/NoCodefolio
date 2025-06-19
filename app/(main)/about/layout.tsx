import type { Metadata } from "next";

export const metadata:Metadata = {
  title: "NoCodefolio – About",
  description: "Learn more about NoCodefolio, our mission, and the team behind this no-code portfolio builder.",
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
