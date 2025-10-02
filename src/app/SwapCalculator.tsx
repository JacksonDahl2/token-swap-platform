/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { GetAssetPriceInfoResponse } from "@funkit/api-base";

interface SwapCalculatorProps {
  fromToken: string;
  toToken: string;
  fromTokenPrice: GetAssetPriceInfoResponse;
  toTokenPrice: GetAssetPriceInfoResponse;
}

/**
 * This function just neccessary to be mobile safe
 */
const validateNumericInput = (val: string): string => {
  const numericValue = val.replace(/[^0-9.]/g, "");
  const parts = numericValue.split(".");
  const cleanValue =
    parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : numericValue;
  return cleanValue;
};

const SwapCalculator = ({
  fromToken,
  toToken,
  fromTokenPrice,
  toTokenPrice,
}: SwapCalculatorProps) => {
  // I need to use strings and switch between because react doesn't like
  // switching from undefined to defined (undefined -> number)
  const [curFromInput, setCurFromInput] = useState<string>("");
  const [curToInput, setCurToInput] = useState<string>("");

  const getExchangeRate = () => {
    return fromTokenPrice.unitPrice / toTokenPrice.unitPrice;
  };
  const [exchangeRate, setExchangeRate] = useState(getExchangeRate);

  // need to have a switch from updating the other

  const handleClear = () => {
    setCurFromInput("");
    setCurToInput("");
  };

  // if exchange rate needs to change
  useEffect(() => {
    setExchangeRate(getExchangeRate);
    // have to call to reset the vals
    handleClear();
  }, [fromTokenPrice, toTokenPrice]);

  // has to be functions instead of useEffect otherwise will cause infinite loop
  const handleUpdateTo = (val: string) => {
    const cleanValue = validateNumericInput(val);
    setCurToInput(cleanValue);
    const numVal = parseFloat(cleanValue) || 0;
    const calculated = numVal / exchangeRate;
    setCurFromInput(calculated.toFixed(6));
  };

  const handleUpdateFrom = (val: string) => {
    const cleanValue = validateNumericInput(val);
    setCurFromInput(cleanValue);
    const numVal = parseFloat(cleanValue) || 0;
    const calculated = numVal * exchangeRate;
    setCurToInput(calculated.toFixed(6));
  };

  return (
    <Card className="border bg-card p-4 sm:p-6 mx-2 sm:mx-8 lg:mx-35">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-primary-foreground">
            Swap Calculator
          </h3>
          <Button
            onClick={handleClear}
            className="text-sm text-muted-foreground hover:text-foreground hover:border transition-colors"
          >
            Clear
          </Button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            From {fromToken}
          </label>
          <div className="relative">
            <Input
              type="number"
              inputMode="decimal"
              pattern="[0-9]*\.?[0-9]*"
              value={curFromInput}
              onChange={(e) => handleUpdateFrom(e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-3 sm:px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-base min-h-[48px]"
            />
          </div>
        </div>

        <div className="text-center py-2">
          <div className="text-sm text-muted-foreground">
            1 {fromToken} = {exchangeRate > 0 ? exchangeRate.toFixed(6) : "N/A"}{" "}
            {toToken}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            To {toToken}
          </label>
          <div className="relative">
            <Input
              type="number"
              inputMode="decimal"
              pattern="[0-9]*\.?[0-9]*"
              value={curToInput}
              onChange={(e) => handleUpdateTo(e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-3 sm:px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-base min-h-[48px]"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SwapCalculator;
