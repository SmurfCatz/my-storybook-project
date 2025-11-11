// src/hooks/useContacts.ts
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchContacts = async () => {
      const query = `
        query {
          contacts {
            id
            name
            phone
            position
            avatar
          }
        }
      `;
      try {
        const res = await fetch(GRAPHQL_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });
        const result = await res.json();
        if (result.errors) throw result.errors;
        setContacts(result.data.contacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  return { contacts, loading };
};