import { getSuperTokenBalances } from '@richochet/utils/getSuperTokenBalances';
import { fetchBalance } from '@wagmi/core';
import { Coin } from 'constants/coins';
import { upgradeTokensList } from 'constants/upgradeConfig';
import { colors } from 'enumerations/colors.enum';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import coingeckoApi from 'redux/slices/coingecko.slice';
import { useAccount } from 'wagmi';
import { polygon } from 'wagmi/chains';
import { OutlineButton, SolidButton } from '../button';
import { DoughnutChart } from '../graphs';
import { DataTable } from '../table';
import { BalanceTabs } from './balance-tabs';

export interface TokenData {
	token: string;
	walletAmount: string;
	ricAmount: string;
	color: string;
	dollarVal: number;
}

const geckoMapping: Record<string, string> = {
	USDC: 'usd-coin',
	MATIC: 'matic-network',
	ETH: 'ethereum',
	WBTC: 'wrapped-bitcoin',
	DAI: 'dai',
	RIC: 'richochet',
	StIbAlluoETH: 'ethereum',
	StIbAlluoBTC: 'wrapped-bitcoin',
	StIbAlluoUSD: 'usd-coin',
};

const headerTitles = ['token', 'wallet-balance', 'ricochet-balance', 'dollar-value'];

export const Balances = (): JSX.Element => {
	const { t } = useTranslation('home');
	const { address, isConnected } = useAccount();
	const [action, setAction] = useState(0);
	const [tabsClosed, setTabsClosed] = useState(true);
	const {
		data: tokens,
		isLoading,
		isFetching,
		isSuccess,
		isError,
		error,
		refetch,
		//@ts-ignore
	} = coingeckoApi.useGetUpgradedTokensListQuery();
	const [sortedUpgradeTokensList, setSortedUpgradeTokensList] = useState(upgradeTokensList);
	const [balanceList, setBalanceList] = useState<Record<string, string>>({});
	const [geckoPriceList, setGeckoPriceList] = useState<Object>();
	const [tokenList, setTokenList] = useState<TokenData[]>([]);
	useEffect(() => {
		getSuperTokenBalances(address!).then((res) => setBalanceList(res));
	}, [address]);
	useEffect(() => {
		if (isConnected) {
			if (tokens && isSuccess) setGeckoPriceList(tokens);
			if (isError) console.error(error);
			const getTokenData = async () => {
				if (geckoPriceList) {
					const tokens = await Promise.all(
						sortedUpgradeTokensList.map(async (token) => {
							const balance = await fetchBalance({
								address: address!,
								chainId: polygon.id,
								token: token.coin !== Coin.RIC ? (token.tokenAddress as `0x${string}`) : undefined,
							});
							return {
								token: token.coin,
								ricAmount: parseFloat(balanceList[token.superTokenAddress]).toFixed(2),
								walletAmount: token.coin === Coin.RIC ? 'N/A' : parseFloat(balance?.formatted).toFixed(2),
								color: colors[token.coin],
								dollarVal: parseFloat((geckoPriceList as any)[geckoMapping[token.coin]].usd),
							};
						})
					);
					// sort array by dollar value in descending order
					const sortedTokens = tokens.sort((a, b) => parseFloat(b.walletAmount) - parseFloat(a.walletAmount));
					if (sortedTokens.length > 0) setTokenList(sortedTokens);
				}
			};
			getTokenData();
		}
	}, [tokens, balanceList, geckoPriceList, sortedUpgradeTokensList]);
	return (
		<>
			<p className='font-light uppercase tracking-widest text-primary-500'>{t('your-balances')}</p>
			{!tabsClosed && <BalanceTabs close={tabsClosed} setClose={setTabsClosed} action={action} />}
			{tabsClosed && (
				<>
					<div className='flex flex-wrap items-center justify-evenly basis-1/3 my-4'>
						<OutlineButton
							type='button'
							action={`${t('withdraw')}`}
							handleClick={() => {
								setTabsClosed(false);
								setAction(0);
							}}
						/>
						<SolidButton
							type='button'
							action={`${t('deposit')}`}
							primary={true}
							handleClick={() => {
								setTabsClosed(false);
								setAction(1);
							}}
						/>
						<OutlineButton
							type='button'
							action={`${t('swap')}`}
							handleClick={() => {
								setTabsClosed(false);
								setAction(2);
							}}
						/>
					</div>
					<div className='flex justify-center my-4'>
						<DoughnutChart tokens={tokenList} />
					</div>
					<DataTable headers={headerTitles} rowData={tokenList} tableLoaderRows={6} />
				</>
			)}
		</>
	);
};
