import { PlusSmallIcon } from '@heroicons/react/24/solid';
import { useCoingeckoPairs } from '@richochet/hooks/useCoingeckoPairs';
import { useCoingeckoPrices } from '@richochet/hooks/useCoingeckoPrices';
import { useTokenHistory } from '@richochet/hooks/useTokenHistory';
import { getPersonalFlowUSDValue } from '@richochet/utils/getFlowUsdValue';
import { getPriceRange } from '@richochet/utils/getPriceRange';
import { polygon } from '@wagmi/chains';
import { fetchBalance } from '@wagmi/core';
import { geckoMapping } from 'constants/coingeckoMapping';
import { Coin } from 'constants/coins';
import { flowConfig, FlowEnum, InvestmentFlow } from 'constants/flowConfig';
import { tokenArray } from 'constants/polygon_config';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import sushiswapSubgraphApi from 'redux/slices/sushiswapSubgraph.slice';
import { useAccount } from 'wagmi';
import { RoundedButton } from '../button';
import { CardTitle } from '../cards';
import { DataTable } from '../table';
import { NewPosition } from './new-position';
import { ViewPosition } from './view-position';

export interface PositionData extends InvestmentFlow {
	positions: number;
	// timeLeft: number;
	// endDate: string;
	rateUsdValue: string;
	streamedUsdValue: string;
	// feePercent: string;
	input: number;
	output: string;
	// avgPrice: string;
	avgBuyPrice: string;
}

interface Props {
	positions: InvestmentFlow[];
	queries: Map<
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
	>;
}

const positionTitles = ['your markets', 'average buy price', 'stream rate', 'total streamed'];

export const Positions: NextPage<Props> = ({ positions, queries }) => {
	const { t } = useTranslation('home');
	const [positionList, setPositionList] = useState<PositionData[]>([]);
	const [balances, setBalances] = useState<Map<string, string>>(new Map());
	const [newPosition, newPositionClosed] = useState(true);
	const coingeckoPrices = useCoingeckoPrices();
	const coingeckoPairs = useCoingeckoPairs(positions);
	const history = useTokenHistory(coingeckoPairs);
	const [minMax, setMinMax] = useState<string[][]>([['0', '0']]);
	const [selectedPosition, setSelectedPosition] = useState<PositionData>();
	const [closePosition, setClosePosition] = useState(true);
	const { address, isConnected } = useAccount();
	const [querySushiPoolPrices] = sushiswapSubgraphApi.useQuerySushiPoolPricesMutation();
	const sumStrings = (a: number, b: string): number => {
		return a + parseFloat(b);
	};
	const endDate = (bal: number, outgoing: number): string => {
		const outgoingPerMs = outgoing / (30 * 24 * 60 * 60 * 1000);
		const endDateTimestamp = Date.now() + bal / outgoingPerMs;
		const endDateStr = new Date(endDateTimestamp).toLocaleDateString();
		return `${endDateStr}`;
	};
	const retrieveEndDate = (
		flowKey: FlowEnum,
		queries: Map<
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
		>,
		currentBalances: Map<string, string>
	) => {
		const flow = flowConfig.find((flow_) => flow_.flowKey === flowKey);
		const sameCoinAFlows = flowConfig.filter((flow_) => flow_.coinA === flow?.coinA);
		const outgoing = sameCoinAFlows.map((flow_) => queries.get(flow_.flowKey)?.placeholder || '0');
		const outgoingSum = outgoing.reduce(sumStrings, 0);
		const bal = parseFloat((currentBalances && currentBalances.get(flow?.tokenA || '')) || '0');
		return endDate(bal, outgoingSum);
	};
	const computeStreamEnds = (
		queries: Map<
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
		>,
		currentBalances: Map<string, string>
	) => {
		const streamEnds: Map<string, string> = new Map();
		Object.values(FlowEnum).forEach((flowEnum: FlowEnum) => {
			streamEnds.set(flowEnum, retrieveEndDate(flowEnum, queries, currentBalances));
		});
		return streamEnds;
	};
	const getTimeRemaining = (endDate: string) => {
		const total = Date.parse(endDate) - Date.parse(new Date().toLocaleDateString());
		const seconds = Math.floor((total / 1000) % 60);
		const minutes = Math.floor((total / 1000 / 60) % 60);
		const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
		const days = Math.floor(total / (1000 * 60 * 60 * 24));

		return {
			total,
			days,
			hours,
			minutes,
			seconds,
		};
	};
	useEffect(() => {
		if (history.size > 0 && coingeckoPairs.size > 0) {
			const minMaxArr = [];
			for (const [key, value] of coingeckoPairs) {
				if (
					value[0] === Coin.USDC ||
					value[0] === Coin.IbAlluoUSD ||
					value[0] === Coin.StIbAlluoUSD ||
					value[0] === Coin.DAI
				) {
					const { priceSorted } = getPriceRange(history.get(geckoMapping[value[1]])!);
					if (priceSorted.length) {
						minMaxArr.push([priceSorted[0][1], priceSorted[priceSorted.length - 1][1]]);
						setMinMax(minMaxArr);
					}
				}
				if (
					value[1] === Coin.USDC ||
					value[1] === Coin.IbAlluoUSD ||
					value[1] === Coin.StIbAlluoUSD ||
					value[1] === Coin.DAI
				) {
					const { priceSorted } = getPriceRange(history.get(geckoMapping[value[0]])!);
					if (priceSorted.length) {
						minMaxArr.push([priceSorted[0][1], priceSorted[priceSorted.length - 1][1]]);
						setMinMax(minMaxArr);
					}
				}
			}
		}
	}, [history, coingeckoPairs]);
	useEffect(() => {
		const currBalances = tokenArray.map(async (token) => {
			const balance = await fetchBalance({
				address: address!,
				chainId: polygon.id,
				token: token as `0x${string}`,
			}).then((res) => res?.formatted);
			return { token, balance };
		});
		Promise.all(currBalances).then((res) => {
			const balanceMap: Map<string, string> = new Map();
			res.map((r) => balanceMap.set(r?.token, r?.balance));
			setBalances(balanceMap);
		});
	}, [address, isConnected]);
	useEffect(() => {
		if (address && isConnected && queries.size > 0 && positions.length > 0 && minMax.length > 1) {
			// const streamEnds = computeStreamEnds(queries, balances);
			// const avgPrices = positions.map(async (position) => {
			// 	const sushiPrice = await querySushiPoolPrices(sushiSwapPools[`${position.coinA}-${position.coinB}`]).then(
			// 		(res: any) => res?.data?.data?.pair?.token0Price
			// 	);
			// 	return { position, sushiPrice };
			// });
			// Promise.all(avgPrices).then((res) => {
			const positionss: PositionData[] = [];
			positions.map((position, i) => {
				// const timeLeft = getTimeRemaining(streamEnds.get(r?.position?.flowKey)!);
				positionss.push({
					...position,
					positions: queries.get(position?.flowKey)?.totalFlows || 0,
					rateUsdValue: getPersonalFlowUSDValue(
						queries.get(position?.flowKey)?.placeholder!,
						coingeckoPrices.get(position?.tokenA)!
					),
					streamedUsdValue: getPersonalFlowUSDValue(
						queries.get(position?.flowKey)?.streamedSoFar?.toFixed(0)!,
						coingeckoPrices.get(position?.tokenA)!
					),
					input: queries.get(position?.flowKey)?.streamedSoFar || 0,
					output: queries.get(position?.flowKey)?.placeholder!,
					// feePercent: position.coinA.includes('IbAlluo') ? '0.5%' : '2%',
					// timeLeft: timeLeft.days,
					// endDate: new Date(streamEnds.get(r?.position?.flowKey)!).toLocaleDateString('en-us', {
					// 	year: 'numeric',
					// 	month: 'long',
					// 	day: 'numeric',
					// }),
					avgBuyPrice: ((+minMax[i][0] + +minMax[i][1]) / 2).toFixed(3),
					// avgPrice: r?.sushiPrice || '0',
				});
			});
			setPositionList(positionss);
			// });
		}
	}, [address, isConnected, minMax, positions]);
	return (
		<>
			{newPosition && (
				<div className='mt-4'>
					<CardTitle
						content={
							<>
								<p className='text-primary-500 uppercase'>{t('your-streams')}</p>
								<RoundedButton
									icon={<PlusSmallIcon className='h-4 w-4' />}
									type='button'
									action={`${t('new-position')}`}
									handleClick={() => {
										newPositionClosed(false);
									}}
								/>
							</>
						}
					/>
					{closePosition &&
						(!positionList.length ? (
							<p className='italic'>{t('no-positions')}...</p>
						) : (
							<DataTable
								headers={positionTitles}
								rowData={positionList}
								tableLoaderRows={12}
								selectable={true}
								selectData={(data: PositionData) => {
									setSelectedPosition(data);
									setClosePosition(false);
								}}
							/>
						))}
					{!closePosition && (
						<ViewPosition close={closePosition} setClose={setClosePosition} position={selectedPosition!} />
					)}
				</div>
			)}
			{!newPosition && <NewPosition close={newPosition} setClose={newPositionClosed} />}
		</>
	);
};
