import { useState } from "react";

export function useDeleteBlog(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteBlog = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:4000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation DeleteBlog($id: ID!) {
              deleteBlog(id: $id)
            }
          `,
          variables: { id },
        }),
      });

      const json = await res.json();

      if (json.errors) {
        throw new Error(json.errors[0].message);
      }

      onSuccess?.();
      return json.data.deleteBlog;
    } catch (err: any) {
      setError(err.message || "ไม่สามารถลบบทความได้");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteBlog, loading, error };
}