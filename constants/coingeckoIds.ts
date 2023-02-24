import {
	DAIxAddress,
	MATICxAddress,
	RICAddress,
	StIbAlluoBTCAddress,
	StIbAlluoETHAddress,
	StIbAlluoUSDAddress,
	USDCxAddress,
	WBTCxAddress,
	WETHxAddress
} from 'constants/polygon_config';

export const coingeckoIds = new Map<string, string>([
	[DAIxAddress, 'dai'],
	[USDCxAddress, 'usd-coin'],
	[WETHxAddress, 'weth'],
	[WBTCxAddress, 'wrapped-bitcoin'],
	[MATICxAddress, 'matic-network'],
	[RICAddress, 'richochet'],
	// TODO: These prices need to be multiplied by the growingRatio
	// from these contracts since 1 ibAlluoUSD > 1 USD
	[StIbAlluoETHAddress, 'weth'],
	[StIbAlluoUSDAddress, 'usd-coin'],
	[StIbAlluoBTCAddress, 'wrapped-bitcoin'],
]);
