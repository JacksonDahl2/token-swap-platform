import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GetAssetPriceInfoResponse } from "@funkit/api-base";
import { useSwapCalculator } from "@/hooks/useSwapCalculator";

interface SwapCalculatorProps {
  fromToken: string;
  toToken: string;
  fromTokenPrice: GetAssetPriceInfoResponse;
  toTokenPrice: GetAssetPriceInfoResponse;
}

const SwapCalculator = ({
  fromToken,
  toToken,
  fromTokenPrice,
  toTokenPrice,
}: SwapCalculatorProps) => {
  const {
    curFromInput,
    curToInput,
    exchangeRate,
    handleUpdateFrom,
    handleUpdateTo,
    clearInputs,
  } = useSwapCalculator({
    fromTokenPrice,
    toTokenPrice,
  });

  return (
    <Card className="border bg-card p-4 sm:p-6 mx-2 sm:mx-8 lg:mx-35">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-primary-foreground">
            Swap Calculator
          </h3>
          <Button
            onClick={clearInputs}
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
