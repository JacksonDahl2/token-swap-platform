// Test setup file
import { jest } from "@jest/globals";

jest.mock("@/lib/server/logger", () => ({
  error: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
}));

jest.mock("@funkit/api-base", () => ({
  getAssetErc20ByChainAndSymbol: jest.fn(),
  getAssetPriceInfo: jest.fn(),
}));
