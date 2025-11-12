// src/hooks/useAbout.ts
import { useEffect, useState } from "react";
import { GRAPHQL_ENDPOINT } from "../lib/api";

export interface About {
  title: string;
  description: string;
}

export const useAbout = () => {
  const [about, setAbout] = useState<About[]>([]); // array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query {
                about {
                  title
                  description
                }
              }
            `,
          }),
        });

        const result = await res.json();

        if (result.errors) {
          throw new Error(result.errors[0].message);
        }

        // ต้องเป็น array
        setAbout(Array.isArray(result.data.about) ? result.data.about : []);
      } catch (err: any) {
        setError(err.message || "เกิดข้อผิดพลาด");
        console.error("Error fetching about:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  return { about, loading, error };
};