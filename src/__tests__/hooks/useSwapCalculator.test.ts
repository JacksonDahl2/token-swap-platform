import { describe, it, expect, beforeEach } from "@jest/globals";
import { renderHook, act } from "@testing-library/react";
import { useSwapCalculator } from "@/hooks/useSwapCalculator";
import { GetAssetPriceInfoResponse } from "@funkit/api-base";

describe("useSwapCalculator", () => {
  const mockFromTokenPrice: GetAssetPriceInfoResponse = {
    unitPrice: 1.0,
    amount: 1,
    total: 1.0,
  };

  const mockToTokenPrice: GetAssetPriceInfoResponse = {
    unitPrice: 2000.0,
    amount: 1,
    total: 2000.0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with empty inputs and correct exchange rate", () => {
    const { result } = renderHook(() =>
      useSwapCalculator({
        fromTokenPrice: mockFromTokenPrice,
        toTokenPrice: mockToTokenPrice,
      }),
    );

    expect(result.current.curFromInput).toBe("");
    expect(result.current.curToInput).toBe("");
    expect(result.current.exchangeRate).toBe(0.0005); // 1/2000
  });

  it("should calculate exchange rate correctly", () => {
    const { result } = renderHook(() =>
      useSwapCalculator({
        fromTokenPrice: { unitPrice: 100, amount: 1, total: 100 },
        toTokenPrice: { unitPrice: 50, amount: 1, total: 50 },
      }),
    );

    expect(result.current.exchangeRate).toBe(2); // 100/50
  });

  it("should update from input and calculate to input correctly", () => {
    const { result } = renderHook(() =>
      useSwapCalculator({
        fromTokenPrice: mockFromTokenPrice,
        toTokenPrice: mockToTokenPrice,
      }),
    );

    act(() => {
      result.current.handleUpdateFrom("100");
    });

    expect(result.current.curFromInput).toBe("100");
    expect(result.current.curToInput).toBe("0.050000"); // 100 * 0.0005
  });

  it("should update to input and calculate from input correctly", () => {
    const { result } = renderHook(() =>
      useSwapCalculator({
        fromTokenPrice: mockFromTokenPrice,
        toTokenPrice: mockToTokenPrice,
      }),
    );

    act(() => {
      result.current.handleUpdateTo("1");
    });

    expect(result.current.curToInput).toBe("1");
    expect(result.current.curFromInput).toBe("2000.000000"); // 1 / 0.0005
  });

  it("should validate numeric input correctly", () => {
    const { result } = renderHook(() =>
      useSwapCalculator({
        fromTokenPrice: mockFromTokenPrice,
        toTokenPrice: mockToTokenPrice,
      }),
    );

    act(() => {
      result.current.handleUpdateFrom("abc123.45def");
    });

    expect(result.current.curFromInput).toBe("123.45");
  });

  it("should handle multiple decimal points", () => {
    const { result } = renderHook(() =>
      useSwapCalculator({
        fromTokenPrice: mockFromTokenPrice,
        toTokenPrice: mockToTokenPrice,
      }),
    );

    act(() => {
      result.current.handleUpdateFrom("1.2.3.4");
    });

    expect(result.current.curFromInput).toBe("1.234");
  });

  it("should clear inputs correctly", () => {
    const { result } = renderHook(() =>
      useSwapCalculator({
        fromTokenPrice: mockFromTokenPrice,
        toTokenPrice: mockToTokenPrice,
      }),
    );

    act(() => {
      result.current.handleUpdateFrom("100");
      result.current.handleUpdateTo("0.05");
    });

    expect(result.current.curFromInput).toBe("100.000000");
    expect(result.current.curToInput).toBe("0.05");

    act(() => {
      result.current.clearInputs();
    });

    expect(result.current.curFromInput).toBe("");
    expect(result.current.curToInput).toBe("");
  });

  it("should handle zero values correctly", () => {
    const { result } = renderHook(() =>
      useSwapCalculator({
        fromTokenPrice: mockFromTokenPrice,
        toTokenPrice: mockToTokenPrice,
      }),
    );

    act(() => {
      result.current.handleUpdateFrom("0");
    });

    expect(result.current.curFromInput).toBe("0");
    expect(result.current.curToInput).toBe("0.000000");
  });

  it("should handle empty string input", () => {
    const { result } = renderHook(() =>
      useSwapCalculator({
        fromTokenPrice: mockFromTokenPrice,
        toTokenPrice: mockToTokenPrice,
      }),
    );

    act(() => {
      result.current.handleUpdateFrom("");
    });

    expect(result.current.curFromInput).toBe("");
    expect(result.current.curToInput).toBe("0.000000");
  });
});
