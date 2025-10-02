import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { fetchTokenData } from "@/services/tokenService";
import {
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo,
} from "@funkit/api-base";
import { TokenDataWithErrorSchema } from "@/types/token";

const mockGetAssetErc20ByChainAndSymbol =
  getAssetErc20ByChainAndSymbol as jest.MockedFunction<
    typeof getAssetErc20ByChainAndSymbol
  >;
const mockGetAssetPriceInfo = getAssetPriceInfo as jest.MockedFunction<
  typeof getAssetPriceInfo
>;

describe("tokenService", () => {
  const mockTokenNames = {
    USDC: "1",
    ETH: "8453",
  };
  const mockApiKey = "test-api-key";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchTokenData", () => {
    it("should fetch token data successfully", async () => {
      // Mock successful API responses
      mockGetAssetErc20ByChainAndSymbol.mockResolvedValueOnce({
        address: "0x1234567890abcdef",
        symbol: "USDC",
        name: "USD Coin",
        decimals: 6,
        chain: "ethereum",
      });

      mockGetAssetPriceInfo.mockResolvedValueOnce({
        unitPrice: 1.0,
        amount: 1,
        total: 1.0,
      });

      mockGetAssetErc20ByChainAndSymbol.mockResolvedValueOnce({
        address: "0xabcdef1234567890",
        symbol: "ETH",
        name: "Ethereum",
        decimals: 18,
        chain: "ethereum",
      });

      mockGetAssetPriceInfo.mockResolvedValueOnce({
        unitPrice: 2000.0,
        amount: 1,
        total: 2000.0,
      });

      const result = await fetchTokenData(mockTokenNames, mockApiKey);

      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        symbol: "USDC",
        chainId: "1",
        hasError: false,
        error: "",
      });
      expect(result[1]).toMatchObject({
        symbol: "ETH",
        chainId: "8453",
        hasError: false,
        error: "",
      });

      expect(mockGetAssetErc20ByChainAndSymbol).toHaveBeenCalledTimes(2);
      expect(mockGetAssetPriceInfo).toHaveBeenCalledTimes(2);
    });

    it("should handle missing token address", async () => {
      mockGetAssetErc20ByChainAndSymbol.mockResolvedValueOnce({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        address: null as any, // unhappy but need in order to simulate missing field
        symbol: "USDC",
        name: "USD Coin",
        decimals: 6,
        chain: "ethereum",
      });

      const result = await fetchTokenData(mockTokenNames, mockApiKey);

      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        symbol: "USDC",
        chainId: "1",
        hasError: true,
        error: "Token info missing address for USDC",
      });
    });

    it("should handle API errors gracefully", async () => {
      mockGetAssetErc20ByChainAndSymbol.mockRejectedValueOnce(
        new Error("API Error: Token not found"),
      );

      const result = await fetchTokenData(mockTokenNames, mockApiKey);

      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        symbol: "USDC",
        chainId: "1",
        hasError: true,
        error: "API Error: Token not found",
      });
    });

    it("should validate data with Zod schema", async () => {
      mockGetAssetErc20ByChainAndSymbol.mockResolvedValueOnce({
        address: "0x1234567890abcdef",
        symbol: "USDC",
        name: "USD Coin",
        decimals: 6,
        chain: "ethereum",
      });

      mockGetAssetPriceInfo.mockResolvedValueOnce({
        unitPrice: 1.0,
        amount: 1,
        total: 1.0,
      });

      const result = await fetchTokenData(mockTokenNames, mockApiKey);

      expect(() => TokenDataWithErrorSchema.parse(result[0])).not.toThrow();
      expect(result[0]).toMatchObject({
        symbol: expect.any(String),
        chainId: expect.any(String),
        tokenInfo: expect.any(Object),
        priceInfo: expect.objectContaining({
          unitPrice: expect.any(Number),
          amount: expect.any(Number),
          total: expect.any(Number),
        }),
        error: expect.any(String),
        hasError: expect.any(Boolean),
      });
    });

    it("should handle mixed success and error scenarios", async () => {
      mockGetAssetErc20ByChainAndSymbol.mockResolvedValueOnce({
        address: "0x1234567890abcdef",
        symbol: "USDC",
        name: "USD Coin",
        decimals: 6,
        chain: "ethereum",
      });

      mockGetAssetPriceInfo.mockResolvedValueOnce({
        unitPrice: 1.0,
        amount: 1,
        total: 1.0,
      });

      mockGetAssetErc20ByChainAndSymbol.mockRejectedValueOnce(
        new Error("Network error"),
      );

      const result = await fetchTokenData(mockTokenNames, mockApiKey);

      expect(result).toHaveLength(2);
      expect(result[0].hasError).toBe(false);
      expect(result[1].hasError).toBe(true);
      expect(result[1].error).toBe("Network error");
    });
  });
});
