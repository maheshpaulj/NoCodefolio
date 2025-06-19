import type { Metadata } from "next";

export const metadata:Metadata = {
  title: "NoCodefolio – Your Profile",
  description: "View and manage your portfolio account info.",
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
