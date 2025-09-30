import { useState, useEffect } from "react";
import {
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo,
} from "@funkit/api-base";

interface TokenData {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  chainId: string;
}

interface PriceData {
  price: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
}

interface UseTokenDataReturn {
  tokenData: TokenData | null;
  priceData: PriceData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useTokenData = (
  chainId: string,
  symbol: string,
  apiKey: string,
): UseTokenDataReturn => {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTokenData = async () => {
    if (!symbol || !chainId || !apiKey) return;

    setLoading(true);
    setError(null);

    try {
      // Fetch token information
      const tokenInfo = await getAssetErc20ByChainAndSymbol({
        chainId,
        symbol,
        apiKey,
      });

      setTokenData({
        address: tokenInfo.address,
        symbol: tokenInfo.symbol,
        name: tokenInfo.name,
        decimals: tokenInfo.decimals,
        chainId: tokenInfo.chainId,
      });

      // Fetch price information
      const priceInfo = await getAssetPriceInfo({
        chainId,
        assetTokenAddress: tokenInfo.address,
        apiKey,
      });

      setPriceData({
        price: priceInfo.price,
        priceChange24h: priceInfo.priceChange24h,
        marketCap: priceInfo.marketCap,
        volume24h: priceInfo.volume24h,
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch token data",
      );
      console.error("Error fetching token data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokenData();
  }, [chainId, symbol, apiKey]);

  return {
    tokenData,
    priceData,
    loading,
    error,
    refetch: fetchTokenData,
  };
};
