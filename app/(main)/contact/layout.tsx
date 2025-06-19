import type { Metadata } from "next";

export const metadata:Metadata = {
  title: "NoCodefolio – Contact",
  description: "Connect with us for feedback, contributions, or just to say hello!",
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
