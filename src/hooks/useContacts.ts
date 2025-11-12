// src/hooks/useContacts.ts
import { useEffect, useState, useCallback } from "react";
import { GRAPHQL_ENDPOINT } from "../lib/api";

export interface Contact {
  id: string;
  name: string;
  phone: string;
  position: string;
  avatar: string;
}

export const useContacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            query {
              contacts {
                id
                name
                phone
                position
                avatar
              }
            }
          `,
        }),
      });
      const result = await res.json();

      if (result.errors) throw new Error(result.errors[0].message);
      setContacts(result.data?.contacts || []);
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  return { contacts, loading, error, refetch: fetchContacts };
};