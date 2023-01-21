import { erc20ABI, getAccount, getContract } from '@wagmi/core';
import { upgradeTokensList } from 'constants/upgradeConfig';
import { allowance } from './../pages/api/ethereum';
import { getSuperTokenBalances } from './getSuperTokenBalances';

export const checkForApproval = (tokenAddress: string, superTokenAddress: string) => {
	const { address } = getAccount();
	return getSuperTokenBalances(address!).then(async (res) => {
		const contract = await getContract({ address: tokenAddress, abi: erc20ABI });
		console.log({ contract });
		const allowAmount = await allowance(contract, address!, superTokenAddress);
		console.log({ allowAmount });
		const coin = upgradeTokensList.find((c) => c.tokenAddress === tokenAddress);
		console.log({ coin });
		const decimals = coin ? coin.multi : 1;
		console.log({ decimals });
		const hasApprove = parseFloat(allowAmount) > parseFloat(res && res[tokenAddress]) * decimals;
		console.log({ hasApprove });
		return hasApprove;
	});
};
