import { readContract } from '@wagmi/core';
import { erc20ABI } from 'constants/ABIs/ERC20';
import { tokenArray, USDCAddress, WBTCAddress } from 'constants/polygon_config';
import { fromWei } from './fromWei';

export const getSuperTokenBalances = (address: string) => {
	const balances: Record<string, string> = {};
	const contractsAddress = tokenArray;
	const requests = contractsAddress.map(async (tokenAddress) => {
		const balance = await readContract({
			address: tokenAddress as `0x${string}`,
			abi: erc20ABI,
			functionName: 'balanceOf',
			args: [address],
		});
		return { balance, tokenAddress };
	});
	return Promise.all(requests).then((res: any) => {
		res.map((r: any) => {
			if (r.tokenAddress === WBTCAddress) {
				balances[r.tokenAddress] = fromWei(r.balance, 8);
			}
			if (r.tokenAddress === USDCAddress) {
				balances[r.tokenAddress] = fromWei(r.balance, 6);
			}
			balances[r.tokenAddress] = fromWei(r.balance, 18);
		});
		return balances;
	});
};
