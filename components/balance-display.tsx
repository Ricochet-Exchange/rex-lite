import { NextPage } from 'next';
import { useAccount, useBalance } from 'wagmi';
import { polygon } from 'wagmi/chains';

interface Props {
	tokenAddress: string;
	showSymbol: boolean;
}

export const BalanceDisplay: NextPage<Props> = ({ tokenAddress, showSymbol }): JSX.Element => {
	const { address } = useAccount();
	const { data: balance } = useBalance({
		address: address,
		chainId: polygon.id,
		token: tokenAddress as `0x${string}`,
	});
	if (!balance) {
		return (
			<div className='animate-pulse'>
				<div className='h-4 rounded bg-slate-700'></div>
			</div>
		);
	}
	return (
		<>
			<span>{Number(balance?.formatted).toFixed(2)}</span>
			{showSymbol && <span>{balance?.symbol}</span>}
		</>
	);
};
