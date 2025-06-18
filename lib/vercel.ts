// src/lib/vercel.ts
'use server';

/**
 * Deletes a Vercel project by its ID.
 * Throws an error if the deletion fails.
 * @param projectId The ID of the Vercel project to delete.
 */
export async function deleteVercelProject(projectId: string): Promise<void> {
  if (!process.env.VERCEL_TOKEN) {
    throw new Error("VERCEL_TOKEN is not configured.");
  }

  // Use the v9 API for project deletion
  const response = await fetch(`https://api.vercel.com/v9/projects/${projectId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Vercel API Error on project deletion:", errorData.error);
    throw new Error(errorData.error.message || "Failed to delete Vercel project.");
  }

  // A 204 No Content response indicates success, so we just return.
  console.log(`Successfully deleted Vercel project: ${projectId}`);
}