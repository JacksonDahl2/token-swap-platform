// Test setup file
import { jest } from '@jest/globals';

// Mock the logger to prevent console output during tests
jest.mock('@/lib/server/logger', () => ({
  error: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
}));

// Mock the Funkit API functions
jest.mock('@funkit/api-base', () => ({
  getAssetErc20ByChainAndSymbol: jest.fn(),
  getAssetPriceInfo: jest.fn(),
}));
