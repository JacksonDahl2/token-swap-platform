"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import DataDisplayContainer from "./DataDisplayContainer";
import SwapCalculator from "./SwapCalculator";
import { TokenDataWithError } from "@/types/token";

export interface SelectorContainerProps {
  tokenNames: Record<string, string>;
  tokenData: TokenDataWithError[];
}

const SelectorContainer = ({
  tokenNames,
  tokenData,
}: SelectorContainerProps) => {
  const [fromToken, setFromToken] = useState<string | null>(null);
  const [toToken, setToToken] = useState<string | null>(null);
  const [fromTokenData, setFromTokenData] = useState<TokenDataWithError | null>(
    null,
  );
  const [toTokenData, setToTokenData] = useState<TokenDataWithError | null>(
    null,
  );

  // need to update the token data whenever the selected token changes
  useEffect(() => {
    setFromTokenData(
      fromToken
        ? (tokenData.find((token) => token.symbol === fromToken) ?? null)
        : null,
    );
  }, [fromToken, tokenData]);

  useEffect(() => {
    setToTokenData(
      toToken
        ? (tokenData.find((token) => token.symbol === toToken) ?? null)
        : null,
    );
  }, [toToken, tokenData]);

  // Determine error state and content
  let errorState = null;
  let swapCalculator = null;

  if (!fromToken || !toToken) {
    errorState = {
      title: "Select tokens to swap",
      message: "Choose both from and to tokens to see the swap calculator",
    };
  } else if (!fromTokenData || !toTokenData) {
    errorState = {
      title: "Loading token data...",
      message: "Improper token selected, please select another",
    };
  } else if (
    !fromTokenData.priceInfo?.unitPrice ||
    !toTokenData.priceInfo?.unitPrice
  ) {
    errorState = {
      title: "Price data unavailable",
      message: `Unable to fetch current prices for ${fromToken} or ${toToken}`,
    };
  } else {
    swapCalculator = (
      <SwapCalculator
        fromToken={fromToken}
        toToken={toToken}
        fromTokenPrice={fromTokenData.priceInfo}
        toTokenPrice={toTokenData.priceInfo}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Token Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DataDisplayContainer
          tokenNames={tokenNames}
          title="From Token"
          selectedToken={fromToken}
          onTokenSelect={setFromToken}
          tokenData={fromTokenData}
        />
        <DataDisplayContainer
          tokenNames={tokenNames}
          title="To Token"
          selectedToken={toToken}
          onTokenSelect={setToToken}
          tokenData={toTokenData}
        />
      </div>

      {swapCalculator || (
        <Card className="border bg-card p-8 min-h-[200px] flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p className="text-lg font-medium mb-2">{errorState?.title}</p>
            <p className="text-sm">{errorState?.message}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SelectorContainer;
