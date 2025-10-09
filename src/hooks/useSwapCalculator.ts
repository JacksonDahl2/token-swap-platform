import { useState, useEffect, useCallback } from "react";
import { GetAssetPriceInfoResponse } from "@funkit/api-base";

interface UseSwapCalculatorProps {
  fromTokenPrice: GetAssetPriceInfoResponse;
  toTokenPrice: GetAssetPriceInfoResponse;
}

/**
 * Validates and cleans numeric input for mobile safety
 */
const validateNumericInput = (val: string): string => {
  const numericValue = val.replace(/[^0-9.]/g, "");
  const parts = numericValue.split(".");
  const cleanValue =
    parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : numericValue;
  return cleanValue;
};

export const useSwapCalculator = ({
  fromTokenPrice,
  toTokenPrice,
}: UseSwapCalculatorProps) => {
  const [curFromInput, setCurFromInput] = useState<string>("");
  const [curToInput, setCurToInput] = useState<string>("");
  const [exchangeRate, setExchangeRate] = useState<number>(0);

  const calculateExchangeRate = useCallback(() => {
    return fromTokenPrice.unitPrice / toTokenPrice.unitPrice;
  }, [fromTokenPrice.unitPrice, toTokenPrice.unitPrice]);

  const clearInputs = useCallback(() => {
    setCurFromInput("");
    setCurToInput("");
  }, []);

  const handleUpdateFrom = useCallback(
    (val: string) => {
      const cleanValue = validateNumericInput(val);
      setCurFromInput(cleanValue);
      const numVal = parseFloat(cleanValue) || 0;
      const calculated = numVal * exchangeRate;
      setCurToInput(calculated.toFixed(6));
    },
    [exchangeRate],
  );

  const handleUpdateTo = useCallback(
    (val: string) => {
      const cleanValue = validateNumericInput(val);
      setCurToInput(cleanValue);
      const numVal = parseFloat(cleanValue) || 0;
      const calculated = numVal / exchangeRate;
      setCurFromInput(calculated.toFixed(6));
    },
    [exchangeRate],
  );

  useEffect(() => {
    const newExchangeRate = calculateExchangeRate();
    setExchangeRate(newExchangeRate);
    clearInputs();
  }, [calculateExchangeRate, clearInputs]);

  return {
    curFromInput,
    curToInput,
    exchangeRate,
    handleUpdateFrom,
    handleUpdateTo,
    clearInputs,
  };
};
