import {
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo,
} from "@funkit/api-base";
import logger from "@/lib/server/logger";
import { TokenDataWithErrorSchema, TokenDataWithError } from "@/types/token";

/**
 *  Fetches the token data from the @funkit/api-base library, and validates the response
 */
export const fetchTokenData = async (
  tokenNames: Record<string, string>,
  apiKey: string,
): Promise<TokenDataWithError[]> => {
  const tokenDataEntries = Object.entries(tokenNames).map(
    async ([symbol, chainId]): Promise<TokenDataWithError> => {
      try {
        const tokenInfo = await getAssetErc20ByChainAndSymbol({
          chainId: chainId.toString(),
          symbol,
          apiKey,
        });

        if (!tokenInfo?.address) {
          throw new Error(`Token info missing address for ${symbol}`);
        }

        const priceInfo = await getAssetPriceInfo({
          chainId: chainId.toString(),
          assetTokenAddress: tokenInfo.address,
          apiKey,
        });

        const successData = {
          symbol,
          chainId,
          tokenInfo,
          priceInfo,
          error: "",
          hasError: false,
        };

        const parsedData = TokenDataWithErrorSchema.parse(successData);
        return parsedData;
      } catch (error) {
        logger.error(`Failed to fetch data for ${symbol}:`, error);

        const errorData = {
          symbol,
          chainId,
          tokenInfo: null,
          priceInfo: {
            unitPrice: 0,
            amount: 0,
            total: 0,
          },
          error: error instanceof Error ? error.message : "Unknown error",
          hasError: true,
        };

        const parsedErrorData = TokenDataWithErrorSchema.parse(errorData);
        return parsedErrorData;
      }
    },
  );

  return await Promise.all(tokenDataEntries);
};
