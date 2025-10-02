import {
  Erc20AssetInfo,
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo,
  GetAssetPriceInfoResponse,
} from "@funkit/api-base";
import SelectorContainer from "./SelectorContainer";
import settings from "@/lib/server/settings";
import logger from "@/lib/server/logger";

const tokenNames = {
  USDC: "1",
  USDT: "137",
  ETH: "8453",
  WBTC: "1",
};

import { z } from "zod";

export const AllTokenDataSchema = z.object({
  symbol: z.string(),
  chainId: z.string(),
  tokenInfo: z.any(), // Erc20AssetInfo from external library
  priceInfo: z.object({
    unitPrice: z.number(),
    amount: z.number(),
    total: z.number(),
  }),
  error: z.undefined(),
});

export const TokenDataWithErrorSchema = z.object({
  symbol: z.string(),
  chainId: z.string(),
  tokenInfo: z.any(), // Erc20AssetInfo from external library
  priceInfo: z.object({
    unitPrice: z.number(),
    amount: z.number(),
    total: z.number(),
  }),
  error: z.string(),
  hasError: z.boolean(),
});

export type AllTokenData = z.infer<typeof AllTokenDataSchema>;
export type TokenDataWithError = z.infer<typeof TokenDataWithErrorSchema>;

const Selector = async () => {
  const _settings = settings();
  if (_settings instanceof Error) {
    logger.error("Invalid settings", _settings);
    throw new Error(_settings.message);
  }
  const apiKey = _settings.FUNKIT_API_KEY;

  const tokenDataEntries = Object.entries(tokenNames).map(
    async ([symbol, chainId]): Promise<TokenDataWithError> => {
      try {
        const tokenInfo = await getAssetErc20ByChainAndSymbol({
          chainId: chainId.toString(),
          symbol,
          apiKey,
        });

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

        // Parse with Zod schema to ensure type safety
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

        // Parse error data with Zod schema
        const parsedErrorData = TokenDataWithErrorSchema.parse(errorData);
        return parsedErrorData;
      }
    },
  );

  const allTokenData: TokenDataWithError[] =
    await Promise.all(tokenDataEntries);

  return (
    <div>
      <h3 className="text-primary-foreground text-2xl font-bold text-center mb-4">
        Token Price Explorer
      </h3>
      <p className="text-primary-foreground/80 text-center mb-8">
        Welcome to your token swap platform
      </p>

      {/* Token selection container with all logic */}
      <SelectorContainer tokenNames={tokenNames} tokenData={allTokenData} />
      {/* Result card here*/}
    </div>
  );
};

export default Selector;
