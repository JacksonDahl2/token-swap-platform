"use client";

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

interface ButtonSelectorProps {
  tokenNames: Record<string, number>;
  title: string;
}

const ButtonSelector = ({ tokenNames, title }: ButtonSelectorProps) => {
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  return (
    <div className="w-full">
      <h4 className="text-primary-foreground text-lg font-semibold mb-4 text-center">
        {title}
      </h4>

      {/* Token Selection Buttons */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {Object.keys(tokenNames).map((token) => (
          <button
            key={token}
            onClick={() => setSelectedToken(token)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedToken === token
                ? "bg-accent text-accent-foreground shadow-md"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          >
            {token}
          </button>
        ))}
      </div>

      <Card className="border bg-card p-8 min-h-[200px] flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p className="text-lg font-medium mb-2">
            {selectedToken ? `Selected: ${selectedToken}` : "Select a token"}
          </p>
          <p className="text-sm">
            {selectedToken
              ? "Token details will appear here"
              : "Choose a token to get started"}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ButtonSelector;
