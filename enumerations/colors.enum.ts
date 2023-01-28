import { Coin } from 'constants/coins';

export enum Color {
	ETH = '#B3FFFF',
	WBTC = '#FF8D8F',
	RIC = '#7B7EFF',
	USDC = '#2775CA',
	StIbAlluoETH = '#75E276',
	StIbAlluoUSD = '#E9DF89',
}

export const colors: Record<string, string> = {
	[Coin.ETH]: Color.ETH,
	[Coin.WBTC]: Color.WBTC,
	[Coin.RIC]: Color.RIC,
	[Coin.USDC]: Color.USDC,
	[Coin.StIbAlluoUSD]: Color.StIbAlluoUSD,
	[Coin.StIbAlluoETH]: Color.StIbAlluoETH,
};
