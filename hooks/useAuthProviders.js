import { useState, useEffect } from 'react';

export function useAuthProviders() {
  const [providers, setProviders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProviders() {
      try {
        const res = await fetch("/api/auth/providers");
        if (!res.ok) throw new Error('Failed to fetch providers');
        const providersData = await res.json();
        setProviders(Object.values(providersData));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    loadProviders();
  }, []);

  return { providers, isLoading, error };
}