import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Portfolio Builder",
  description: "Create and deploy your portfolio in seconds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster position="bottom-center" toastOptions={{
             className: 'bg-slate-800 text-white border border-slate-700',
          }}/>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}