import { useState, useEffect } from "react";

interface Token {
  symbol: string;
  name: string;
  chainId: number;
  address?: string;
}

interface UseTokenListReturn {
  tokens: Token[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Predefined token list - you can expand this or fetch from an API
const DEFAULT_TOKENS: Token[] = [
  { symbol: "USDC", name: "USD Coin", chainId: 1 },
  { symbol: "USDT", name: "Tether USD", chainId: 137 },
  { symbol: "ETH", name: "Ethereum", chainId: 8453 },
  { symbol: "WBTC", name: "Wrapped Bitcoin", chainId: 1 },
  { symbol: "DAI", name: "Dai Stablecoin", chainId: 1 },
  { symbol: "USDC", name: "USD Coin", chainId: 137 },
  { symbol: "WETH", name: "Wrapped Ethereum", chainId: 1 },
];

export const useTokenList = (): UseTokenListReturn => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTokenList = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // In a real app, you'd fetch from an API
      setTokens(DEFAULT_TOKENS);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch token list",
      );
      console.error("Error fetching token list:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokenList();
  }, []);

  return {
    tokens,
    loading,
    error,
    refetch: fetchTokenList,
  };
};
