import { useState, useEffect } from "react";

interface ExchangeRate {
  fromToken: string;
  toToken: string;
  rate: number;
  timestamp: number;
}

interface UseExchangeRateReturn {
  exchangeRate: ExchangeRate | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useExchangeRate = (
  fromToken: string | null,
  toToken: string | null,
  apiKey?: string,
): UseExchangeRateReturn => {
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExchangeRate = async () => {
    if (!fromToken || !toToken) {
      setExchangeRate(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API call - replace with actual exchange rate API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock exchange rate data
      const mockRate = Math.random() * 2 + 0.5; // Random rate between 0.5 and 2.5

      setExchangeRate({
        fromToken,
        toToken,
        rate: mockRate,
        timestamp: Date.now(),
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch exchange rate",
      );
      console.error("Error fetching exchange rate:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
  }, [fromToken, toToken]);

  return {
    exchangeRate,
    loading,
    error,
    refetch: fetchExchangeRate,
  };
};
