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
  tokenInfo: z.any(), // Erc20AssetInfo from external library - 
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
