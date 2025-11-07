import { useEffect, useState } from "react";

export interface About {
  title: string;
  description: string;
}

export const useAbout = () => {
  const [About, setAbout] = useState<About[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      const query = `
        query {
            about {
            title
            description
            }
        }
        `;
      try {
        const res = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });
        const result = await res.json();
        setAbout(result.data.about);
      } catch (error) {
        console.error("❌ Error fetching about:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  return { About, loading };
};
