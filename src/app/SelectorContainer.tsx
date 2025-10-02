"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import DataDisplayContainer from "./DataDisplayContainer";
import SwapCalculator from "./SwapCalculator";
import { TokenDataWithError } from "@/types/token";

const getErrorState = (
  fromToken: string | null,
  toToken: string | null,
  fromTokenData: TokenDataWithError | null,
  toTokenData: TokenDataWithError | null,
) => {
  if (!fromToken || !toToken) {
    return {
      title: "Select tokens to swap",
      message: "Choose both from and to tokens to see the swap calculator",
    };
  }

  if (!fromTokenData || !toTokenData) {
    return {
      title: "Loading token data...",
      message: "Improper token selected, please select another",
    };
  }

  if (
    !fromTokenData.priceInfo?.unitPrice ||
    !toTokenData.priceInfo?.unitPrice
  ) {
    let message = "";
    if (
      !fromTokenData.priceInfo.unitPrice &&
      !toTokenData.priceInfo.unitPrice
    ) {
      message = `Unable to fetch prices for both ${fromToken} and ${toToken}`;
    } else if (!fromTokenData.priceInfo.unitPrice) {
      message = `Unable to fetch price for ${fromToken}`;
    } else if (!toTokenData.priceInfo.unitPrice) {
      message = `Unable to fetch price for ${toToken}`;
    }

    return {
      title: "Price data unavailable",
      message: message,
    };
  }

  return null;
};

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

  const errorState = getErrorState(
    fromToken,
    toToken,
    fromTokenData,
    toTokenData,
  );
  const swapCalculator = errorState ? null : (
    <SwapCalculator
      fromToken={fromToken!}
      toToken={toToken!}
      fromTokenPrice={fromTokenData!.priceInfo}
      toTokenPrice={toTokenData!.priceInfo}
    />
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
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
        <Card className="border bg-card p-4 sm:p-6 lg:p-8 min-h-[180px] sm:min-h-[200px] flex items-center justify-center">
          <div className="text-center text-muted-foreground px-2">
            <p className="text-base sm:text-lg font-medium mb-2">
              {errorState?.title}
            </p>
            <p className="text-sm sm:text-base">{errorState?.message}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SelectorContainer;
