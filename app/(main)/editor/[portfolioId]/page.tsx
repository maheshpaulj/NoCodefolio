// app/editor/[portfolioId]/page.tsx
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { getPortfolioById } from "@/lib/actions";
import EditorClient from "@/components/EditorClient"; // The component we will rebuild

type EditorPageProps = {
  params: Promise<{ portfolioId: string }>
};

export const metadata = {
  title: "NoCodefolio - Portfolio Editor",
  description: "Edit your portfolio with our intuitive editor.",
};

export default async function EditorPage({ params }: EditorPageProps) {
  const session = await getServerSession();
  if (!session || !session.user?.email) {
    redirect("/api/auth/signin");
  }
  const { portfolioId } = await params
  const portfolio = await getPortfolioById(portfolioId);

  // Security: Ensure the portfolio exists and belongs to the current user
  if (!portfolio || portfolio.userId !== session.user.email) {
    redirect("/my-generations");
  }

  // The fetched data is passed as initialData
  return <EditorClient initialData={portfolio as any} />; // eslint-disable-line @typescript-eslint/no-explicit-any
}