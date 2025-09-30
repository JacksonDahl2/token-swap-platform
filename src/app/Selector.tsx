import {
  Erc20AssetInfo,
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo,
  GetAssetPriceInfoResponse,
} from "@funkit/api-base";
import ButtonSelector from "./ButtonSelector";
import settings from "@/server/settings";
import logger from "@/server/logger";

const tokenNames = {
  USDC: '1',
  USDT: '137',
  ETH: '8453',
  WBTC: '1',
};

export interface AllTokenData  {
  symbol: string;
  chainId: string;
  tokenInfo: Erc20AssetInfo;
  priceInfo: GetAssetPriceInfoResponse;
  error?: undefined;
}

export interface TokenDataWithError {
  symbol: string;
  chainId: string;
  tokenInfo?: Erc20AssetInfo;
  priceInfo?: GetAssetPriceInfoResponse;
  error?: string;
  hasError: boolean;
}


const Selector = async () => {

  const _settings = settings();
  if (_settings instanceof Error) {
    logger.error('Invalid settings', _settings)
    throw new Error(_settings.message)
  }
  const apiKey = _settings.FUNKIT_API_KEY;

  const tokenDataEntries = Object.entries(tokenNames).map(async ([symbol, chainId]): Promise<TokenDataWithError> => {
    try {
      const tokenInfo = await getAssetErc20ByChainAndSymbol({ 
        chainId: chainId.toString(), 
        symbol, 
        apiKey 
      });
      
      const priceInfo = await getAssetPriceInfo({ 
        chainId: chainId.toString(), 
        assetTokenAddress: tokenInfo.address, 
        apiKey 
      });
      
      return { 
        symbol, 
        chainId, 
        tokenInfo, 
        priceInfo, 
        hasError: false 
      };
    } catch (error) {
      console.warn(`Failed to fetch data for ${symbol}:`, error);
      return { 
        symbol, 
        chainId, 
        error: error instanceof Error ? error.message : 'Unknown error',
        hasError: true 
      };
    }
  })

  const allTokenData: TokenDataWithError[] = await Promise.all(tokenDataEntries);
  
  // Separate successful and failed tokens
  const successfulTokens = allTokenData.filter(token => !token.hasError);
  const failedTokens = allTokenData.filter(token => token.hasError);
  
  console.log('Successful tokens:', successfulTokens);
  if (failedTokens.length > 0) {
    console.warn('Failed tokens:', failedTokens);
  }

  return (
    <div>
      <h3 className="text-primary-foreground text-2xl font-bold text-center mb-4">
        Token Price Explorer
      </h3>
      <p className="text-primary-foreground/80 text-center mb-8">
        Welcome to your token swap platform
      </p>

      {/* Two ButtonSelector components side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ButtonSelector tokenNames={tokenNames} tokenData={allTokenData} title="From Token" />
        <ButtonSelector tokenNames={tokenNames} tokenData={allTokenData} title="To Token" />
      </div>
      {/* Result card here*/}
    </div>
  );
};

export default Selector;
