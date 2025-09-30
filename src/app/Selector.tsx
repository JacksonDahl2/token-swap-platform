import {
  getAssetErc20ByChainAndSymbol,
  getAssetPriceInfo,
} from "@funkit/api-base";
import ButtonSelector from "./ButtonSelector";

const tokenNames = {
  USDC: 1,
  USDT: 137,
  ETH: 8453,
  WBTC: 1,
};

const Selector = async () => {
  // const tokenInfo = await getAssetErc20ByChainAndSymbol({
  //   chainId: '1',
  //   symbol: 'WBTC',
  //   apiKey: 'Z9SZaOwpmE40KX61mUKWm5hrpGh7WHVkaTvQJpQk'
  // })
  // const tokenInfotwo = await getAssetErc20ByChainAndSymbol({
  //   chainId: '1',
  //   symbol: 'USDC',
  //   apiKey: 'Z9SZaOwpmE40KX61mUKWm5hrpGh7WHVkaTvQJpQk'
  // })
  // console.log('TOKENINFO - ', tokenInfo)
  // const price = await getAssetPriceInfo({
  //   chainId: '1',
  //   assetTokenAddress: tokenInfo.address,
  //   apiKey: 'Z9SZaOwpmE40KX61mUKWm5hrpGh7WHVkaTvQJpQk'
  // })
  // const pricetwo = await getAssetPriceInfo({
  //   chainId: '1',
  //   assetTokenAddress: tokenInfotwo.address,
  //   apiKey: 'Z9SZaOwpmE40KX61mUKWm5hrpGh7WHVkaTvQJpQk'
  // })
  // console.log('price ', price)
  // console.log('price2 ', pricetwo)

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
        <ButtonSelector tokenNames={tokenNames} title="From Token" />
        <ButtonSelector tokenNames={tokenNames} title="To Token" />
      </div>
    </div>
  );
};

export default Selector;
