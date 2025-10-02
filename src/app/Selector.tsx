import SelectorContainer from "./SelectorContainer";
import settings from "@/lib/server/settings";
import logger from "@/lib/server/logger";
import { fetchTokenData } from "@/services/tokenService";

const tokenNames = {
  USDC: "1",
  USDT: "137",
  ETH: "8453",
  WBTC: "1",
};

const Selector = async () => {
  const _settings = settings();
  if (_settings instanceof Error) {
    logger.error("Invalid settings", _settings);
    throw new Error(_settings.message);
  }

  const allTokenData = await fetchTokenData(tokenNames, _settings.FUNKIT_API_KEY);

  return (
    <div>
      <h3 className="text-primary-foreground text-2xl font-bold text-center mb-4">
        Token Price Explorer
      </h3>
      <p className="text-primary-foreground/80 text-center mb-8">
        Welcome to your token swap platform
      </p>

      {/* Token selection container with all logic */}
      <SelectorContainer tokenNames={tokenNames} tokenData={allTokenData} />
      {/* Result card here*/}
    </div>
  );
};

export default Selector;
