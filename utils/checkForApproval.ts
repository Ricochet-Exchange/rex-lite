import { erc20ABI, getAccount, getContract } from '@wagmi/core';
import { upgradeTokensList } from 'constants/upgradeConfig';
import { allowance } from './../pages/api/ethereum';
import { getSuperTokenBalances } from './getSuperTokenBalances';

export const checkForApproval = (tokenAddress: string, superTokenAddress: string) => {
	const { address } = getAccount();
	return getSuperTokenBalances(address!).then(async (res) => {
		const contract = await getContract({ address: tokenAddress, abi: erc20ABI });
		const allowAmount = await allowance(contract, address!, superTokenAddress);
		const coin = upgradeTokensList.find((c) => c.tokenAddress === tokenAddress);
		const decimals = coin ? coin.multi : 1;
		const hasApprove = parseFloat(allowAmount) > parseFloat(res && res[tokenAddress]) * decimals;
		return hasApprove;
	});
};
