import { readContract } from '@wagmi/core';
import { streamExchangeABI } from 'constants/ABIs/streamExchange';
import { ExchangeKeys } from 'enumerations/exchangeKeys.enum';
import { indexIDA } from '../constants/flowConfig';
import { getExchangeAddressFromKey } from './getExchangeAddress';

export const getShareScaler = async (exchangeKey: ExchangeKeys, tokenA: string, tokenB: string, chain: number): Promise<number> => {
	//USDC <> IBALLUOUSDC sharescaler is not working, why is that? something to do with the way contracts and config is set up
	if (chain === 80001 || chain === 10) return 10000;
	const { outputIndex } = indexIDA.filter((data) => data.input === tokenA && data.output === tokenB)[0];
	const outputPool: any = await readContract({
		address: getExchangeAddressFromKey(exchangeKey) as `0x${string}`,
		abi: streamExchangeABI,
		functionName: 'getOutputPool',
		args: [outputIndex],
	});
	const shareScaler  = outputPool?.shareScaler! * 1e3;
	return shareScaler;
};
