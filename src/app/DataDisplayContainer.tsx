"use client";

import { Card } from "@/components/ui/card";
import { TokenDataWithError } from "@/types/token";

export interface DataDisplayContainerProps {
  tokenNames: Record<string, string>;
  title: string;
  selectedToken: string | null;
  onTokenSelect: (token: string) => void;
  tokenData: TokenDataWithError | null;
}

const DataDisplayContainer = ({
  tokenNames,
  title,
  selectedToken,
  onTokenSelect,
  tokenData,
}: DataDisplayContainerProps) => {
  return (
    <div className="w-full">
      <h4 className="text-primary-foreground text-lg font-semibold mb-4 text-center">
        {title}
      </h4>

      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {Object.keys(tokenNames).map((token) => (
          <button
            key={token}
            onClick={() => onTokenSelect(token)}
            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base min-h-[44px] touch-manipulation ${
              selectedToken === token
                ? "bg-accent text-accent-foreground shadow-md"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/90"
            }`}
          >
            {token}
          </button>
        ))}
      </div>

      <Card className="border bg-card p-4 sm:p-6 lg:p-8 min-h-[180px] sm:min-h-[200px] flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          {!selectedToken ? (
            <>
              <p className="text-lg font-medium mb-2">Select a token</p>
              <p className="text-sm">Choose a token to get started</p>
            </>
          ) : tokenData?.hasError ? (
            <>
              <p className="text-lg font-medium mb-2 text-red-500">
                Error loading {selectedToken}
              </p>
              <p className="text-sm text-red-400">{tokenData.error}</p>
            </>
          ) : tokenData ? (
            <>
              <p className="text-lg font-medium mb-2 text-green-600">
                {selectedToken}
              </p>
              <div className="space-y-2">
                <p className="text-sm sm:text-base">
                  Price: ${tokenData.priceInfo?.unitPrice?.toFixed(2) || "N/A"}
                </p>
                <p className="text-xs sm:text-sm break-all">
                  Address: {tokenData.tokenInfo?.address}
                </p>
                <p className="text-sm sm:text-base">
                  Chain: {tokenData.chainId}
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-lg font-medium mb-2">
                Loading {selectedToken}...
              </p>
              <p className="text-sm">Please wait while we fetch the data</p>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DataDisplayContainer;
