import { useState, useEffect } from 'react';

export function useNextAuthConfig() {
  const [nextAuthSecret, setNextAuthSecret] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function checkConfig() {
      try {
        const res = await fetch("/api/auth/check-config");
        if (!res.ok) throw new Error('Failed to fetch config');
        const { nextAuthSecret } = await res.json();
        setNextAuthSecret(nextAuthSecret);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    checkConfig();
  }, []);

  return { nextAuthSecret, isLoading, error }
}