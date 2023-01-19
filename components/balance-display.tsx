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
	return (
		<>
			<span>{Number(balance?.formatted).toFixed(2)}</span>
			{showSymbol && <span>{balance?.symbol}</span>}
		</>
	);
};
