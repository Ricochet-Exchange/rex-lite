import { Alert } from '@richochet/components/alert';
import { BalanceDisplay } from '@richochet/components/balance-display';
import { Balances } from '@richochet/components/balances';
import { OutlineButton } from '@richochet/components/button';
import { Card, CardContainer, CardWithBackground, CardWithOutline, SmallCard } from '@richochet/components/cards';
import { Footer } from '@richochet/components/footer';
import { LaunchPad } from '@richochet/components/launchpad';
import { Markets } from '@richochet/components/markets';
import Navigation from '@richochet/components/navigation';
import { Positions } from '@richochet/components/positions';
import { Refer } from '@richochet/components/refer';
import { useIsMounted } from '@richochet/hooks/useIsMounted';
import { buildFlowQuery } from '@richochet/utils/buildFlowQuery';
import calculateStreamedSoFar from '@richochet/utils/calculateStreamedSoFar';
import { getSFFramework } from '@richochet/utils/fluidsdkConfig';
import { getFlowUSDValue } from '@richochet/utils/getFlowUsdValue';
import { getSuperTokenBalances } from '@richochet/utils/getSuperTokenBalances';
import { formatCurrency } from '@richochet/utils/helperFunctions';
import Big, { BigSource } from 'big.js';
import { ConnectKitButton } from 'connectkit';
import { flowConfig, FlowEnum, FlowTypes, InvestmentFlow } from 'constants/flowConfig';
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
import { upgradeTokensList } from 'constants/upgradeConfig';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import coingeckoApi from 'redux/slices/coingecko.slice';
import superfluidSubgraphApi from 'redux/slices/superfluidSubgraph.slice';
import { Flow } from 'types/flow';
import { useAccount, useProvider } from 'wagmi';
import { polygon } from 'wagmi/chains';

export async function getStaticProps({ locale }: any): Promise<Object> {
	return {
		props: {
			...(await serverSideTranslations(locale, ['home', 'footer'])),
		},
	};
}
const coingeckoIds = new Map<string, string>([
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
const exchangeContractsAddresses = flowConfig.map((f) => f.superToken);

export default function Home({ locale }: any): JSX.Element {
	const isMounted = useIsMounted();
	const { t } = useTranslation('home');
	const { address, isConnected } = useAccount();
	const [usdPrice, setUsdPrice] = useState<Big>(new Big(0));
	const [usdFlowRate, setUsdFlowRate] = useState<string>();
	const provider = useProvider({ chainId: polygon.id });
	const {
		data: tokenPrice,
		isLoading: tokenPriceIsLoading,
		isSuccess: tokenPriceIsSuccess,
		isError: tokenPriceIsError,
		error: tokenPriceError,
	} = coingeckoApi.useGetTokenPriceQuery('richochet');
	const {
		data: tokens,
		isSuccess: tokensIsSuccess,
		isError: tokensIsError,
		error: tokensError,
		//@ts-ignore
	} = coingeckoApi.useGetUpgradedTokensListQuery();
	const [queries, setQueries] = useState<
		Map<
			string,
			{
				flowKey: string;
				flowsReceived: number;
				flowsOwned: string;
				totalFlows: number;
				placeholder: string;
				subsidyRate: { perso: number; total: number; endDate: string };
				streamedSoFar?: number;
				receivedSoFar?: number;
			}
		>
	>(new Map());
	const [balanceList, setBalanceList] = useState<Record<string, string>>({});
	const [sortedList, setSortedList] = useState<InvestmentFlow[]>([]);
	const [positions, setPositions] = useState<InvestmentFlow[]>([]);
	const [positionTotal, setPositionTotal] = useState<number>(0);
	const [results, setResults] = useState<{ flowsOwned: Flow[]; flowsReceived: Flow[] }[]>([]);
	const [coingeckoPrices, setCoingeckoPrices] = useState<Map<string, number>>(new Map());
	const [coingeckoPricesTrigger] = coingeckoApi.useLazyGetPricesQuery();
	const [queryFlows] = superfluidSubgraphApi.useQueryFlowsMutation();
	const [queryStreams] = superfluidSubgraphApi.useQueryStreamsMutation();
	const [queryReceived] = superfluidSubgraphApi.useQueryReceivedMutation();
	useEffect(() => {
		if (isConnected) getSuperTokenBalances(address!).then((res) => setBalanceList(res));
	}, [address, isConnected]);
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
	}, [isMounted]);

	useEffect(() => {
		const results = exchangeContractsAddresses.map(
			async (addr) => await queryFlows(addr).then((res: any) => res?.data?.data?.account)
		);
		Promise.all(results).then((res) => setResults(res));
	}, [isMounted, isConnected]);

	const getStreams = (streams: any[], streamedSoFarMap: Record<string, number>) => {
		(streams || []).forEach((stream: any) => {
			const streamedSoFar = streamedSoFarMap[`${stream.token.id}-${stream.receiver.id}`] || 0;
			Object.assign(streamedSoFarMap, {
				[`${stream.token.id}-${stream.receiver.id}`]:
					Number(streamedSoFar) +
					Number(
						calculateStreamedSoFar(stream.streamedUntilUpdatedAt, stream.updatedAtTimestamp, stream.currentFlowRate)
					),
			});
		});
	};

	const getReceived = (received: any[], receivedSoFarMap: Record<string, number>) => {
		(received || []).forEach((stream: any) => {
			const receivedSoFar = receivedSoFarMap[`${stream.token.id}-${stream.sender.id}`] || 0;
			Object.assign(receivedSoFarMap, {
				[`${stream.token.id}-${stream.sender.id}`]:
					Number(receivedSoFar) +
					Number(
						calculateStreamedSoFar(stream.streamedUntilUpdatedAt, stream.updatedAtTimestamp, stream.currentFlowRate)
					),
			});
		});
	};

	const getFlows = (streamedSoFarMap: Record<string, number>, receivedSoFarMap: Record<string, number>) => {
		const flows: Map<string, { flowsOwned: Flow[]; flowsReceived: Flow[] }> = new Map();
		exchangeContractsAddresses.forEach((el, i) => {
			if (results.length > 0) {
				if (results[i] !== null) {
					flows.set(el, results[i]);
				} else {
					flows.set(el, { flowsOwned: [], flowsReceived: [] });
				}
			}
		});
		let flowQueries: Map<
			string,
			{
				flowKey: string;
				flowsReceived: number;
				flowsOwned: string;
				totalFlows: number;
				placeholder: string;
				subsidyRate: { perso: number; total: number; endDate: string };
				streamedSoFar?: number;
				receivedSoFar?: number;
			}
		> = new Map();
		if (flows.size !== 0) {
			for (const [key, value] of Object.entries(FlowEnum)) {
				flowQueries.set(value, buildFlowQuery(value, address!, flows, streamedSoFarMap, receivedSoFarMap));
			}
		}
		setQueries(flowQueries);
	};

	const sweepQueryFlows = async () => {
		const streamedSoFarMap: Record<string, number> = {};
		const receivedSoFarMap: Record<string, number> = {};
		if (address) {
			await queryStreams(address).then((res: any) => getStreams(res?.data?.data?.streams, streamedSoFarMap));
			await queryReceived(address).then((res: any) => getReceived(res?.data?.data?.streams, receivedSoFarMap));
		}
		getFlows(streamedSoFarMap, receivedSoFarMap);
	};

	useEffect(() => {
		if (results.length > 0) sweepQueryFlows();
	}, [results]);

	useEffect(() => {
		if (isConnected) {
			const positions = flowConfig.filter(({ flowKey }) => parseFloat(queries.get(flowKey)?.placeholder!) > 0);
			setPositions(positions);
		}
	}, [queries, isConnected]);

	useEffect(() => {
		if (isConnected && tokensIsError) console.error(tokensError);
		if (isConnected && tokensIsSuccess) {
			const totalInPositions = upgradeTokensList.reduce((total, token) => {
				const balancess =
					balanceList &&
					tokens &&
					geckoMapping &&
					(
						parseFloat(balanceList[token.superTokenAddress]) *
						parseFloat((tokens as any)[(geckoMapping as any)[token.coin]].usd)
					).toFixed(6);

				return total + parseFloat(balancess as any);
			}, 0);
			// positions.reduce(
			// 	(acc, curr) => acc + parseFloat(queries.get(curr.flowKey)?.flowsOwned!),
			// 	0
			// );
			setPositionTotal(totalInPositions);
		}
	}, [isConnected, balanceList, tokens, tokensIsSuccess]);

	useEffect(() => {
		if (coingeckoPrices.size > 0 && queries.size > 0) {
			let list = flowConfig.filter((each) => each.type === FlowTypes.market);
			let sortList = list.sort((a, b) => {
				const totalVolumeA = parseFloat(getFlowUSDValue(a, queries, coingeckoPrices));
				const totalVolumeB = parseFloat(getFlowUSDValue(b, queries, coingeckoPrices));
				return totalVolumeB - totalVolumeA;
			});
			setSortedList(sortList);
		}
	}, [queries, coingeckoPrices]);

	useEffect(() => {
		if (isConnected && tokenPrice && tokenPriceIsSuccess) {
			setUsdPrice(new Big(parseFloat(tokenPrice?.richochet?.usd)));
		}
		if (tokenPriceIsError) {
			console.error(tokenPriceError);
		}
	}, [isConnected, tokenPrice, tokenPriceIsSuccess]);

	const getNetFlowRate = async () => {
		await getSFFramework().then(async (framework) => {
			if (positions.length > 0) {
				const flowRates = positions.map(
					async (position) =>
						await framework.cfaV1.getNetFlow({
							superToken: position.tokenA,
							account: address!,
							providerOrSigner: provider,
						})
				);
				Promise.all(flowRates).then((rates) => {
					const totalRate = rates.reduce((acc, curr) => acc + parseFloat(curr), 0).toFixed(0);
					const flowRateBigNumber = new Big(totalRate);
					const usdFlowRate = flowRateBigNumber
						.times(new Big('2592000'))
						.div(new Big('10e17'))
						.times(usdPrice as BigSource)
						.toFixed(0);
					setUsdFlowRate(usdFlowRate);
				});
			}
		});
	};
	useEffect(() => {
		if (isConnected && usdPrice) {
			getNetFlowRate();
		}
	}, [isConnected, positions, usdPrice]);
	if (!isMounted) {
		return <></>;
	}

	return (
		<>
			<Head>
				<title>Ricochet | Streaming Exchange</title>
				<meta name='description' content='Automatic Real-Time Crypto Investing' />
				<link rel='icon' href='/favicon.ico' />
				<link rel='icon' type='image/svg+xml' href='/favicon.svg' />
			</Head>
			<div className='bg-gradient-to-b from-background-700 via-background-800 to-background-900 overflow-clip'>
				<Navigation />
				<main>
					<div className='mx-auto w-screen py-6 px-8 lg:px-16'>
						<Alert />
						{isConnected && (
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-stretch place-items-stretch gap-10'>
								<SmallCard
									content={
										<>
											<h6 className='font-light uppercase tracking-widest text-primary-500 mb-2'>
												{t('total-in-positions')}
											</h6>
											<p className='text-slate-100 font-light text-2xl'>{formatCurrency(positionTotal)}</p>
										</>
									}
								/>
								<SmallCard
									content={
										<>
											<h6 className='font-light uppercase tracking-widest text-primary-500 mb-2'>
												{t('net-flow-rate')}
											</h6>
											<p className='text-slate-100 font-light text-2xl'>
												{formatCurrency(parseFloat(usdFlowRate!))} / {t('month')}
											</p>
										</>
									}
								/>
								<SmallCard
									content={
										<>
											<h6 className='font-light uppercase tracking-widest text-primary-500 mb-2'>{t('ric-balance')}</h6>
											<p className='text-slate-100 font-light text-2xl space-x-1'>
												<BalanceDisplay tokenAddress={RICAddress} showSymbol={true} />
											</p>
										</>
									}
								/>
								<SmallCard
									content={
										<>
											<h6 className='font-light uppercase tracking-widest text-primary-500 mb-2'>
												{t('rewards-earned')}
											</h6>
											<p className='text-slate-100 font-light text-2xl'>{formatCurrency(0.0)}</p>
										</>
									}
								/>
							</div>
						)}
						<div className='grid grid-cols-1 lg:grid-cols-3 gap-10 place-content-stretch mt-16'>
							<div className='lg:col-span-2 space-y-10'>
								<CardContainer
									content={
										isConnected ? (
											<Positions coingeckoPrices={coingeckoPrices} positions={positions} queries={queries} />
										) : (
											<div className='flex flex-col items-center justify-center space-y-4 h-96'>
												<p className='text-primary-500'>{t('connect-for-positions')}.</p>
												<ConnectKitButton.Custom>
													{({ isConnected, show }) => (
														<>
															{!isConnected && (
																<OutlineButton
																	action={`${t('connect-wallet')}`}
																	type='button'
																	handleClick={show}></OutlineButton>
															)}
														</>
													)}
												</ConnectKitButton.Custom>
											</div>
										)
									}
								/>
								<CardContainer
									content={<Markets coingeckoPrices={coingeckoPrices} sortedList={sortedList} queries={queries} />}
								/>
							</div>
							<div className='space-y-10'>
								<Card
									content={
										isConnected ? (
											<Balances tokens={tokens} balances={balanceList} />
										) : (
											<div className='flex flex-col items-center justify-center space-y-4 h-96'>
												<p className='text-primary-500'>{t('connect-for-balances')}.</p>
												<ConnectKitButton.Custom>
													{({ isConnected, show }) => (
														<>
															{!isConnected && (
																<OutlineButton
																	action={`${t('connect-wallet')}`}
																	type='button'
																	handleClick={show}></OutlineButton>
															)}
														</>
													)}
												</ConnectKitButton.Custom>
											</div>
										)
									}
								/>
								<CardWithBackground content={<LaunchPad />} />
								<CardWithOutline content={<Refer />} />
							</div>
						</div>
					</div>
				</main>
				<Footer />
			</div>
		</>
	);
}
