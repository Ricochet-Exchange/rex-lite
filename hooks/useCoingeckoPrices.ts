import { coingeckoIds } from 'constants/coingeckoIds';
import { useEffect, useState } from 'react';
import coingeckoApi from 'redux/slices/coingecko.slice';

export const useCoingeckoPrices = () => {
	const [coingeckoPricesTrigger] = coingeckoApi.useLazyGetPricesQuery();
	const [coingeckoPrices, setCoingeckoPrices] = useState<Map<string, number>>(new Map());
	useEffect(() => {
		const ids = [...coingeckoIds.values()];
		const prices = coingeckoPricesTrigger(ids.join(','));
		prices.then((res: any) => {
			const tokenAddresses = [...coingeckoIds.keys()];
			const priceMap: Map<string, number> = new Map();
			tokenAddresses.forEach((tokenAddress) => {
				const id = coingeckoIds?.get(tokenAddress);
				const tokenData = res?.data?.filter((res: any) => res.id === id!);
				if (tokenData === undefined) {
					priceMap.set(tokenAddress, 0);
					console.warn('Could not fetch price for token ', tokenAddress);
				} else {
					priceMap.set(tokenAddress, tokenData[0]?.current_price);
				}
			});
			setCoingeckoPrices(priceMap);
		});
	}, []);
	return coingeckoPrices;
};
